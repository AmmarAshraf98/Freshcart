import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
// fontawesome
import "@fortawesome/fontawesome-free/css/all.min.css";
// slick slider file
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./index.css";
// Token
import TokenContextProvider from "./Context/Token";
// React Query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
// import { HelmetProvider } from "react-helmet-async";
import CartContextProvider from "./Context/Cart";
import { Toaster } from "react-hot-toast";
import WishlistProvider from "./Context/Wishlist";
import { HelmetProvider } from "react-helmet-async";

const root = ReactDOM.createRoot(document.getElementById("root"));

let queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TokenContextProvider>
        <HelmetProvider>
          <CartContextProvider>
            <WishlistProvider>
              <App />
            </WishlistProvider>
            <Toaster />
          </CartContextProvider>
        </HelmetProvider>
      </TokenContextProvider>
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
