import Loading from "../Loading/Loading";
import ProductItem from "./ProductItem";
import { useContext } from "react";
import { CartContext } from "../../Context/Cart";

export default function Products() {
  const { isLoading, isError, productList: data } = useContext(CartContext);
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
