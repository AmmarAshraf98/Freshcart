import React, { useContext } from "react";
import { wishContext } from "../../Context/Wishlist";
import Loading from "../Loading/Loading";

import WishlistItem from "./WishlistItem";
import Empty from "../Utilites/Empty";

export default function Wishlist() {
  const { loading, wishListItems } = useContext(wishContext);

  if (loading) return <Loading />;

  if (!wishListItems.length > 0) return <Empty message='empty wishlist !🪹' />;

  return (
    <section className='mi-h-60 '>
      <div className='container'>
        {wishListItems?.map((product) => (
          <WishlistItem key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}
