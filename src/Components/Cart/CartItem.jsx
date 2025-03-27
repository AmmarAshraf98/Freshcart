import React, { useCallback, useContext, useState } from "react";
import { CartContext } from "../../Context/Cart";
import toast from "react-hot-toast";

export default function CartItem({ product }) {
  // loading
  const [loading, setLoading] = useState(false);

  // get function from
  let { deletProduct, changeProductCount } = useContext(CartContext);

  // delet product
  async function deletItem(id) {
    const message = await deletProduct(id);
    if (message === "product deleted successfully ! ✅") {
      toast.success(message, {
        position: "top-right",
      });
    } else {
      toast.error("please login first.", {
        position: "top-right",
      });
    }
  }

  // change product count
  async function setProductCount(id, count) {
    await changeProductCount(id, count);
  }

  return (
    <div className='row align-items-center p-1'>
      <div className='col-md-2'>
        <img
          src={product.product.imageCover}
          alt='your product'
          className='w-100'
        />
      </div>
      <div className='col-md-10'>
        <div className='row align-items-center'>
          <div className='col-sm-9'>
            <p>product name and description</p>
            <p className='text-main'>
              Price : <span>{product.price}</span>
            </p>
            <p
              className='cursor-pointer'
              onClick={() => deletItem(product.product.id)}
            >
              <i className='fa-solid fa-trash text-main me-2'></i>
              Remove
            </p>
          </div>
          <div className='col-sm-3'>
            <button
              className='btn btn-outline-success'
              onClick={() =>
                setProductCount(product.product.id, product.count + 1)
              }
            >
              +
            </button>
            <span className='mx-2'>{product.count}</span>
            <button
              className='btn btn-outline-success'
              onClick={() =>
                setProductCount(product.product.id, product.count - 1)
              }
              disabled={product.count === 1}
            >
              -
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
