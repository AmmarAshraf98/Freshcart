import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./Token";
import axios from "axios";

export let wishContext = createContext();

export default function WishlistProvider(props) {
  // state for wish items
  const [items, setItems] = useState(null);

  //get token to be sent to database with each request
  let { token } = useContext(TokenContext);
  let headers = {
    token: token,
  };

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
        setItems(response);
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
        setItems(response);
        return response;
      })
      .catch((error) => error);
  }

  // get wish product
  function getWishProduct() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
        headers,
      })
      .then((response) => {
        setItems(response);
        return response;
      })
      .catch((error) => error);
  }

  useEffect(() => {
    if (!token) return;
    getWishProduct();
  }, []);

  return (
    <wishContext.Provider
      value={{ addTolist, removeFromList, items, getWishProduct }}
    >
      {props.children}
    </wishContext.Provider>
  );
}
