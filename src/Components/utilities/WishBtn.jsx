import React from "react";

export default function WishBtn({ type, onClick, productId }) {
  console.log(productId);

  return (
    <span className='d-block'>
      <i
        className={`${
          type === "add" ? "fa-regular" : "fa-solid"
        } fa-solid fa-heart text-main cursor-pointer mx-1`}
        onClick={() => onClick()}
      ></i>
    </span>
  );
}
