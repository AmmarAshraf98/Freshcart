import React from "react";

export default function Footer() {
  return (
    <footer className="bg-main-light py-4">
      <div className="container">
        <h4 className="fw-bold">Get FreshCart app</h4>
        <p className="">
          We will send you a link,opent it on your phone to download the app
        </p>
        <div className="d-flex justify-content-between flex-wrap align-items-center mb-3">
          <input
            type="text"
            placeholder="E-mail..."
            className="form-control w-75"
          />
          <button className="btn bg-main text-white my-2">
            Share app link
          </button>
        </div>
      </div>
    </footer>
  );
}
