import Slider from "react-slick";
import imageSlider1 from "../../../assets/images/slider-image-1.jpeg";
import imageSlider2 from "../../../assets/images/slider-image-2.jpeg";
import imageSlider3 from "../../../assets/images/slider-image-3.jpeg";
import image1 from "../../../assets/images/slider-2.jpeg";
import image2 from "../../../assets/images/grocery-banner-2.jpeg";
function StaticSlider() {
  const images = [{ image: imageSlider1 }, { image: imageSlider2 }, { image: imageSlider3 }];
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
      <div className="w-4 mt-4 h-3 rounded bg-slate-300 hover:bg-main transition duration-300"></div>
    ),
  };
  return (
    <>
      <section className="p-8">
        <div className="md:flex justify-center">
          <div className="md:w-2/3 md:mb-0 mb-12">
            <Slider {...settings}>
              {images.map((item, index) => (
                <div key={index} className="h-96">
                  <img
                    src={item.image}
                    alt={`slider-${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
          <div className="md:w-1/3">
          <img src={image1} className="h-48 object-cover w-full" alt="grocery-banner" />
          <img src={image2} className="h-48 object-cover w-full" alt="grocery-banner" />          
          </div>
        </div>
      </section>
    </>
  );
}

export default StaticSlider;
