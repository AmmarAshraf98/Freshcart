import React, { useContext, useState } from "react";
import { wishContext } from "../../Context/Wishlist";
import { TokenContext } from "../../Context/Token";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/Cart";
import { Link } from "react-router-dom";
import Ratting from "../Ratting/Ratting";

export default function ProductItem({ product }) {
  const [isClicked, setIsClicked] = useState(false);

  // get token to check if user is logged in before order
  let { token } = useContext(TokenContext);

  // Wish list method
  const { addTolist } = useContext(wishContext);

  // get function to add to cart
  let { addToCart } = useContext(CartContext);

  // add
  async function addToWishList(id) {
    if (token) {
      const { data } = await addTolist(id);
      toast.success(data?.message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
  }

  // function to conect my jsx to my func in context
  async function addproduct(id) {
    if (token) {
      setIsClicked(true);
      const message = await addToCart(id);
      toast.success(message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first !", {
        position: "top-right",
      });
    }
    setIsClicked(false);
  }

  return (
    <div
      className='col-sm-4 col-md-3 col-lg-2 cursor-pointer product'
      key={product._id}
    >
      <i
        className={`fa-regular fa-heart text-main `}
        onClick={() => addToWishList(product._id)}
      ></i>

      <Link to={"details/" + product._id}>
        <img src={product.imageCover} className='w-100 mb-2' alt='' />
        <h2 className='h6 text-main'>{product.brand.name}</h2>
        <p className='mb-1'>{product.category.name}</p>
        <Ratting price={product.price} rate={product.ratingsAverage} />
      </Link>

      <button
        className='btn text-white w-100 my-2'
        onClick={() => {
          addproduct(product._id);
        }}
        disabled={isClicked}
      >
        {isClicked ? "Loading..." : " add to cart"}
      </button>
    </div>
  );
}
