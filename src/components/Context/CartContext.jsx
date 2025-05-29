/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const CartContext = createContext();
export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState("");
  const API_URL = `https://ecommerce.routemisr.com/api/v1/cart`;
  const ORDER_API_URL = `https://ecommerce.routemisr.com/api/v1/orders`;
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  async function addToCart(productId) {
    //api value configration
    const { data } = await axios.post(
      API_URL,
      { productId },
      {
        headers,
      }
    );
    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems);
    }
    return data;
  }
  async function removeProductFromCart(productId) {
    const { data } = await axios.delete(`${API_URL}/${productId}`, {
      headers,
    });
    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems);
    }
    return data;
  }
  async function removeAllProductFromCart() {
    const { data } = await axios.delete(`${API_URL}`, {
      headers,
    });
    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems);
    }
    return data;
  }
  async function updateProductFromCart(productId, count) {
    const { data } = await axios.put(
      `${API_URL}/${productId}`,
      { count },
      {
        headers,
      }
    );
    console.log("DataDAta", data);
    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems);
    }
    return data;
  }
  async function getCart() {
    const { data } = await axios.get(API_URL, {
      headers,
    });
    console.log(data);
    if (data.status === "success") {
      setNumOfCartItems(data.numOfCartItems);
    }
    setCartId(data.cartId);
    return data;
  }
  async function callOfLinePayment(shippingAddress) {
    const { data } = await axios.post(
      `${ORDER_API_URL}/${cartId}/`,
      { shippingAddress },
      {
        headers,
      }
    );
    if (data.status === "success") {
      getCart();
    }
    return data;
  }
  async function callOnLinepayment(shippingAddress) {
    const { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
      { shippingAddress },
      {
        headers,
      }
    );
    return data;
  }
  async function getUserOrder(id) {
    const { data } = await axios.get(`${ORDER_API_URL}/user/${id}`);
    return data;
  }
  useEffect(() => {
    getCart();
  }, []);
  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getCart,
        removeProductFromCart,
        updateProductFromCart,
        callOfLinePayment,
        callOnLinepayment,
        getUserOrder,
        removeAllProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
