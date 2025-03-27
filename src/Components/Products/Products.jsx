import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import ProductItem from "./ProductItem";

export default function Products() {
  // method to get products from api
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data, isError } = useQuery("featuerProducts", getProducts);

  return (
    <>
      <div className='container py-5'>
        {isError && <div className='alert alert-danger'>{isError}</div>}
        {isLoading ? (
          <Loading />
        ) : (
          <div className='row gy-4'>
            {data?.data.data.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
