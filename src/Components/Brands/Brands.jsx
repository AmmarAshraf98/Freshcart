import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useQuery } from "react-query";
import Loading from "../Loading/Loading";

export default function Brands() {
  // get all brands

  function getBrands() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }

  const { isLoading, isError, data } = useQuery("getBrands", getBrands);

  return (
    <>
      <Helmet>
        <title>Brands</title>
        <meta name='description' content='All our Brands' />
      </Helmet>
      <div className='container py-5'>
        {isLoading && <Loading />}
        {isError && (
          <div className='alert alert-danger my-5 p-4'>{isError}</div>
        )}
        <div className='row gy-4'>
          {data?.data.data.map((cat) => (
            <div className='col-md-3' key={cat._id}>
              <div className='cursor-pointer product bg-main-light'>
                <img
                  src={cat.image}
                  height={230}
                  alt={`This pic for ${cat.slug} category`}
                  className='w-100 mb-2'
                />
                <h3 className='h4 text-center text-main'>{cat.slug}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
