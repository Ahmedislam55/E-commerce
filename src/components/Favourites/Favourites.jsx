import { useContext, useEffect } from "react";
import { wishlistContext } from "../Context/WishlistContextProvider";
import { useState } from "react";
import Loading from "../shared/Loading/Loading";
import { Link } from "react-router-dom";
import ButtonCard from "../shared/ButtonCard/ButtonCard";
import WishlistRemove from "../shared/WishlistRemove/WishlistRemove";
import WishlistAdd from "../shared/WishlistAdd/WishlistAdd";

function Favourites() {
  const { getWishlist } = useContext(wishlistContext);
  const [isLoading, setIsLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  function updateWishlist() {
    getWishlist().then((data) => {
      if (data && data.status === "success") {
        setWishlist(data.data);
      }
    });
  }
  useEffect(() => {
    fetchWishlist();
    updateWishlist();
  }, [getWishlist]);

  // دالة عشان تعرف إذا المنتج في الـ wishlist ولا لأ
  function isInWishlist(productId) {
    return wishlist.some((item) => item._id === productId);
  }
  const [products, setProducts] = useState([]);
  // eslint-disable-next-line no-redeclare
  async function fetchWishlist() {
    setIsLoading(true);
    const data = await getWishlist();
    const result = data.data;
    setProducts(result);
    setWishlist(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    fetchWishlist();
  }, []);
  return (
    <div className="container">
      <h1 className="text-3xl my-8 font-bold font-mono">Favourite Products</h1>
      <hr />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="main py-8">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div
                className="xl:w-1/4 md:w-1/2 lg:w-1/3 p-4 mb-4 group"
                key={product.id}
              >
                <Link
                  to={`/productDetails/${product.id}/${product.category._id}`}
                >
                  <div className="overflow-hidden">
                    <img
                      src={product.imageCover}
                      alt={product.title}
                      className="hover:scale-110 transition duration-1000 cursor-pointer"
                      Loading="lazy"
                    />
                  </div>
                </Link>
                <span className="text-main text-sm">
                  {product.category.name}
                </span>
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
            <span className="text-center py-4 text-main text-2xl uppercase font-mono">
              Add some items and come back 😉
            </span>
          )}
        </div>
      )}
    </div>
  );
}

export default Favourites;
