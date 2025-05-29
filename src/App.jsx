import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LayOut from "./components/LayOut/LayOut";
import Home from "./components/Home/Home";
import Brands from "./components/Brands/Brands";
import Cart from "./components/Cart/Cart";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Products from "./components/Products/Products";
import NotFound from "./components/NotFound/NotFound";
import { tokenContext } from "./components/Context/TokenContextProvider";
import { useEffect } from "react";
import { useContext } from "react";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import { ToastContainer } from "react-toastify";
import CategoriesDetails from "./components/CategoriesDetails/CategoriesDetails";
import BrandsDetails from "./components/BrandsDetails/BrandsDetails";
import Checkout from "./components/Checkout/Checkout";
import AllOrders from "./components/AllOrders/AllOrders";
import OrderCartItem from "./components/OrderCartItem/OrderCartItem";
import Favourites from "./components/Favourites/Favourites";
import ForgotPasswords from "./components/ForgotPasswords/ForgotPasswords";
import VerifyCode from "./components/VerifyCode/VerifyCode";
import ResetPassword from "./components/ResstPassword/ResetPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
function App() {
  let { setToken } = useContext(tokenContext); // get token from context
  // check if token is in local storage
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);
  const router = createBrowserRouter([
    {
      path: "",
      element: <LayOut />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/home",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brands",
          element: (
            <ProtectedRoute>
              <Brands />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categories",
          element: (
            <ProtectedRoute>
              <Categories />
            </ProtectedRoute>
          ),
        },
        {
          path: "/products",
          element: (
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          ),
        },
        {
          path: "/changePassword",
          element: (
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          ),
        },
        {
          path: "/productDetails/:productId/:categoryId",
          element: (
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/categoriesDetails/:categoryId",
          element: (
            <ProtectedRoute>
              <CategoriesDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/brandsDetails/:brandId",
          element: (
            <ProtectedRoute>
              <BrandsDetails />
            </ProtectedRoute>
          ),
        },
        {
          path: "/checkout",
          element: (
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          ),
        },
        {
          path: "/allorders",
          element: (
            <ProtectedRoute>
              <AllOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "/orderCartItem/:orderId",
          element: (
            <ProtectedRoute>
              <OrderCartItem />
            </ProtectedRoute>
          ),
        },
        {
          path: "/favourites",
          element: (
            <ProtectedRoute>
              <Favourites />
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forgotPasswords",
          element: <ForgotPasswords />,
        },
        {
          path: "/verifyCode",
          element: <VerifyCode />,
        },
        {
          path: "/resetPassword",
          element: <ResetPassword />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
      <ToastContainer />
    </>
  );
}

export default App;
