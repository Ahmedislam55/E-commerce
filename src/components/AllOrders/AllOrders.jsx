import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import { tokenContext } from "../Context/TokenContextProvider";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import Loading from "../shared/Loading/Loading";
function AllOrders() {
  const [isLoading, setIsLoading] = useState(false);
  const { getUserOrder } = useContext(CartContext);
  const [orders, setOrders] = useState([]);
  const { token } = useContext(tokenContext);
  function getId() {
    const decoded = jwtDecode(token);
    getOrders(decoded.id);
  }
  async function getOrders(id) {
    setIsLoading(true);
    const data = await getUserOrder(id);
    console.log("User Orders:", data);
    setOrders(data);
    setIsLoading(false);
  }
  useEffect(() => {
    token && getId();
  }, [token]);
  return (
    <div className="container p-4">
      <h1 className="text-3xl my-8 font-bold font-mono">My Purchases</h1>
      <hr className="my-4" />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative overflow-x-auto">
          <table className="w-full text-lg text-left rtl:text-right">
            <thead className="text-xl text-center text-white bg-main">
              <tr>
                <th></th>
                <th scope="col" className="px-6 py-3">
                  Order ID
                </th>
                <th scope="col" className="px-6 py-3">
                  isPaid
                </th>
                <th scope="col" className="px-6 py-3">
                  paymentMethodType
                </th>
                <th scope="col" className="px-6 py-3">
                  totalOrderPrice
                </th>
                <th> view details </th>
              </tr>
            </thead>
            <tbody>
              {orders && orders.length != 0 ? (
                orders.map((order, index) => (
                  <tr
                    key={order.id}
                    className="bg-gray-50 border-b text-center text-gray-900"
                  >
                    <td className="px-2">{index + 1}</td>
                    <td scope="row" className="py-4">
                      {order.id}
                    </td>
                    <td className="py-4">{order.paymentMethodType}</td>
                    <td className="py-4">
                      {order.isPaid ? "Paid" : "Not Paid "}
                    </td>
                    <td className="py-4">{order.totalOrderPrice} EGP</td>
                    <td>
                      <Link
                        to={`/orderCartItem/${order.id}`}
                        state={{ cartItems: order.cartItems }}
                        className="transition duration-500 hover:text-main font-mono"
                      >
                        <i className="fa fa-eye"></i>
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="bg-gray-50 border-b text-center text-gray-900">
                  <td colSpan="6" className="py-4">
                    <div className="text-center py-4 text-main text-2xl uppercase font-mono">
                      Add some items and come back 😉
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AllOrders;
