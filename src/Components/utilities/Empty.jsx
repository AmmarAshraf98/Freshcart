import React from "react";
import emptyCart from "../../images/images.jpg";

export default function Empty({ message }) {
  return (
    <div className='container mi-h-70 d-flex flex-column justify-content-center align-items-center'>
      <h2 className='text-center text-main fw-bold mb-5'>{message}</h2>
      <div className='d-flex justify-content-center'>
        <img src={emptyCart} alt='empty cart' />
      </div>
    </div>
  );
}
