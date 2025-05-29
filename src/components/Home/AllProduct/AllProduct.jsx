import { useContext, useState, useEffect } from "react";
import { productsContext } from "../../Context/AllProductsContextProvide";
import { wishlistContext } from "../../Context/WishlistContextProvider";
import { Link } from "react-router-dom";
import Loading from "../../shared/Loading/Loading";
import ButtonCard from "../../shared/ButtonCard/ButtonCard";
import WishlistAdd from "../../shared/WishlistAdd/WishlistAdd";
import WishlistRemove from "../../shared/WishlistRemove/WishlistRemove";

function AllProduct() {
  const { products } = useContext(productsContext);
  const { getWishlist } = useContext(wishlistContext);
  const [wishlist, setWishlist] = useState([]);
  function updateWishlist() {
    getWishlist().then((data) => {
      if (data && data.status === "success") {
        setWishlist(data.data);
      }
    });
  }
  async function fetchWishlist() {
    const data = await getWishlist();
    if (data && data.status === "success") {
      setWishlist(data.data);
    }
  }
  useEffect(() => {
    fetchWishlist();
    updateWishlist();
  }, [getWishlist]);

  // دالة عشان تعرف إذا المنتج في الـ wishlist ولا لأ
  function isInWishlist(productId) {
    return wishlist.some((item) => item._id === productId);
  }

  return (
    <div className="main py-8">
      {products && products.length > 0 ? (
        products.map((product) => (
          <div
            className="xl:w-1/4 2xl:w-1/5 md:w-1/2 lg:w-1/3 p-4 mb-4 group"
            key={product.id}
          >
            <Link to={`/productDetails/${product.id}/${product.category._id}`}>
              <div className="overflow-hidden">
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="hover:scale-110 transition duration-1000 cursor-pointer"
                  loading="lazy"
                />
              </div>
            </Link>
            <span className="text-main text-sm">{product.category.name}</span>
            <div className="flex justify-between items-center py-2">
              <h2 className="text-xl font-bold text-neutral-900">
                {product.title.split(" ").splice(0, 2).join(" ")}
              </h2>
              {isInWishlist(product._id) ? (
                <WishlistRemove
                  productId={product._id}
                  onWishlistChange={updateWishlist}
                />
              ) : (
                <WishlistAdd
                  productId={product._id}
                  onWishlistChange={updateWishlist}
                />
              )}
            </div>
            <div className="flex justify-between">
              <div>
                <span className="text-parg"> {product.price} EGP </span>
              </div>
              <div>
                <i className="fa-solid fa-star rating-color"></i>
                <span className="text-gray">{product.ratingsAverage}</span>
              </div>
            </div>

            <div className="flex justify-center opacity-0 transition duration-700 translate-y-20 group-hover:translate-y-0 group-hover:opacity-100 items-center py-4">
              <ButtonCard productId={product._id} />
            </div>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default AllProduct;
