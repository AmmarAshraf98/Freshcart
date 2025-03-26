import React from "react";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import Products from "../Products/Products";
import { Helmet } from "react-helmet-async";
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content=" Freshcart store for fashon   " />
      </Helmet>
      <MainSlider />
      <CategorySlider />
      <Products />
    </>
  );
}
