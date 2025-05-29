import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const SubCategoriesContext = createContext();
export default function SubCategoriesProvider({children}) {
    const [subCategories, setSubCategories] = useState([]);
    async function getSubCategories() {
        const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/subcategories`);
        const result = data.data;
        setSubCategories(result);
    }
    useEffect(() => {
        getSubCategories();    
    }, []) 
  return (
    <>
      <SubCategoriesContext.Provider value={{ subCategories }}>
        {children}
      </SubCategoriesContext.Provider>

    </>
  )
}
