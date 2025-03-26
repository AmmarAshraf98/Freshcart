import React from "react";

export default function Ratting(props) {
  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <span>{props.price} EGP</span>
        <span>
          <i className="fa fa-star rating-color"></i> {props.rate}
        </span>
      </div>
    </>
  );
}
