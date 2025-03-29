import React, { useContext, useState } from "react";
import { TokenContext, useToken } from "../../Context/Token";
import { CartContext } from "../../Context/Cart";
import { wishContext } from "../../Context/Wishlist";
import toast from "react-hot-toast";

export default function WishlistItem({ product }) {
  // loading
  const [clickedBtn, setClickedBtn] = useState({
    addClicked: false,
    removeClicked: false,
  });

  // get add product to cart method
  const { addToCart } = useContext(CartContext);

  // get token to check before add product
  const {
    user: { token },
  } = useToken();

  const { removeFromList } = useContext(wishContext);

  // add product to cart
  async function addproduct(id) {
    if (token) {
      setClickedBtn((prev) => ({ ...prev, addClicked: true }));
      let message = await addToCart(id);

      toast.success(message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
    setClickedBtn((prev) => ({ ...prev, addClicked: false }));
  }

  // delete product from wishlist
  async function removeFromWishList(id) {
    if (token) {
      setClickedBtn((prev) => ({ ...prev, removeClicked: true }));
      const { data } = await removeFromList(id);
      toast.success(data?.message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
    setClickedBtn((prev) => ({ ...prev, removeClicked: false }));
  }

  return (
    <div className='row align-items-center p-1' key={product.id}>
      <div className='col-md-2'>
        <img src={product.imageCover} alt='your product' className='w-100' />
      </div>
      <div className='col-md-10'>
        <div className=''>
          <p>{product.title}</p>
          <p className='text-main'>
            Price : <span>{product.price}</span>
          </p>

          <div className='d-flex align-items-center justify-content-between'>
            <p
              className={`${
                clickedBtn.removeClicked ? "not-allowed" : "cursor-pointer"
              } mb-0`}
              onClick={() => {
                removeFromWishList(product._id);
              }}
              disabled={clickedBtn.removeClicked}
            >
              {clickedBtn.removeClicked ? (
                <>
                  <i className='fa-solid fa-spinner fa-spin text-main me-2'></i>
                  Deleting ⏳
                </>
              ) : (
                <>
                  <i className='fa-solid fa-trash text-danger me-2'></i>
                  Remove
                </>
              )}
            </p>
            <button
              className={`btn bg-main text-white my-1 mx-2${
                clickedBtn.addClicked ? "not-allowed" : ""
              }`}
              onClick={() => {
                addproduct(product._id);
              }}
              disabled={clickedBtn.addClicked}
            >
              {clickedBtn.addClicked ? (
                <>
                  <i className='fa-solid fa-spinner fa-spin mx-1'></i>
                  Adding{" "}
                </>
              ) : (
                "🛒"
              )}
            </button>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}
