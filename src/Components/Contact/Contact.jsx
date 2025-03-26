import React from "react";
import { Helmet } from "react-helmet-async";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact-Us</title>
        <meta name="description" content="Keep in touch " />
      </Helmet>
      <div className="container py-5">
        <h1 className="py-3 text-main">Keep in touch </h1>
        <form onClick={(e) => e.preventDefault()}>
          <div className="form-group mb-4">
            <label htmlFor="name" className="mb-2">
              Name :
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="enter your name"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="subject" className="mb-2">
              Subject :
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              className="form-control"
              placeholder="leave your message"
            />
          </div>

          <div className="form-group mb-4">
            <label htmlFor="phone" className="mb-2">
              Phone :
            </label>
            <input
              type="phone"
              name="phone"
              id="phone"
              className="form-control"
              placeholder="enter your phone"
            />
          </div>
        </form>
      </div>
    </>
  );
}
