import axios from "axios";
import Loading from "../Loading/Loading";
import Ratting from "../Ratting/Ratting";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useContext } from "react";
import { CartContext } from "../../Context/Cart";
import { TokenContext } from "../../Context/Token";
import toast from "react-hot-toast";
import { wishContext } from "../../Context/Wishlist";

export default function Products() {
  // method to get products from api
  function getProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { isLoading, data, isError } = useQuery("featuerProducts", getProducts);

  // get function to add to cart
  let { addToCart } = useContext(CartContext);

  // get token to check if user is logged in before order
  let { token } = useContext(TokenContext);

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

  // Wish list method
  const { addTolist, removeFromList } = useContext(wishContext);

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
      <div className="container py-5">
        {isError && <div className="alert alert-danger">{isError}</div>}
        {isLoading ? (
          <Loading />
        ) : (
          <div className="row gy-4">
            {data?.data.data.map((product) => (
              <div
                className="col-sm-4 col-md-3 col-lg-2 cursor-pointer product"
                key={product._id}>
                <i
                  className={`fa-regular fa-heart text-main `}
                  onClick={() => addToWishList(product._id)}></i>

                <Link to={"details/" + product._id}>
                  <img src={product.imageCover} className="w-100 mb-2" alt="" />
                  <h2 className="h6 text-main">{product.brand.name}</h2>
                  <p className="mb-1">{product.category.name}</p>
                  <Ratting
                    price={product.price}
                    rate={product.ratingsAverage}
                  />
                </Link>

                <button
                  className="btn text-white w-100 my-2"
                  onClick={() => {
                    addproduct(product._id);
                  }}>
                  + add to cart
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
