import React, { useCallback, useContext, useEffect, useState } from "react";
import { wishContext } from "../../Context/Wishlist";
import { CartContext } from "../../Context/Cart";
import { TokenContext } from "../../Context/Token";
import toast from "react-hot-toast";
import Loading from "../Loading/Loading";

// import wishlistImg from "../../images/wishlist.png";
import wishlistImg from "../../images/download.png";

export default function Wishlist() {
  // loading
  const [loading, setLoading] = useState(true);

  // get add product to cart method
  let { addToCart } = useContext(CartContext);

  const { removeFromList } = useContext(wishContext);
  // get token to check before add product
  let { token } = useContext(TokenContext);

  // get token to check before add product
  const { getWishProduct } = useContext(wishContext);
  const [wishProd, setWishProd] = useState([]);

  // add product to cart
  async function addproduct(id) {
    if (token) {
      let { data } = await addToCart(id);
      setLoading(false);
      toast.success(data?.message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
      setLoading(false);
    }
  }

  // delete product from wishlist
  async function removeFromWishList(id) {
    if (token) {
      const { data } = await removeFromList(id);
      await getProducts();
      toast.success(data?.message, {
        position: "top-right",
      });
    } else {
      await getProducts();
      toast.error("please login first.", {
        position: "top-right",
      });
    }
  }

  // get wish product from wishlist
  const getProducts = useCallback(async () => {
    const { data } = await getWishProduct();
    setWishProd(data?.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return (
    <section className='mi-h-60 '>
      <div className='container'>
        {loading && <Loading />}

        {wishProd.length === 0 ? (
          <img
            src={wishlistImg}
            alt='your wishlist is empty'
            className='mx-auto d-block w-50'
          />
        ) : (
          <>
            <h2 className='text-main fw-bold text-center my-4'>
              You wishlist items <i className='fa-regular fa-heart me-2'></i>{" "}
            </h2>
            {wishProd.map((product) => (
              <div className='row align-items-center p-1' key={product.id}>
                <div className='col-md-2'>
                  <img
                    src={product.imageCover}
                    alt='your product'
                    className='w-100'
                  />
                </div>
                <div className='col-md-10'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className=''>
                      <p>{product.title}</p>
                      <p className='text-main'>
                        Price : <span>{product.price}</span>
                      </p>
                      <p
                        className='cursor-pointer text-danger fw-bold'
                        onClick={() => {
                          removeFromWishList(product._id);
                        }}
                      >
                        <i className='fa-regular fa-heart me-2'></i>Remove
                      </p>
                    </div>
                    <div className=''>
                      <button
                        className='btn bg-main text-white my-2'
                        onClick={() => {
                          addproduct(product._id);
                        }}
                      >
                        + add to cart
                      </button>
                    </div>
                  </div>
                </div>{" "}
              </div>
            ))}
          </>
        )}
      </div>
    </section>
  );
}
