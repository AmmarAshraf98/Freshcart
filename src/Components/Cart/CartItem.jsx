import React, { useContext, useState } from "react";
import { CartContext } from "../../Context/Cart";
import toast from "react-hot-toast";

export default function CartItem({ product }) {
  // loading
  const [loading, setLoading] = useState({
    delete: false,
    changeCounter: false,
  });

  // get function from
  let { deletProduct, changeProductCount } = useContext(CartContext);

  // delet product
  async function deletItem(id) {
    setLoading({ ...loading, delete: true });
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
    setLoading({ ...loading, delete: false });
  }

  // change product count
  async function setProductCount(id, count) {
    setLoading({ ...loading, changeCounter: true });
    await changeProductCount(id, count);
    setLoading({ ...loading, changeCounter: false });
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
              className={loading.delete ? "not-allowed" : "cursor-pointer"}
              onClick={() => deletItem(product.product.id)}
              disabled={loading.delete}
            >
              {loading.delete ? (
                <>
                  <i className='fa-solid fa-spinner fa-spin text-main me-2'></i>
                  Deleting ⏳
                </>
              ) : (
                <>
                  <i className='fa-solid fa-trash text-danger me-2'></i>
                  Remove
                </>
              )}
            </p>
          </div>

          {/* counter buttons */}
          <div className='col-sm-3'>
            <button
              disabled={loading.changeCounter}
              className='btn btn-outline-success'
              onClick={() =>
                setProductCount(product.product.id, product.count + 1)
              }
            >
              {loading.changeCounter ? (
                <i className='fa-solid fa-spinner fa-spin mx-1'></i>
              ) : (
                "+"
              )}
            </button>
            <span className='mx-2'>{product.count}</span>
            <button
              className='btn btn-outline-success'
              onClick={() =>
                setProductCount(product.product.id, product.count - 1)
              }
              disabled={product.count === 1 || loading.changeCounter}
            >
              {loading.changeCounter ? (
                <i className='fa-solid fa-spinner fa-spin mx-1'></i>
              ) : (
                "-"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
