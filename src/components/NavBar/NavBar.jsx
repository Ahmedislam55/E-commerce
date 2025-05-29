/* eslint-disable no-unused-vars */
/* NavBar.jsx */
import { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { AnimatePresence, motion } from "framer-motion";
import { tokenContext } from "../Context/TokenContextProvider";
import { CartContext } from "../Context/CartContext";
import { wishlistContext } from "../Context/WishlistContextProvider";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, when: "beforeChildren" },
  },
  exit: {
    transition: { staggerChildren: 0.05, when: "afterChildren" },
  },
};
const item = {
  hidden: { y: -20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  let { token } = useContext(tokenContext);
  let { setToken } = useContext(tokenContext);
  let { numOfCartItems } = useContext(CartContext);
  const { numFoverite } = useContext(wishlistContext);
  const navigate = useNavigate();
  function logOut() {
    // 1- remove token from local storage
    localStorage.removeItem("userToken");
    // 2- remove token from context
    setToken(null);
    // 3- navigate to Login
    navigate("/login");
  }
  return (
    <>
      {/* small Nav */}
      <nav className="bg-slate-100 w-full">
        <div className="max-w-screen-xl md:flex items-center justify-between mx-auto p-2 px-4">
          <div className="hidden md:block">
            <span className="md:text-sm text-gray-600">
              Super Value Deals - Save more with coupons
            </span>
          </div>
          <ul className="flex gap-5 items-center justify-center">
            {[
              "facebook",
              "square-instagram",
              "tiktok",
              "twitter",
              "linkedin",
              "youtube",
            ].map((ic) => (
              <li key={ic}>
                <i
                  className={`fa-brands fa-${ic} text-gray-600 hover:text-main transition duration-500 cursor-pointer`}
                />
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Big Nav */}
      <nav className="bg-white border-b border-gray-200 relative">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
          <div>
            <Link
              to="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="Logo" />
            </Link>
          </div>
          <div className="flex gap-8 justify-center items-center">
            {token ? (
              <>
                {" "}
                <div className="relative  mt-1 md:hidden">
                  <Link
                    to="/favourites"
                    className="block py-3 px-3 rounded-sm text-black hover:text-red-800  transition duration-500"
                  >
                    <span>
                      <i className="fa-regular fa-heart text-2xl"></i>
                    </span>

                    {numFoverite === 0 ? (
                      ""
                    ) : (
                      <span className="absolute -top-1 -right-2 bg-main h-6 w-6 text-white text-center rounded-full">
                        {numFoverite}
                      </span>
                    )}
                  </Link>
                </div>
                <div className="relative md:hidden">
                  <Link to="/cart">
                    <button data-quantity={numOfCartItems} className="pt-2">
                      <svg
                        className="icon-cart"
                        viewBox="0 0 24.38 30.52"
                        height="30.52"
                        width="24.38"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>icon-cart</title>
                        <path
                          transform="translate(-3.62 -0.85)"
                          d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                        />
                      </svg>
                    </button>
                    {numOfCartItems === 0 ? (
                      ""
                    ) : (
                      <span className="absolute -top-1 left-4 bg-main h-6 w-6 text-sm text-center  text-white rounded-full">
                        {numOfCartItems}
                      </span>
                    )}
                  </Link>
                </div>{" "}
              </>
            ) : (
              ""
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-main hover:text-white rounded-lg md:hidden hover:bg-main transition duration-500"
            >
              <span className="sr-only">Toggle menu</span>
              <svg
                className="w-5 h-5"
                viewBox="0 0 17 14"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  d="M1 1h15M1 7h15M1 13h15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <ul className="hidden md:flex font-mono  space-x-8 top-full left-0 bg-white border-b border-gray-200 md:border-0">
            {token ? (
              <>
                {[
                  { to: "/home", label: "Home" },
                  { to: "/products", label: "Products" },
                  { to: "/categories", label: "Categories" },
                  { to: "/brands", label: "Brands" },
                  { to: "/allorders", label: "Orders" },
                ].map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="block py-2 px-3 rounded-sm text-black hover:text-white hover:bg-main transition duration-500"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
                <div className="flex justify-center gap-8">
                  <li className="relative">
                    <Link
                      to="/favourites"
                      className="block py-3 px-3 rounded-sm text-black hover:text-red-800  transition duration-500"
                    >
                      <span>
                        <i className="fa-regular fa-heart text-2xl"></i>
                      </span>

                      {numFoverite === 0 ? (
                        ""
                      ) : (
                        <span className="absolute -top-1 -right-2 bg-main h-6 w-6 text-white text-center rounded-full">
                          {numFoverite}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="relative">
                    <Link to="/cart">
                      <button data-quantity={numOfCartItems} className="pt-2">
                        <svg
                          className="icon-cart"
                          viewBox="0 0 24.38 30.52"
                          height="30.52"
                          width="24.38"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <title>icon-cart</title>
                          <path
                            transform="translate(-3.62 -0.85)"
                            d="M28,27.3,26.24,7.51a.75.75,0,0,0-.76-.69h-3.7a6,6,0,0,0-12,0H6.13a.76.76,0,0,0-.76.69L3.62,27.3v.07a4.29,4.29,0,0,0,4.52,4H23.48a4.29,4.29,0,0,0,4.52-4ZM15.81,2.37a4.47,4.47,0,0,1,4.46,4.45H11.35a4.47,4.47,0,0,1,4.46-4.45Zm7.67,27.48H8.13a2.79,2.79,0,0,1-3-2.45L6.83,8.34h3V11a.76.76,0,0,0,1.52,0V8.34h8.92V11a.76.76,0,0,0,1.52,0V8.34h3L26.48,27.4a2.79,2.79,0,0,1-3,2.44Zm0,0"
                          />
                        </svg>
                      </button>
                      {numOfCartItems === 0 ? (
                        ""
                      ) : (
                        <span className="absolute -top-1 left-4 bg-main h-6 w-6 text-sm text-center  text-white rounded-full">
                          {numOfCartItems}
                        </span>
                      )}
                    </Link>
                  </li>
                  <li className="bg-main transition-all duration-700 hover:bg-white hover:border-main border group w-11 h-11 -mr-2 rounded-full text-center flex justify-center items-center">
                    <Link to="/changePassword">
                      <i className="fa-solid text-base fa-lock group-hover:text-main hover:scale-110 transition-all duration-700 text-white"></i>
                    </Link>
                  </li>
                  <li>
                    <span onClick={logOut}>
                      <button className="group flex items-center justify-start w-11 h-11 bg-main rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1">
                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                          <svg
                            className="w-4 h-4"
                            viewBox="0 0 512 512"
                            fill="white"
                          >
                            <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                          </svg>
                        </div>
                        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                          Logout
                        </div>
                      </button>
                    </span>
                  </li>
                </div>
              </>
            ) : (
              <>
                {[
                  { to: "/login", label: "Login" },
                  { to: "/register", label: "Register" },
                ].map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      className="block py-2 px-3 rounded-sm text-black hover:text-white hover:bg-main transition duration-500"
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="absolute  top-full left-0 w-full overflow-hidden z-10 md:hidden border-b border-gray-200 bg-white"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <motion.ul
                variants={container}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="flex flex-col p-4 space-y-1 lg:opacity-0"
              >
                {token ? (
                  <>
                    {[
                      { to: "/", label: "Home" },
                      { to: "/products", label: "Products" },
                      { to: "/categories", label: "Categories" },
                      { to: "/brands", label: "Brands" },
                      { to: "/allorders", label: "Orders" },
                      { to: "/changePassword", label: "Change Password" },
                    ].map((link) => (
                      <motion.li key={link.to} variants={item}>
                        <NavLink
                          to={link.to}
                          className="block py-2 px-3 rounded-sm text-black hover:text-white hover:bg-main transition duration-500"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      </motion.li>
                    ))}
                    <motion.li variants={item}>
                      <span
                        onClick={logOut}
                        className="block py-2 px-3 rounded-sm  text-black hover:text-white hover:bg-main transition duration-500 cursor-pointer"
                      >
                        SignOut
                      </span>
                    </motion.li>
                  </>
                ) : (
                  <>
                    {[
                      { to: "/register", label: "Register" },
                      { to: "/login", label: "Login" },
                    ].map((link) => (
                      <motion.li key={link.to} variants={item}>
                        <NavLink
                          to={link.to}
                          className="block py-2 px-3 rounded-sm text-black hover:text-white hover:bg-main transition duration-500"
                          onClick={() => setIsOpen(false)}
                        >
                          {link.label}
                        </NavLink>
                      </motion.li>
                    ))}
                  </>
                )}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
        {/* الـ Desktop menu */}
      </nav>
    </>
  );
}

export default NavBar;
