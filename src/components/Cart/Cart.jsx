import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import Loading from "../shared/Loading/Loading";
import { toast } from "react-toastify";
import styles from "./Cart.module.css";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
function Cart() {
  const [cartDetails, setCartDetails] = useState(null);
  const {
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    removeAllProductFromCart,
  } = useContext(CartContext);
  const [isDeleted, setIsDeleted] = useState([]);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(null);
  async function getCartDetails() {
    const cart = await getCart();
    console.log("cart", cart);
    setCartDetails(cart);
  }

  useEffect(() => {
    getCartDetails();
  }, []);
  async function deleteProductFromCart(productId) {
    setIsDeleted((prev) => [...prev, productId]);
    setIsLoading(true);
    try {
      const data = await removeProductFromCart(productId);
      if (data.status === "success") {
        setTimeout(() => {
          toast.success(data.message || "Product removed successfully", {
            theme: "dark",
          });
        }, 900);
      }
      getCartDetails();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsDeleted((prev) => prev.filter((id) => id !== productId));
      }, 900);
    }
  }
  async function deleteAllProduct() {
    setIsDeleteLoading(true);
    const data = await removeAllProductFromCart();
    getCartDetails();
    console.log(data, "datatatata");
    if (data.message === "success") {
      setTimeout(() => {
        toast.success("Product All removed successfully", {
          theme: "dark",
        });
      }, 500);
    }
    setTimeout(() => {
      setIsDeleteLoading(false);
    }, 500);
  }
  async function updateCount(productId, count) {
    setIsLoading(true);
    setIsUpdating(productId);
    console.log("productId", productId);
    try {
      const data = await updateProductFromCart(productId, count);
      if (data.status === "success") {
        setTimeout(() => {
          toast.success(data.message || "Product updated successfully", {
            theme: "dark",
          });
        }, 900);
      }
      getCartDetails();
    } finally {
      setTimeout(() => {
        setIsLoading(false);
        setIsUpdating(null);
      }, 1000);
    }
  }
  return (
    <>
      <div className="container">
        <div className="p-4">
          <h1 className="text-3xl my-4 font-bold font-sans">Wishlist Items</h1>
          {!isLoading ? (
            <>
              {cartDetails &&
              cartDetails.numOfCartItems == 0 &&
              cartDetails.data.totalCartPrice == 0 ? (
                ""
              ) : (
                <>
                  {cartDetails ? (
                    <div className="md:flex justify-between items-center">
                      <h2 className="text-lg my-4 text-gray-600 font-semibold">
                        There are
                        <span className="text-main px-2">
                          {cartDetails.numOfCartItems}
                        </span>
                        products in this wishlist.
                      </h2>
                      <h2 className="text-lg my-4 text-gray-600 font-semibold">
                        Total Price =
                        <span className="text-main pl-2">
                          {cartDetails.data.totalCartPrice} EGP
                        </span>
                      </h2>
                    </div>
                  ) : (
                    <Loading />
                  )}
                </>
              )}
            </>
          ) : (
            <div className="my-8 h-4 flex justify-center items-center">
              <div className={styles.loader}></div>
            </div>
          )}
          <div className="relative overflow-x-auto sm:rounded-lg">
            {!cartDetails || cartDetails.data.products.length === 0 ? (
              <div className="text-center py-4 text-main text-2xl uppercase font-mono">
                Add some items and come back 😉
              </div>
            ) : (
              <>
                <table className="w-full text-left rtl:text-right">
                  <thead className="text-xl text-white bg-main">
                    <tr>
                      <th scope="col" className="px-16 py-3">
                        <span className="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartDetails ? (
                      cartDetails.data.products.map((product, index) => (
                        <tr
                          key={index}
                          className="border-b bg-white text-gray-900"
                        >
                          <td className="p-4">
                            <img
                              src={product.product.imageCover}
                              className="w-16 md:w-32 max-w-full max-h-full"
                              alt={product.product.title}
                              loading="lazy"
                            />
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {product.product.title
                              .split(" ")
                              .splice(0, 2)
                              .join(" ")}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <button
                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                                type="button"
                                onClick={() =>
                                  updateCount(
                                    product.product._id,
                                    product.count - 1
                                  )
                                }
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </button>
                              <div className="bg-gray-200 w-28 text-center py-1 rounded">
                                {isUpdating === product.product._id ? (
                                  <span className="font-mono text-main">
                                    {" "}
                                    loading...{" "}
                                  </span>
                                ) : (
                                  <h3 className="text-lg"> {product.count} </h3>
                                )}
                              </div>
                              <button
                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-400"
                                type="button"
                                onClick={() =>
                                  updateCount(
                                    product.product._id,
                                    product.count + 1
                                  )
                                }
                              >
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 18"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 1v16M1 9h16"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                          <td className="px-6 py-4 font-semibold">
                            {product.price * product.count} EGP
                          </td>
                          <td className="px-6 py-4">
                            {!isDeleted.includes(product.product._id) ? (
                              <button
                                onClick={() =>
                                  deleteProductFromCart(product.product._id)
                                }
                                className="group relative flex h-14 w-14 flex-col items-center justify-center overflow-hidden rounded-xl border-0 bg-main hover:bg-red-600 transition duration-1000"
                              >
                                <svg
                                  viewBox="0 0 1.625 1.625"
                                  className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                                  height={15}
                                  width={15}
                                >
                                  <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195" />
                                  <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033" />
                                  <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016" />
                                </svg>
                                <svg
                                  width={16}
                                  fill="none"
                                  viewBox="0 0 39 7"
                                  className="origin-right duration-500 group-hover:rotate-90"
                                >
                                  <line
                                    strokeWidth={4}
                                    stroke="white"
                                    y2={5}
                                    x2={39}
                                    y1={5}
                                  />
                                  <line
                                    strokeWidth={3}
                                    stroke="white"
                                    y2="1.5"
                                    x2="26.0357"
                                    y1="1.5"
                                    x1={12}
                                  />
                                </svg>
                                <svg width={16} fill="none" viewBox="0 0 33 39">
                                  <mask fill="white" id="path-1-inside-1_8_19">
                                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z" />
                                  </mask>
                                  <path
                                    mask="url(#path-1-inside-1_8_19)"
                                    fill="white"
                                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                  />
                                  <path
                                    strokeWidth={4}
                                    stroke="white"
                                    d="M12 6L12 29"
                                  />
                                  <path
                                    strokeWidth={4}
                                    stroke="white"
                                    d="M21 6V29"
                                  />
                                </svg>
                              </button>
                            ) : (
                              <div className="group relative flex h-14 w-14 pt-[10rem] flex-col items-center justify-center  rounded-xl">
                                <Loading />
                              </div>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="text-center py-4">
                          <Loading />
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
                <div className="flex md:justify-between justify-evenly">
                  <Link to="/checkout">
                    <button className="btn font-mono my-4 bg-main py-2 w-24 hover:text-main hover:bg-transparent hover:border border-main transation duration-700 rounded border-0 text-white">
                      Check Out
                    </button>
                  </Link>
                  {isDeleteLoading ? (
                    <div className="flex justify-center items-center overflow-hidden p-2">
                      <ClipLoader
                        color="red"
                        size={20}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                      />
                    </div>
                  ) : (
                    <button
                      onClick={deleteAllProduct}
                      className="btn bg-red-900 text-white my-4 rounded  py-2 w-28 border-0 font-mono hover:bg-transparent hover:border border-red-900 hover:text-red-900 transition duration-700"
                    >
                      Delete All
                    </button>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
