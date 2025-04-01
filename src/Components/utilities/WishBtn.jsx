import React, { useState } from "react";

export default function WishBtn({ type, productId, onClick, children }) {
  const [clicked, setClicked] = useState(false);

  const handleAction = async (id) => {
    setClicked(true);
    await onClick(id);
    setClicked(false);
  };

  return (
    <span
      className={`${clicked ? "not-allowed" : "cursor-pointer"} d-block`}
      onClick={() => handleAction(productId)}
      disabled={clicked}
    >
      {clicked ? (
        <>⏳ {type === "add" ? "Adding" : "Deleting"}</>
      ) : (
        <>
          {children}
          <i
            className={`${
              type === "add" ? "fa-solid" : "fa-regular"
            } fa-heart text-main cursor-pointer mx-1`}
          ></i>
        </>
      )}
    </span>
  );
}
