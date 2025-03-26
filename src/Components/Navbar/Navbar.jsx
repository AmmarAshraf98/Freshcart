import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { TokenContext } from "../../Context/Token";
import { CartContext } from "../../Context/Cart";
import { wishContext } from "../../Context/Wishlist";

export default function Navbar() {
  // token to handle display UI
  let { token, setToken } = useContext(TokenContext);

  let navigate = useNavigate();

  // number of cart items
  let { cart } = useContext(CartContext);

  // logout method depend on token in local storage
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/");
  }

  // wish list usage
  const { items } = useContext(wishContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-main-light  ">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to={"/"}>
            <img src={logo} className="w-100" alt="fresh cart logo" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"brands"}>
                  Brands
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"categories"}>
                  Categories
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"contact"}>
                  Contact
                </NavLink>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item d-flex align-items-center">
                <i className="fa-brands mx-2 fa-facebook"></i>
                <i className="fa-brands mx-2 fa-instagram"></i>
              </li>

              {/* show links depend on token */}
              {token ? (
                <>
                  <li className="nav-item d-flex mx-1 my-2 align-items-center">
                    <NavLink className="" to={"cart"}>
                      <span className="position-relative">
                        <i className="fa-solid fa-cart-plus"></i>
                        <span className="position-absolute  p-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {cart}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item d-flex align-items-center  ps-1">
                    <NavLink to={"wishlist"}>
                      <span className="position-relative">
                        <i className="fa-regular fa-heart"></i>
                        <span className="position-absolute  p-1 top-0 start-100 translate-middle badge rounded-pill bg-danger">
                          {items?.data.data.length}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li className="nav-item md-ms-2">
                    <button className="nav-link" onClick={logOut}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={"register"}>
                      Sign-up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
