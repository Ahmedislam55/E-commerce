import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../shared/Loading/Loading";

function OrderCartItem() {
  const [orderDetails, setOrderDetails] = useState([]);
  const location = useLocation();
  const cartItems = location.state?.cartItems || [];
  function getOrderDetails() {
    setOrderDetails(cartItems);
  }
  useEffect(() => {
    getOrderDetails();
    console.log("Order Details:", orderDetails);
  }, []);

  return (
    <div className="container p-4">
      <h1 className="text-3xl my-8 font-bold font-mono">
        Orders Details
      </h1>
      <hr />
      {orderDetails && orderDetails.length > 0 ? (
        <div className="flex flex-wrap justify-evenly items-center">
          {orderDetails.map((item, index) => (
            <div
              className="xl:w-1/4 md:w-1/2 lg:w-1/3 p-4 mb-4 group"
              key={index}
            >
              <div className="overflow-hidden">
                <img
                  src={item.product.imageCover}
                  alt={item.product.title}
                  className="hover:scale-110 transition duration-1000 cursor-pointer"
                  Loading="lazy"
                />
              </div>
              <span className="text-main text-base">
                {item.product.category.name}
              </span>
              <h2 className="text-xl font-bold text-neutral-900">
                {item.product.title.split(" ").splice(0, 2).join(" ")}
              </h2>
              <span className="text-neutral-900 text-base">
                {" "}
                Total Price = {item.price} EGP{" "}
              </span>
              <div className="flex justify-between">
                <div>
                  <span className="text-parg"> Quantity = {item.count} </span>
                </div>
                <div>
                  <i className="fa-solid fa-star rating-color"></i>
                  <span className="text-gray">
                    {item.product.ratingsAverage}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default OrderCartItem;
