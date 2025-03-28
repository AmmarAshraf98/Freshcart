import React, { useCallback, useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Loading from "../Loading/Loading";
import axios from "axios";
import { TokenContext } from "../../Context/Token";
import { jwtDecode } from "jwt-decode";

export default function Allorders() {
  // loading
  const [loading, setLoading] = useState(true);
  //   orders
  const [orders, setOrders] = useState(null);
  // get user id from token
  const { token } = useContext(TokenContext);

  // get orders
  const getOrders = useCallback(
    function getOrders() {
      return axios
        .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`)
        .then((res) => {
          setOrders(res.data.pop());
          setLoading(false);
          return res;
        })
        .catch((err) => {
          setLoading(false);
          return err;
        });
    },
    [id]
  );

  useEffect(() => {
    if (!token) return;
    getOrders();
  }, [getOrders, token]);

  if (!token) return;
  const { id } = jwtDecode(token);

  return (
    <>
      <Helmet>
        <title>Orders</title>
        <meta name='description' content='Your allorders products' />
      </Helmet>
      {loading && <Loading />}
      {orders && (
        <div className='container my-5 py-4 bg-main-light'>
          <h2 className='text-center m-4'>
            Hi, <span className='text-main fw-bold'>{orders.user.name}</span>
            <br />
            Your orders are preparing to be shipped{" "}
            <i className='fa-regular fa-circle-check fs-3 text-main'></i>
          </h2>
          <h6 className=' fw-bold'>
            Total Price :{" "}
            <span className='text-main'>{orders.totalOrderPrice} </span>EGP
          </h6>
          <h6 className='fw-bold'>
            Total Cart Items :{" "}
            <span className='text-main'>{orders.cartItems.length}</span>{" "}
            Products
          </h6>
          {orders?.cartItems.map((product) => (
            <div
              className='row align-items-center p-1'
              key={product.product.id}
            >
              <div className='col-md-1'>
                <img
                  src={product.product.imageCover}
                  alt='your product'
                  className='w-100'
                  height={100}
                />
              </div>
              <div className='col-md-10'>
                <div className='row align-items-center'>
                  <div className='col-sm-11'>
                    <p>
                      {product.product.title.split(" ").slice(0, 3).join(" ")}
                    </p>
                    <p className='text-main'>
                      Price : <span>{product.price}</span>
                    </p>
                  </div>
                  <div className='col-sm-1'>
                    <span className='mx-2'>{product.count}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
