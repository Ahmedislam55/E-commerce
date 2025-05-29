import { useContext } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from "../../shared/Loading/Loading";
import { categoriesContext } from "../../Context/CategoriesContext";

function PopularCategory() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
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
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 860,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { categories } = useContext(categoriesContext);

  return (
    <div className="p-4">
      <h2 className="text-3xl my-8 font-bold font-mono">
        Shop Popular Categories
      </h2>
      <hr />
      <div className="mt-8">
        {categories ? (
          <Slider {...settings}>
            {categories.map((category) => (
              <div key={category._id} className="px-2">
                <div className="w-full h-64 bg-gray-200 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold mt-2">{category.name}</h2>
              </div>
            ))}
          </Slider>
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
}

export default PopularCategory;
