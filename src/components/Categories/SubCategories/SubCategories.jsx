import { useContext } from "react";
import { SubCategoriesContext } from "../../Context/SubCategoriesProvider";
import Loading from "../../shared/Loading/Loading";
import { Link } from "react-router-dom";

function SubCategories() {
  const { subCategories } = useContext(SubCategoriesContext);
  console.log("subCategories", subCategories);
  return (
    <>
      <h1 className="text-3xl my-8 font-bold font-mono">
        Explore Our Sub Categories
      </h1>
      <hr />
      <div className="main py-8">
        {subCategories && subCategories.length > 0 ? (
          subCategories.slice(0,8).map((subCategories) => (
            <div
              className="xl:w-1/4  md:w-1/2 lg:w-1/3 p-4 mb-4 group"
              key={subCategories._id}
            >
                <h2 className="text-xl text-center my-2 font-bold text-neutral-900">
                  {subCategories.name}
                </h2>
            </div>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
}

export default SubCategories;
