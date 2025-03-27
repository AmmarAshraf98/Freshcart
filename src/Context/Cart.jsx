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

export const CartContext = createContext();

export default function CartContextProvider(props) {
  // loading
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [cartNumber, setCartNumber] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState("");

  //get token to be sent to database with each request
  let { token } = useContext(TokenContext);
  const headers = useMemo(() => ({ token: token }), [token]);

  const setCartData = (data) => {
    setData(data?.data?.data.products);
    setCartNumber(data?.data?.numOfCartItems);
    setTotalPrice(data?.data?.totalPrice);
  };

  // call api to add item to my cart in data-base
  function addToCart(id) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: id,
        },
        {
          headers,
        }
      )
      .then((response) => {
        setCartData(response);
        return response?.data?.message;
      })
      .catch((error) => error.message ?? "something went wrong ! ⛔");
  }

  // get items i set in cart
  const getCartProduct = useCallback(() => {
    setLoading(true);
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((data) => {
        if (data !== null || undefined) {
          setCartData(data);
          setCartId(data?.data?.data._id);
        }
      })
      .catch((err) => setError(err?.message || "something went wrong ⛔!"))
      .finally(() => setLoading(false));
  }, [headers]);

  // delet product from cart
  function deletProduct(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((response) => {
        if (response?.data?.status === "success") {
          setCartData(response);
          return "product deleted successfully ! ✅";
        } else {
          return "somthing went wrong ! ⛔";
        }
      })
      .catch((error) => error);
  }

  // change product count
  function changeProductCount(id, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => {
        console.log(response);
        setCartData(response);
        return response;
      })
      .catch((error) => error);
  }

  useEffect(() => {
    if (!token) return;
    getCartProduct();
  }, [getCartProduct, token]);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartProduct,
        deletProduct,
        changeProductCount,
        data,
        cartNumber,
        cartId,
        totalPrice,
        error,
        loading,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
