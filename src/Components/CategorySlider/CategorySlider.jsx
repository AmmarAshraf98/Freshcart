import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading/Loading";
import Slider from "react-slick";

export default function CategorySlider() {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  async function callCateApi() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategory(data.data);
    setLoading(false);
  }

  useEffect(() => {
    callCateApi();
  }, []);

  return (
    <>
      <div className="container my-5">
        <h2 className="mb-3">Shop Popular Categories</h2>
        {loading ? (
          <Loading />
        ) : (
          <Slider {...settings}>
            {category.map((cate) => (
              <div className="overflow-hidden" key={cate._id}>
                <img
                  src={cate.image}
                  height={200}
                  className="w-100 mx-1"
                  alt="our category items"
                />
                <p className="">{cate.name.split(" ").slice(0, 2)}</p>
              </div>
            ))}
          </Slider>
        )}
      </div>
    </>
  );
}
