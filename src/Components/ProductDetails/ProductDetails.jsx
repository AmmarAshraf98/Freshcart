import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Ratting from "../Ratting/Ratting";
import Loading from "../Loading/Loading";
import { CartContext } from "../../Context/Cart";
import { TokenContext } from "../../Context/Token";
import toast from "react-hot-toast";
import Slider from "react-slick";
import { wishContext } from "../../Context/Wishlist";

export default function ProductDetails() {
  // get token id excist
  let { token } = useContext(TokenContext);

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
      let { data } = await addToCart(id);
      toast.success(data?.message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

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

  return (
    <>
      <div className="container my-5">
        {isError && <div className="alert alert-danger">{isError}</div>}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row align-items-center gy-5">
            {/* slider */}
            <div className="col-md-4">
              <Slider {...settings}>
                {data?.data.data.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    className="w-100"
                    height={400}
                    alt={data?.data.data.title}
                  />
                ))}
              </Slider>
            </div>

            {/* row of data */}
            <div className="col-md-8">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className="d-block">
                  add
                  <i
                    className="fa-regular fa-heart text-main cursor-pointer mx-1"
                    onClick={() => addToWishList(data?.data.data._id)}></i>
                </span>
                <span className="d-block">
                  remove
                  <i
                    className="fa-solid fa-heart text-main cursor-pointer mx-1"
                    onClick={() => {
                      removeFromWishList(data?.data.data._id);
                    }}></i>
                </span>
              </div>

              <h2 className="mb-2">{data?.data.data.title}</h2>
              <p className="mb3">{data?.data.data.description}</p>
              <Ratting
                price={data?.data.data.price}
                rate={data?.data.data.ratingsAverage}
              />
              <button
                className="btn text-white w-100 my-2 bg-main"
                onClick={() => {
                  addproduct(data?.data.data.id);
                }}>
                + add to cart
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
