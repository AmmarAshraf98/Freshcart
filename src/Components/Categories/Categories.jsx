import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Categories() {
  function getCategory() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  const { isLoading, data, isError } = useQuery("getCategory", getCategory);

  return (
    <>
      <Helmet>
        <title>Categories</title>
        <meta name="description" content="All our categories" />
      </Helmet>
      <div className="container py-5">
        {isLoading && <Loading />}
        {isError && (
          <div className="alert alert-danger my-5 p-4">{isError}</div>
        )}
        <div className="row gy-4">
          {data?.data.data.map((cat) => (
            <div className="col-md-4 col-lg-3 col-sm-4" key={cat._id}>
              <div className="cursor-pointer product bg-main-light">
                <img
                  src={cat.image}
                  height={230}
                  alt={`This pic for ${cat.slug} category`}
                  className="w-100 mb-2"
                />
                <h3 className="h4 text-center text-main">{cat.slug}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
