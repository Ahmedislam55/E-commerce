import { useContext } from "react";
import { brandsContext } from "../Context/BrandsContextProvider";
import Loading from "../shared/Loading/Loading";
import { Link } from "react-router-dom";
function Brands() {
  const { brands } = useContext(brandsContext);
  return (
    <section className="container p-4">
      <h1 className="text-3xl my-8 font-bold font-mono">Explore Our Brands</h1>
      <hr />
      <div className="main py-8">
        {brands && brands.length > 0 ? (
          brands.map((brands) => (
            <div
              className="xl:w-1/4 md:w-1/2 lg:w-1/3 p-4 mb-4 group"
              key={brands.id}
            >
              <Link to={`/brandsDetails/${brands._id}`}>
                <div className="overflow-hidden">
                  <img
                    src={brands.image}
                    alt={brands.name}
                    className="hover:scale-110 transition duration-1000 cursor-pointer"
                    Loading="lazy"
                  />
                </div>
                <h2 className="text-xl font-bold text-neutral-900">
                  {brands.name}
                </h2>
                <div className="my-2">
                  <h4 className="text-main text-lg">
                    Created At :
                    <span className="text-parg text-base">
                      {brands.createdAt}
                    </span>
                  </h4>
                </div>
                <div>
                  <h4 className="text-main text-lg">
                    UpdatedAt :
                    <span className="text-parg text-base">
                      {brands.updatedAt}
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
    </section>
  );
}

export default Brands;
