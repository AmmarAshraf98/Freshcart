import axios from "axios";
import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Ratting from "../Ratting/Ratting";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/Cart";
import { useToken } from "../../Context/Token";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { wishContext } from "../../Context/Wishlist";
import WishBtn from "../utilities/WishBtn";

export default function ProductDetails() {
  const [isClicked, setIsClicked] = useState(false);
  // get token id excist
  let {
    user: { token },
  } = useToken();

  // get id by using params hooks
  let { id } = useParams();

  // func to caal API
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  // use query to handel my request to data-base
  let { isLoading, data, isError } = useQuery("getDetails", getProductDetails);

  // get function to add to cart
  let { addToCart } = useContext(CartContext);

  // get function to add to wishlist
  const { addTolist, removeFromList } = useContext(wishContext);

  // function to conect my jsx to my func in context
  async function addproduct(id) {
    if (token) {
      setIsClicked(true);
      const message = await addToCart(id);
      toast.success(message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
    setIsClicked(false);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const productId = data?.data.data._id;

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

  // remove
  async function removeFromWishList(id) {
    if (token) {
      const { data } = await removeFromList(id);
      toast.success(data?.message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
  }

  if (isError) return <div className='alert alert-danger'>{isError}</div>;

  if (isLoading) return <Loading />;

  return (
    <>
      <div className='container my-5'>
        <div className='row align-items-center gy-5'>
          {/* slider */}
          <div className='col-md-4'>
            <Slider {...settings}>
              {data?.data.data.images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  className='w-100'
                  height={400}
                  alt={data?.data.data.title}
                />
              ))}
            </Slider>
          </div>

          {/* row of data */}
          <div className='col-md-8 px-5 px-md-0'>
            <div className='d-flex align-items-center justify-content-between mb-3'>
              <WishBtn
                type={"delete"}
                onClick={removeFromWishList}
                productId={productId}
              >
                Remove
              </WishBtn>

              <WishBtn
                type={"add"}
                onClick={addToWishList}
                productId={productId}
              >
                Add
              </WishBtn>
            </div>

            <h2 className='mb-2'>{data?.data.data.title}</h2>
            <p className='mb3'>{data?.data.data.description}</p>
            <Ratting
              price={data?.data.data.price}
              rate={data?.data.data.ratingsAverage}
            />
            <button
              className='btn text-white w-100 my-2 bg-main'
              onClick={() => {
                addproduct(data?.data.data.id);
              }}
              disabled={isClicked}
            >
              {isClicked ? (
                <i className='fa-solid fa-spinner fa-spin mx-1'></i>
              ) : (
                "add to cart"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
