import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading/Loading";

function CategoriesDetails() {
  const [categories, setCategories] = useState(null);
  const { categoryId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  async function getCategoriesDetails() {
    setIsLoading(true);
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${categoryId}`
    );
    const result = data.data;
    console.log(result);
    setCategories(result);
    setIsLoading(false);
  }
  useEffect(() => {
    getCategoriesDetails();
  }, []);
  return (
    <div className="container">
      <div className="my-8 p-4">
        {categories && !isLoading ? (
          <div
            key={categories._id}
            className="flex justify-center items-center"
          >
            <div className="w-1/2">
              <img
                src={categories.image}
                alt={categories.name}
                className="w-[50%] mx-auto"
              />
            </div>
            <div className="w-1/2">
              <h2 className="text-2xl"> {categories.name} </h2>
              <h6 className="my-4 text-main">
                Created At :{" "}
                <span className="text-parg"> {categories.createdAt}</span>
              </h6>
              <h6 className="my-4 text-main">
                Updated At :{" "}
                <span className="text-parg"> {categories.updatedAt}</span>
              </h6>
            </div>
          </div>
        ) : (<Loading />)}
      </div>
    </div>
  );
}

export default CategoriesDetails;
