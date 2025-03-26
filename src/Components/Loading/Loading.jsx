import React from "react";
import { Bars } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="container my-5 mi-h-50">
      <div className="d-flex align-items-center justify-content-center">
        <Bars
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="bars-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    </div>
  );
}
