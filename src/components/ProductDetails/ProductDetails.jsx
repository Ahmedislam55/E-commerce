import axios from "axios";
import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../shared/Loading/Loading";
import RelatedProduct from "./RelatedProduct/RelatedProduct";
import Slider from "react-slick";
import ButtonCard from "../shared/ButtonCard/ButtonCard";
function ProductDetails() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    appendDots: (dots) => (
      <div className="mt- ">
        <ul className="flex justify-center items-center"> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-3 mt-4 h-3 rounded-full bg-slate-300 hover:bg-main transition duration-300"></div>
    ),
  };
  const [isLoading, setIsLoading] = useState(false);
  const [productDetails, setProductDetails] = useState(null);
  const { productId } = useParams();
  async function getProductDetails() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${productId}`
    );
    console.log(data.data);
    setTimeout(() => {
      setProductDetails(data.data);
      setIsLoading(false);
    }, 1000);
  }
  useEffect(() => {
    getProductDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]); // call the function when the component mounts or productId changes
  return (
    <section className="container py-4">
      <div className="md:flex mb-4 justify-evenly items-center px-4 p-4 xl:py-0">
        {productDetails && !isLoading ? (
          <>
            <div className="md:w-1/3">
              <Slider {...settings}>
                {productDetails.images.map((src) => (
                  <img
                    src={src}
                    className="m-auto transition"
                    alt={productDetails.title}
                    loading="lazy"
                  />
                ))}
              </Slider>
            </div>
            <div className="md:w-1/2">
              <h1 className="text-xl text-zinc-900 mb-4">
                {productDetails.title}
              </h1>
              <h3 className="text-base mb-4 text-parg">
                {productDetails.description}
              </h3>
              <span className="text-main font-semibold">
                {productDetails.category.name}
              </span>
              <div className="flex justify-between">
                <div>
                  <span className="text-parg">{productDetails.price} EGP</span>
                </div>
                <div>
                  <i className="fa-solid fa-star rating-color"></i>
                  <span className="text-gray">
                    {productDetails.ratingsAverage}
                  </span>
                </div>
              </div>
              <div className="py-4">
                <ButtonCard productId={productDetails._id} />
              </div>
            </div>
          </>
        ) : (
          <Loading />
        )}
      </div>

      {productDetails && (
        <RelatedProduct
          categoryId={productDetails.category._id}
          currentProductId={productDetails._id}
        />
      )}
    </section>
  );
}
export default ProductDetails;
