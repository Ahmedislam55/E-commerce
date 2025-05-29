import { useContext, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContextProvider";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { ClipLoader } from "react-spinners";

function WishlistAdd({ productId, onWishlistChange }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addToWishlist } = useContext(wishlistContext);
  async function addWishlistProduct(id) {
    setIsLoading(true);
    const data = await addToWishlist(id);
    console.log(data);
    if (data.status === "success") {
      setTimeout(() => {
        toast.success("Product added to favourites", { theme: "dark" });
      }, 2500);
      if (onWishlistChange) onWishlistChange();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  return (
    <>
      {!isLoading ? (
        <button onClick={() => addWishlistProduct(productId)}>
          <i className="fa-regular fa-heart text-red-600"></i>
        </button>
      ) : (
        <div className="flex items-center justify-center">
          <ClipLoader
            color="red"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
    </>
  );
}

export default WishlistAdd;
