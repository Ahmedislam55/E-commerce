import axios from "axios";
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line no-unused-vars
export const brandsContext = createContext();
export default function BrandsContextProvider({ children }) {
  const [brands, setBrands] = useState([]);
  async function getAllBrands() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    const result = data.data;
    setBrands(result);
  }
  useEffect(() => {
    getAllBrands();
  }, []);
  return <brandsContext.Provider value={{brands}}>{children}</brandsContext.Provider>;
}
