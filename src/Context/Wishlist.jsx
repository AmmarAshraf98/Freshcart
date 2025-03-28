import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TokenContext } from "./Token";
import axios from "axios";

export const wishContext = createContext();

export default function WishlistProvider(props) {
  const [loading, setLoading] = useState(true);
  const [errMessage, setErrMessage] = useState("");

  // state for wish items
  const [wishListItems, setWishListItems] = useState(null);
  // const [wishListCount, setWishListCount] = useState(0);

  //get token to be sent to database with each request
  const { token } = useContext(TokenContext);
  const headers = useMemo(() => {
    return {
      token: token,
    };
  }, [token]);

  //   add product to wish list
  function addTolist(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => error);
  }

  //   delete product from wish list
  function removeFromList(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((response) => {
        // status: "success";
        if (response?.data.status === "success")
          setWishListItems((items) =>
            items.filter((item) => item.id !== productId)
          );
        return response;
      })
      .catch((error) => error);
  }

  // get wish product
  const getWishProduct = useCallback(
    function getWishProduct() {
      setLoading(true);
      return axios
        .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
          headers,
        })
        .then((response) => {
          if (response.statusText !== "OK")
            throw new Error("Network Error !⛔");
          if (response.statusText === "OK") {
            setWishListItems(response?.data?.data);
            // setWishListCount(response?.data?.count);
            setLoading(false);
            return response;
          }
        })
        .catch((error) => {
          setErrMessage(error.message || error);
        })
        .finally(() => setLoading(false));
    },
    [headers]
  );

  useEffect(() => {
    if (!token) return;
    getWishProduct();
  }, [getWishProduct, token]);

  return (
    <wishContext.Provider
      value={{
        addTolist,
        removeFromList,
        wishListItems,
        getWishProduct,
        loading,
      }}
    >
      {props.children}
    </wishContext.Provider>
  );
}
