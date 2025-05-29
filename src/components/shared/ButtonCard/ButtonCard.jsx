import { useContext, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";
function ButtonCard({ productId }) {
  const [loadingProductId, setLoadingProductId] = useState(null);
  const { addToCart } = useContext(CartContext);
  async function addProductToCart(id) {
    setLoadingProductId(id);
    const data = await addToCart(id);
    console.log(data);
    if (data.status === "success") {
      toast.success("Product added successfully", { theme: "dark" });
    }
    setLoadingProductId(null);
  }

  return (
    <div className="w-full" >
      {loadingProductId === productId ? (
        <div className="bg-main flex justify-center w-full rounded items-center p-2 px-4 text-white ">
          <ClipLoader
            color="#ffffff"
            loading={loadingProductId === productId}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <button
          onClick={() => addProductToCart(productId)}
          className="bg-main p-2 px-4 text-white hover:text-main hover:border rounded hover:bg-white uppercase border-0 w-full hover:border-main transition duration-500"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
}
export default ButtonCard;
