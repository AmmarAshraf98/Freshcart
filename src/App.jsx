import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Notfound from "./Components/Notfound/Notfound.jsx";
import Contact from "./Components/Contact/Contact.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import ProtectAuth from "./Components/ProtectAuth/ProtectAuth.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import ForgetPass from "./Components/ForgetPass/ForgetPass.jsx";
import VerifyCode from "./Components/VerifyCode/VerifyCode.jsx";
import ResetPass from "./Components/ResetPass/ResetPass.jsx";
import Shipping from "./Components/Shipping/Shipping.jsx";
import Allorders from "./Components/Allorders/Allorders.jsx";
import Brands from "./Components/Brands/Brands.jsx";

function App() {
  let routes = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "categories", element: <Categories /> },
        { path: "brands", element: <Brands /> },
        { path: "contact", element: <Contact /> },
        {
          path: "login",
          element: (
            <ProtectAuth>
              <Login />
            </ProtectAuth>
          ),
        },
        {
          path: "register",
          element: (
            <ProtectAuth>
              <Register />
            </ProtectAuth>
          ),
        },
        {
          path: "forgetpass",
          element: (
            <ProtectAuth>
              <ForgetPass />
            </ProtectAuth>
          ),
        },
        {
          path: "verifycode",
          element: (
            <ProtectAuth>
              <VerifyCode />
            </ProtectAuth>
          ),
        },
        {
          path: "resetPass",
          element: (
            <ProtectAuth>
              <ResetPass />
            </ProtectAuth>
          ),
        },
        {
          path: "shppingaddress",
          element: (
            <ProtectedRoutes>
              <Shipping />
            </ProtectedRoutes>
          ),
        },
        { path: "details/:id", element: <ProductDetails /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <Allorders />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <Notfound /> },
      ],
    },
  ]);

  return <RouterProvider router={routes}></RouterProvider>;
}

export default App;
