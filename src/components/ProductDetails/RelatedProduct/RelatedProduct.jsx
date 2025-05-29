import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { productsContext } from "../../Context/AllProductsContextProvide";
import Loading from "../../shared/Loading/Loading";
import ButtonCard from "../../shared/ButtonCard/ButtonCard";

function RelatedProduct(props) {
  let { products } = useContext(productsContext);
  const { categoryId } = props;
  const { currentProductId } = props;
  const [productRelated, setProductRelated] = useState([]);
  useEffect(() => {
    if (products.length > 0 && categoryId) {
      const result = products.filter(
        (product) =>
          product.category._id === categoryId &&
          product._id !== currentProductId
      );
      setProductRelated(result);
    }
  }, [categoryId, products, currentProductId]);
  return (
    <div className="py-8">
      <h1 className="text-3xl my-4 font-bold font-mono"> Related Products </h1>
      {productRelated && productRelated.length > 0 ? (
        <div className="main flex flex-wrap">
          {productRelated.map((product) => (
            <div
              key={product._id}
              className="lg:w-1/4 group md:w-1/2 p-4 mb-4 overflow-hidden"
            >
              <Link
                to={`/productDetails/${product.id}/${product._id}`}
                className="overflow-hidden"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="hover:scale-110 transition duration-1000 cursor-pointer"
                  />
                </div>
                <span className="text-main text-sm">
                  {product.category.name}
                </span>
                <h2 className="text-xl">
                  {product.title.split(" ").splice(0, 2).join(" ")}
                </h2>
                <div className="flex justify-between">
                  <div>
                    <span className="text-gray"> {product.price} EGP </span>
                  </div>
                  <div>
                    <i className="fa-solid fa-star rating-color"></i>
                    <span className="text-parg">{product.ratingsAverage}</span>
                  </div>
                </div>
              </Link>
              <div className="flex justify-center opacity-0 transition duration-700 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 items-center py-4">
                <ButtonCard productId={product._id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <Loading />
        </div>
      )}
    </div>
  );
}

export default RelatedProduct;
