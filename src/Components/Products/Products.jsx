import axios from "axios";
import Loading from "../Loading/Loading";
import { useQuery } from "react-query";
import ProductItem from "./ProductItem";

export default function Products() {
  // method to get products from api
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  const { isLoading, data, isError } = useQuery("featuerProducts", getProducts);

  if (isLoading) return <Loading />;

  if (isError) return <div className='alert alert-danger'>{isError}</div>;

  return (
    <>
      <div className='container py-5'>
        <div className='row gy-4'>
          {data?.data.data.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
