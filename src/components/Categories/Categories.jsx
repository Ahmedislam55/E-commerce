import { useContext } from "react";
import { categoriesContext } from "../Context/CategoriesContext";
import Loading from "../shared/Loading/Loading";
import { Link} from "react-router-dom";
import SubCategories from "./SubCategories/SubCategories";
function Categories() {
  const { categories } = useContext(categoriesContext);
  return (
    <section className="container p-4">
      <h1 className="text-3xl my-8 font-bold font-mono">
        Explore Our Categories
      </h1>
      <hr />
      <div className="main py-8">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <div
              className="xl:w-1/4  md:w-1/2 lg:w-1/3 p-4 mb-4 group"
              key={category._id}
            >
              <Link to={`/categoriesDetails/${category._id}`}>
                <div className="overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-96 hover:scale-110 transition duration-1000 cursor-pointer"
                    Loading="lazy"
                  />
                </div>
                <h2 className="text-xl my-2 font-bold text-neutral-900">
                  {category.name}
                </h2>
                <div className="my-2">
                  <h4 className="text-main text-lg">
                    Created At :
                    <span className="text-parg text-base">
                      {category.createdAt}
                    </span>
                  </h4>
                </div>
                <div>
                  <h4 className="text-main text-lg">
                    UpdatedAt :
                    <span className="text-parg text-base">
                      {category.updatedAt}
                    </span>
                  </h4>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
      <SubCategories />
    </section>
  );
}

export default Categories;
