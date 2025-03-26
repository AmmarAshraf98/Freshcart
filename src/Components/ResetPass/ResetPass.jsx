import React, { useContext, useState } from "react";
import * as Yup from "yup";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet-async";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPass() {
  let { setToken } = useContext(TokenContext);

  // Loading
  const [Loading, setLoading] = useState(false);

  // Error message
  const [errorMesage, seterrorMesage] = useState("");

  let navigate = useNavigate();

  // validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .min(3, "Sorry min length id 3")
      .required("Email is required"),
    newPassword: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,8}/,
        "Password strat with capital character with min length 6"
      )
      .required("Password is required"),
  });

  async function callLogApi(requestBody) {
    setLoading(true);
    await axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
        requestBody
      )
      .then(({ data }) => {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate("/login");
      })
      .catch((error) => {
        setLoading(false);
        seterrorMesage(error.response.data.message);
      });
  }

  const resetPassord = useFormik({
    // initial values
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: callLogApi,
  });

  return (
    <>
      <Helmet>
        <title>Login Page</title>
        <meta
          name='description'
          content='Login page to be able to order from this site'
        />
      </Helmet>
      <div className='container'>
        <h2 className='my-3'>Login </h2>
        {errorMesage && <div className='alert alert-danger'>{errorMesage}</div>}
        <form onSubmit={resetPassord.handleSubmit}>
          <div className='form-group mb-2'>
            <label htmlFor='email'>E-mail : </label>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={resetPassord.values.email}
              onChange={resetPassord.handleChange}
              onBlur={resetPassord.handleBlur}
            />
            {resetPassord.errors.email && resetPassord.touched.email ? (
              <div className='alert alert-danger py-1 mt-1'>
                {resetPassord.errors.email}
              </div>
            ) : null}
          </div>
          <div className='form-group mb-2'>
            <label htmlFor='newPassword'>Password : </label>
            <input
              type='password'
              className='form-control'
              id='newPassword'
              name='newPassword'
              value={resetPassord.values.newPassword}
              onChange={resetPassord.handleChange}
              onBlur={resetPassord.handleBlur}
            />
            {resetPassord.errors.newPassword &&
              resetPassord.touched.newPassword && (
                <div className='alert alert-danger py-1 mt-1'>
                  {resetPassord.errors.newPassword}
                </div>
              )}
          </div>

          <div className='d-flex justify-content-between align-items-center'>
            <button
              type='submit'
              disabled={!(resetPassord.isValid && resetPassord.dirty)}
              className='btn bg-main text-white'
            >
              {Loading ? (
                <i className='fa-solid fa-spinner fa-spin mx-1'></i>
              ) : (
                "Reset Password"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
