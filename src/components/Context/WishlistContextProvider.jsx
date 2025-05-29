import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const wishlistContext = createContext();
export default function WishlistContextProvider({ children }) {
  // eslint-disable-next-line no-unused-vars
  const [wishlistId, setWishlistId] = useState("");
  const API_URL = `https://ecommerce.routemisr.com/api/v1/wishlist`;
  const headers = {
    token: localStorage.getItem("userToken"),
  };
  const [numFoverite, setNumFoverite] = useState(0)
  async function addToWishlist(productId) {
    const { data } = await axios.post(
      API_URL,
      { productId },
      {
        headers,
      }
    );
    getWishlist();
    return data;
  }
  async function removeToWishlist(productId) {
    const { data } = await axios.delete(`${API_URL}/${productId}`, {
      headers,
    });
    getWishlist();
    return data;
  }

  async function getWishlist() {
    const { data } = await axios.get(API_URL, {
      headers,
    });
    setWishlistId(data.wishlistId);
    setNumFoverite(data.data.length)
    return data;
  }
  useEffect(() => {
    getWishlist();
  }, []);
  return (
    <wishlistContext.Provider
      value={{
        addToWishlist,
        getWishlist,
        removeToWishlist,
        numFoverite,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
}
