import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Loading from "../Loading/Loading";

export default function VerifyCode() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    resetCode: Yup.string()
      .min(6, "Sorry invalid code")
      .max(6, "Sorry invalid code")
      .required("code is required"),
  });

  const navigate = useNavigate();

  async function sendRequest(values) {
    setLoading(true);
    return await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, {
        resetCode: `${values.resetCode}`,
      })
      .then(({ response }) => {
        setLoading(false);
        setMessage(response?.data.message);
        navigate("/freshCart/resetPass");
        return response;
      })
      .catch(({ response }) => {
        setLoading(false);
        setMessage(response?.data.message);
        return response;
      });
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: sendRequest,
  });

  return (
    <>
      <div className="container">
        <h2 className="text-main my-5 text-center fw-bold">
          Send verification code
        </h2>

        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="resetCode" className="mb-2">
                Verification code :
              </label>
              <input
                type="text"
                name="resetCode"
                id="resetCode"
                className="form-control"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.resetCode}
              />
            </div>
            <button className="btn bg-main text-white w-100" type="submit">
              Send code
            </button>
          </form>
        )}
        {message && (
          <div className="alert alert-danger my-4 text-center">{message}</div>
        )}
      </div>
    </>
  );
}
