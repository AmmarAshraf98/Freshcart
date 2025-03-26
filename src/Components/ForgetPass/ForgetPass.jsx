import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";

export default function ForgetPass() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Email is not valid")
      .min(3, "Sorry min length id 3")
      .required("Email is required"),
  });

  const navigate = useNavigate();
  async function sendRequest(values) {
    setLoading(true);
    return await axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      )
      .then(({ response }) => {
        setMessage(response?.data.message);
        navigate("/freshCart/verifycode");
        setLoading(false);
        return response;
      })
      .catch(({ response }) => {
        setMessage(response?.data.message);
        setLoading(false);
        return response;
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: sendRequest,
  });

  return (
    <>
      <div className="container">
        <h2 className="my-5 text-main text-center ">Please enter your email</h2>

        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="email" className="mb-2">
                E-mail :
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>
            <button className="btn bg-main text-white w-100" type="submit">
              Send
            </button>
          </form>
        )}

        {message && (
          <h4 className="alert alert-danger py-3 text-center my-4">
            {message}
          </h4>
        )}
      </div>
    </>
  );
}
