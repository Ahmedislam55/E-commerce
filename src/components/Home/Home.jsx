import AllProduct from "./AllProduct/AllProduct";
import PopularCategory from "./PopularCategory/PopularCategory";
import StaticSlider from "./StaticSlider/StaticSlider";
function Home() {
  return (
    <>
    <div className="container">
      <StaticSlider />
      <PopularCategory />
      <div className="p-4">
       <h2 className="text-3xl my-8 font-bold font-mono">Shop All Products</h2>
       <hr />
       </div>
      <AllProduct />
    </div>
    </>
  );
}

export default Home;
