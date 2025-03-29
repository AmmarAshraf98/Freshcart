import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useToken } from "../../Context/Token";
import { Helmet } from "react-helmet-async";

export default function Login() {
  // Loading
  const [Loading, setLoading] = useState(false);
  // Error message
  const [errorMesage, seterrorMesage] = useState("");
  let navigate = useNavigate();
  // validation schema
  const { saveUSerData } = useToken();
  //
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .min(3, "Sorry min length id 3")
      .required("Email is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5,8}/,
        "Password strat with capital character with min length 6"
      )
      .required("Password is required"),
  });

  async function callLogApi(requestBody) {
    seterrorMesage("");
    setLoading(true);
    return axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, requestBody)
      .then(({ data }) => {
        saveUSerData(data);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        seterrorMesage(error.response.data.message);
      });
  }

  const logForm = useFormik({
    // initial values
    initialValues: {
      email: "",
      password: "",
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
      <section className='py-3 mi-h-70'>
        <div className='container'>
          <div className='w-75 mx-auto'>
            <h2 className='my-3'>Login </h2>
            {errorMesage && (
              <div className='alert alert-danger'>{errorMesage}</div>
            )}
            <form onSubmit={logForm.handleSubmit}>
              <div className='form-group mb-2'>
                <label htmlFor='email'>E-mail : </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={logForm.values.email}
                  onChange={logForm.handleChange}
                  onBlur={logForm.handleBlur}
                />
                {logForm.errors.email && logForm.touched.email ? (
                  <div className='alert alert-danger py-1 mt-1'>
                    {logForm.errors.email}
                  </div>
                ) : null}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='password'>Password : </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={logForm.values.password}
                  onChange={logForm.handleChange}
                  onBlur={logForm.handleBlur}
                />
                {logForm.errors.password && logForm.touched.password && (
                  <div className='alert alert-danger py-1 mt-1'>
                    {logForm.errors.password}
                  </div>
                )}
              </div>
              <div className='d-flex justify-content-between align-items-center'>
                <button
                  type='submit'
                  disabled={!(logForm.isValid && logForm.dirty)}
                  className='btn bg-main text-white'
                >
                  {Loading ? (
                    <i className='fa-solid fa-spinner fa-spin mx-1'></i>
                  ) : (
                    "Login"
                  )}
                </button>
                <Link to={"/forgetpass"} className='text-primary'>
                  forget password
                </Link>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
