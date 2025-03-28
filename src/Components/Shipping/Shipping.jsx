import { useFormik } from "formik";
import React, { useContext } from "react";
import * as Yup from "yup";
import { TokenContext } from "../../Context/Token";
import axios from "axios";
import { CartContext } from "../../Context/Cart";

export default function Shipping() {
  // get token
  const { token } = useContext(TokenContext);
  const { cartId } = useContext(CartContext);

  let headers = {
    token: token,
  };

  // pay online
  function payment(values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=https://freshcart-sable-nine.vercel.app`,
        {
          shippingAddress: values,
        },
        {
          headers,
        }
      )
      .then((response) => {
        return response;
      })
      .catch((err) => err);
  }

  //   call Api
  async function pay(values) {
    const { data } = await payment(values);

    window.location.href = data.session.url;
  }

  const validationSchema = Yup.object({
    details: Yup.string().min(8, "min length is 8 character"),
    phone: Yup.string()
      .matches(/[01][0125][0-9]{8}/)
      .required("Phone is required"),
    city: Yup.string()
      .min(4, "min length is 4 character")
      .required("city is required"),
  });

  const formik = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    validationSchema,
    onSubmit: pay,
  });

  return (
    <>
      <div className='container'>
        <div className='bg-main-light py-5 my-5'>
          <h2 className='text-main text-center mb-5'>Shipping Address</h2>
          <form className='w-75 mx-auto' onSubmit={formik.handleSubmit}>
            <div className='form-group mb-3'>
              <label htmlFor='details' className='mb-1'>
                Address :
              </label>
              <input
                type='text'
                className='form-control'
                placeholder='enter your address'
                id='details'
                value={formik.values.details}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.details && formik.touched.details && (
                <div className='alert alert-danger py-1 mt-1'>
                  {formik.errors.details}
                </div>
              )}
            </div>

            <div className='form-group mb-3'>
              <label htmlFor='phone' className='mb-1'>
                Phone :
              </label>
              <input
                type='number'
                id='phone'
                className='form-control'
                placeholder='phone number'
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.phone && formik.touched.phone && (
                <div className='alert alert-danger py-1 mt-1'>
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div className='form-group mb-3'>
              <label htmlFor='city' className='mb-1'>
                City :
              </label>
              <input
                type='text'
                id='city'
                className='form-control'
                placeholder='enter your city'
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.city && formik.touched.city && (
                <div className='alert alert-danger py-1 mt-1'>
                  {formik.errors.city}
                </div>
              )}
            </div>

            <button className='btn bg-main text-white' type='submit'>
              Pay now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
