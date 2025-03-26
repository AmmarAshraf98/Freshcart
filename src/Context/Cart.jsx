import { createContext, useContext, useEffect, useState } from "react";
import { TokenContext } from "./Token";
import axios from "axios";

export let CartContext = createContext();

export default function CartContextProvider(props) {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState(0);
  const [cartId, setCartId] = useState(null);

  //get token to be sent to database with each request
  let { token } = useContext(TokenContext);
  let headers = {
    token: token,
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
        setData(response);
        setCart(response.data.numOfCartItems);
        return response;
      })
      .catch((error) => error);
  }

  // get items i set from cart
  function getCartProduct() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((data) => {
        if (data !== null || undefined) {
          setData(data);
          setCartId(data.data.data._id);
          setCart(data.data.numOfCartItems);
        }
        return data;
      })
      .catch((err) => err);
  }

  // delet product from cart
  function deletProduct(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((response) => {
        setData(response);
        return response;
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
      .then((response) => response)
      .catch((error) => error);
  }

  useEffect(() => {
    if (!token) return;
    getCartProduct();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartProduct,
        deletProduct,
        changeProductCount,
        data,
        cart,
        cartId,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
