import React, { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { CartContext } from "../../Context/Cart";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";

import emptyCart from "../../images/images.jpg";
import CartItem from "./CartItem";

export default function Cart() {
  // get function from
  const {
    changeProductCount,
    data,
    cartNumber,
    totalPrice,
    getCartProduct,
    loading,
  } = useContext(CartContext);

  // // delet product
  // async function deletItem(id) {
  //   const message = await deletProduct(id);
  //   if (message === "product deleted successfully ! ✅") {
  //     toast.success(message, {
  //       position: "top-right",
  //     });
  //   } else {
  //     toast.error("please login first.", {
  //       position: "top-right",
  //     });
  //   }
  // }

  useEffect(() => {
    getCartProduct();
  }, [getCartProduct]);

  if (loading) return <Loading />;

  return (
    <section className='py-5'>
      <Helmet>
        <title>Cart</title>
        <meta name='description' content='Your all selected items' />
      </Helmet>
      {data?.length > 0 ? (
        <div className='container py-4 bg-main-light'>
          <h1 className='h2 text-center'>Shop Cart</h1>
          <h6 className='text-main fw-bold'>
            Total Cart Items : {cartNumber} EGP
          </h6>
          <h6 className='text-main fw-bold'>Total Price : {totalPrice} EGP</h6>
          {data.map((product) => (
            <CartItem key={product._id} product={product} />
            // <div
            //   className='row align-items-center p-1'
            //   key={product.product.id}
            // >
            //   <div className='col-md-2'>
            //     <img
            //       src={product.product.imageCover}
            //       alt='your product'
            //       className='w-100'
            //     />
            //   </div>
            //   <div className='col-md-10'>
            //     <div className='row align-items-center'>
            //       <div className='col-sm-9'>
            //         <p>product name and description</p>
            //         <p className='text-main'>
            //           Price : <span>{product.price}</span>
            //         </p>
            //         <p
            //           className='cursor-pointer'
            //           onClick={() => deletItem(product.product.id)}
            //         >
            //           <i className='fa-solid fa-trash text-main me-2'></i>
            //           Remove
            //         </p>
            //       </div>
            //       <div className='col-sm-3'>
            //         <button
            //           className='btn btn-outline-success'
            //           onClick={() =>
            //             setProductCount(product.product.id, product.count + 1)
            //           }
            //         >
            //           +
            //         </button>
            //         <span className='mx-2'>{product.count}</span>
            //         <button
            //           className='btn btn-outline-success'
            //           onClick={() =>
            //             setProductCount(product.product.id, product.count - 1)
            //           }
            //           disabled={product.count === 1}
            //         >
            //           -
            //         </button>
            //       </div>
            //     </div>
            //   </div>
            // </div>
          ))}
          <Link
            to={"/shppingaddress"}
            className='btn bg-main text-white w-100 my-3'
          >
            Check out
          </Link>
        </div>
      ) : (
        <div className='container'>
          <h2 className='text-center text-main fw-bold mb-5'>
            Your cart is empty !
          </h2>
          <div className='d-flex justify-content-center'>
            <img src={emptyCart} alt='empty cart' />
          </div>
        </div>
      )}
    </section>
  );
}
