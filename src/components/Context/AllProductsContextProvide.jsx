import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const productsContext = createContext();
function AllProductsContextProvider(props) {
  const [products, setProducts] = useState([]);
  async function getAllProducts() {
    const { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    let result = data.data;
    setProducts(result);
  }
  useEffect(() => {
    getAllProducts();
  }, []);
  return (
    <productsContext.Provider value={{ products }}>
      {props.children}
    </productsContext.Provider>
  );
}
export default AllProductsContextProvider;
