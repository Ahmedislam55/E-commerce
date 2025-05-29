import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const categoriesContext = createContext();
function GetCategoriesContextProvider(props) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    let result = data.data;
    setCategories(result);
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <categoriesContext.Provider value={{ categories }}>
      {props.children}
    </categoriesContext.Provider>
  );
}
export default GetCategoriesContextProvider;
