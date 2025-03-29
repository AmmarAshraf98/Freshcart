import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { CartContext } from "../../Context/Cart";

import Loading from "../Loading/Loading";
import CartItem from "./CartItem";
import Empty from "../utilities/Empty";

export default function Cart() {
  // get function from
  const {
    dataInformation: { products: data, totalPrice },
    loading,
  } = useContext(CartContext);

  if (loading) return <Loading />;

  if (!data?.length > 0) return <Empty message='Your cart is empty' />;

  const cartNumber = data.length;

  return (
    <section className='py-5'>
      <Helmet>
        <title>Cart</title>
        <meta name='description' content='Your all selected items' />
      </Helmet>
      {data?.length > 0 && (
        <div className='container py-4 bg-main-light'>
          <h1 className='h2 text-center'>Shop Cart</h1>
          <h6 className='text-main fw-bold'>Total Cart Items : {cartNumber}</h6>
          <h6 className='text-main fw-bold'>Total Price : {totalPrice} EGP</h6>
          {data?.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
          <Link
            to={"/shppingaddress"}
            className='btn bg-main text-white w-100 my-3'
          >
            Check out
          </Link>
        </div>
      )}
    </section>
  );
}
