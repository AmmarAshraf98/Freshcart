import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useToken } from "../../Context/Token";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { saveUSerData } = useToken();

  let navigate = useNavigate();

  // object with spacific vakidation to use it as refrence to check on data
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min length is 3")
      .max(10, "max length is 10")
      .required("Name is required"),
    email: Yup.string()
      .email("Email is not valid")
      .required("Email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{5,8}/, "Password starts with capital character")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password and confirm password dont match")
      .required("Repassword is required"),
    phone: Yup.string()
      .matches(/[01][0125][0-9]{9}/)
      .required("Phone is required"),
  });

  // send to server to create account with data from formik value
  async function callRegisterApi(requestBody) {
    setError("");
    setLoading(true);
    await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, requestBody)
      .then(({ data }) => {
        saveUSerData(data);
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // create formik
  const regForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    validationSchema,
    onSubmit: callRegisterApi,
  });

  return (
    <>
      <Helmet>
        <title>Register Page</title>
        <meta
          name='description'
          content='Register page to be able to logged in this site'
        />
      </Helmet>
      <section className='py-4'>
        <div className='container'>
          <div className='w-75 mx-auto'>
            <h2 className='my-4'>Register Now</h2>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={regForm.handleSubmit}>
              <div className='form-group mb-2'>
                <label htmlFor='name'>Name : </label>
                <input
                  type='text'
                  className='form-control'
                  id='name'
                  name='name'
                  value={regForm.values.name}
                  onChange={regForm.handleChange}
                  onBlur={regForm.handleBlur}
                />
                {regForm.errors.name && regForm.touched.name && (
                  <div className='alert alert-danger py-1 mt-1'>
                    {regForm.errors.name}
                  </div>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='email'>E-mail : </label>
                <input
                  type='email'
                  className='form-control'
                  id='email'
                  name='email'
                  value={regForm.values.email}
                  onChange={regForm.handleChange}
                  onBlur={regForm.handleBlur}
                />
                {regForm.errors.email && regForm.touched.email && (
                  <div className='alert alert-danger py-1 mt-1'>
                    {regForm.errors.email}
                  </div>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='password'>Password </label>
                <input
                  type='password'
                  className='form-control'
                  id='password'
                  name='password'
                  value={regForm.values.password}
                  onBlur={regForm.handleBlur}
                  onChange={regForm.handleChange}
                />
                {regForm.errors.password && regForm.touched.password && (
                  <div className='alert alert-danger py-1 mt-1'>
                    {regForm.errors.password}
                  </div>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='rePassword'>Confirm Password </label>
                <input
                  type='password'
                  className='form-control'
                  id='rePassword'
                  name='rePassword'
                  value={regForm.values.rePassword}
                  onChange={regForm.handleChange}
                  onBlur={regForm.handleBlur}
                />
                {regForm.errors.rePassword && regForm.touched.rePassword && (
                  <div className='alert alert-danger py-1 mt-1'>
                    {regForm.errors.rePassword}
                  </div>
                )}
              </div>
              <div className='form-group mb-2'>
                <label htmlFor='phone'>Phone </label>
                <input
                  type='tel'
                  className='form-control'
                  id='phone'
                  name='phone'
                  value={regForm.values.phone}
                  onChange={regForm.handleChange}
                  onBlur={regForm.handleBlur}
                />
                {regForm.errors.phone && regForm.touched.phone && (
                  <div className='alert alert-danger py-1 pt-1'>
                    {regForm.errors.phone}
                  </div>
                )}
              </div>
              <button className='btn text-white bg-main' type='submit'>
                {loading ? (
                  <i className='fa-solid fa-spinner fa-spin mx-1'></i>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
