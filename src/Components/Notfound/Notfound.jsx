import React from "react";
import errImg from "../../images/error.svg";
export default function Notfound() {
  return (
    <>
      <div className="container text-center py-5">
        <img src={errImg} alt="not found page" />
      </div>
    </>
  );
}
