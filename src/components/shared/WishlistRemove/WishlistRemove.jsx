import React, { useContext, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContextProvider";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

function WishlistRemove({ productId, onWishlistChange }) {
  const { removeToWishlist } = useContext(wishlistContext);
  const [isLoading, setIsLoading] = useState(false);
  async function removeWishlistProduct(id) {
    setIsLoading(true);
    const data = await removeToWishlist(id);
    if (data.status === "success") {
      setTimeout(() => {
        toast.success("Product removed from favourites", { theme: "dark" });
      }, 2500);
      if (onWishlistChange) onWishlistChange();
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <ClipLoader
            color="red"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <button onClick={() => removeWishlistProduct(productId)}>
          <i className="fa fa-heart text-red-600"></i>
        </button>
      )}
    </>
  );
}

export default WishlistRemove;
