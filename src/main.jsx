import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "flowbite/dist/flowbite.min.js";
import CounterContextProvider from "./components/Context/CounterContextProvider.jsx";
import TokenContextProvider from "./components/Context/TokenContextProvider.jsx";
import AllProductsContextProvider from "./components/Context/AllProductsContextProvide.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from "./components/Context/CartContext.jsx";
import GetCategoriesContextProvider from "./components/Context/CategoriesContext.jsx";
import BrandsContextProvider from "./components/Context/BrandsContextProvider.jsx";
import SubCategoriesProvider from "./components/Context/SubCategoriesProvider.jsx";
import WishlistContextProvider from "./components/Context/WishlistContextProvider.jsx";
createRoot(document.getElementById("root")).render(
  <TokenContextProvider>
    <CartContextProvider>
      <CounterContextProvider>
        <AllProductsContextProvider>
          <GetCategoriesContextProvider>
            <BrandsContextProvider>
              <SubCategoriesProvider>
                <WishlistContextProvider>
                <App />
                </WishlistContextProvider>
              </SubCategoriesProvider>
            </BrandsContextProvider>
          </GetCategoriesContextProvider>
        </AllProductsContextProvider>
      </CounterContextProvider>
    </CartContextProvider>
  </TokenContextProvider>
);
