import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useToken } from "./Token";
import axios from "axios";
import { useQuery } from "react-query";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  // loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [dataInformation, setDataInformation] = useState({
    products: [],
    totalPrice: 0,
    cartId: null,
  });

  //get token to be sent to database with each request
  const {
    user: { token },
  } = useToken();

  const headers = useMemo(() => ({ token: token }), [token]);

  // method to get products from api
  function getAllProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const {
    isLoading,
    data: productList,
    isError,
  } = useQuery("featuerProducts", getAllProduct);

  // get items i set in cart
  const getCartProduct = useCallback(() => {
    setLoading(true);

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((data) => {
        if (data !== null || undefined) {
          setDataInformation({
            products: data?.data?.data.products,
            totalPrice: data?.data?.data?.totalCartPrice,
            cartId: data?.data?.cartId,
          });
        }
      })
      .catch((err) => setError(err?.message || "something went wrong ⛔!"))
      .finally(() => setLoading(false));
  }, [headers]);

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
        getCartProduct();
        return response?.data?.message;
      })
      .catch((error) => error.message ?? "something went wrong ! ⛔");
  }

  // delet product from cart
  function deletProduct(id) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        headers,
      })
      .then((response) => {
        if (response?.data?.status === "success") {
          const cartProdtcs = response?.data?.data.products;
          const selectedItems = cartProdtcs.filter(
            (item) => item.product !== id
          );

          setDataInformation((prev) => ({
            ...prev,
            products: selectedItems,
            totalPrice: response?.data?.data?.totalCartPrice,
          }));
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
        const cartProdtcs = response?.data?.data.products;

        setDataInformation((prev) => ({
          ...prev,
          products: cartProdtcs,
          totalPrice: response?.data?.data?.totalCartPrice,
        }));

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
        deletProduct,
        changeProductCount,
        dataInformation,
        error,
        loading,
        isLoading,
        productList,
        isError,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
