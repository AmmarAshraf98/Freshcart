import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../images/freshcart-logo.svg";
import { TokenContext, useToken } from "../../Context/Token";
import { CartContext } from "../../Context/Cart";
import { wishContext } from "../../Context/Wishlist";

export default function Navbar() {
  const navigate = useNavigate();

  // token to handle display UI
  const { user, removeUserData } = useToken();

  // number of cart items
  const {
    dataInformation: { products },
  } = useContext(CartContext);

  const cartNumber = products?.length;

  // wish list usage
  const { wishListItems } = useContext(wishContext);
  const wishListCount = wishListItems?.length;

  // logout method depend on token in local storage
  function logOut() {
    removeUserData();
    navigate("/");
  }

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-main-light  '>
        <div className='container-fluid'>
          <Link className='navbar-brand text-white' to={"/"}>
            <img src={logo} className='w-100' alt='fresh cart logo' />
          </Link>
          <button
            className='navbar-toggler px-1'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon font-sm'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <NavLink className='nav-link' to={"/"}>
                  Home
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={"brands"}>
                  Brands
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={"categories"}>
                  Categories
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink className='nav-link' to={"contact"}>
                  Contact
                </NavLink>
              </li>
            </ul>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              {/*    <li className='nav-item d-flex align-items-center'>
                <i className='fa-brands mx-2 fa-facebook'></i>
                <i className='fa-brands mx-2 fa-instagram'></i>
              </li> */}

              {/* show links depend on token */}
              {user?.token ? (
                <>
                  <li className='nav-item d-flex mx-1 my-2 align-items-center'>
                    <NavLink className='' to={"cart"}>
                      <span className='position-relative'>
                        <i className='fa-solid fa-cart-plus'></i>
                        <span className='position-absolute  p-1 top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                          {cartNumber}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li className='nav-item d-flex align-items-center  ps-1'>
                    <NavLink to={"wishlist"}>
                      <span className='position-relative'>
                        <i className='fa-regular fa-heart'></i>
                        <span className='position-absolute  p-1 top-0 start-100 translate-middle badge rounded-pill bg-danger'>
                          {wishListCount}
                        </span>
                      </span>
                    </NavLink>
                  </li>
                  <li className='nav-item md-ms-2'>
                    <button className='nav-link  text-danger' onClick={logOut}>
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to={"login"}>
                      Login
                    </NavLink>
                  </li>
                  <li className='nav-item'>
                    <NavLink className='nav-link' to={"register"}>
                      Sign-up
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>

          {user?.token && (
            <p className='font-xs mb-0 d-none ms-lg-4 d-lg-block '>
              Hi <span className='text-main fw-bold'>{user?.name}</span>
              👽
            </p>
          )}
        </div>
      </nav>
    </>
  );
}
