import { Link } from "react-router-dom";
import amazon from "../../assets/amazonpay.svg";
import american from "../../assets/american-express.svg";
import mastercard from "../../assets/mastercard.svg";
import payPal from "../../assets/paypal.svg";
import visa from "../../assets/visa.svg";
import AppStore from "../../assets/appstore-btn.svg";
import GooglePlay from "../../assets/googleplay-btn.svg";
function Footer() {
  return (
    <>
      <footer className="bg-[#F0F3F2] p-12">
        <div className="md:flex flex-wrap justify-evenly ">
          <div className="lg:w-[15%] md:w-[50%]">
            <ul className="leading-8 font-medium text-sm text-gray">
              <li className="text-dark font-semibold cursor-pointer">
                Categories
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Vegetables & Fruits
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Breakfast & instant food
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Bakery & Biscuits
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Atta, rice & dal
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Sauces & spreads
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Organic & gourmet
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Baby care
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Cleaning essentials
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Personal care
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[15%] md:w-[50%]">
            <ul className="leading-8 font-medium text-sm text-gray">
              <li className="opacity-0">Categories</li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Dairy, bread & eggs
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Cold drinks & juices
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Tea, coffee & drinks
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Masala, oil & more
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Chicken, meat & fish
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Paan corner
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Pharma & wellness
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Home & office
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Pet care
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[15%] md:w-[50%]">
            <ul className="leading-8 font-medium text-sm text-gray">
              <li className="text-dark font-semibold cursor-pointer">
                Get to know us
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Company
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  About
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Blog
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Help Center
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Our Value
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[15%] md:w-[50%]">
            <ul className="leading-8 font-medium text-sm text-gray">
              <li className="text-dark font-semibold cursor-pointer">
                For Consumers
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Payments
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Shipping
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Product Returns
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  FAQ
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Shop Checkout
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[15%] md:w-[50%]">
            <ul className="leading-8 font-medium text-sm text-gray">
              <li className="text-dark font-semibold cursor-pointer">
                Become a Shopper
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Shopper Opportunities
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Become a Shopper
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Earnings
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Ideas & Guides
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  New Retailers
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:w-[15%] md:w-[50%]">
            <ul className="leading-8 font-medium text-sm text-gray">
              <li className="text-dark font-semibold cursor-pointer">
                Freshcart programs
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Freshcart programs
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Gift Cards
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Promos & Coupons
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Freshcart Ads
                </Link>
              </li>
              <li className="cursor-pointer">
                <Link
                  to="#"
                  className="hover:text-main transition duration-500"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-y-[1px] border-zinc-300 md:p-4 lg:flex justify-between">
          <div className="flex gap-4 items-center">
            <h2 className="text-dark text-sm font-semibold">
              Payment Partners
            </h2>
            <img src={amazon} alt="amazon" />
            <img src={american} alt="amazon" />
            <img src={mastercard} alt="amazon" />
            <img src={payPal} alt="payPal" />
            <img src={visa} alt="visa" />
          </div>
          <div className="md:flex gap-4 items-center">
            <h2 className="text-dark text-sm font-semibold my-4 md:my-0">
              Get deliveries with FreshCart
            </h2>
            <img src={AppStore} alt="AppStore" className="my-4 md:my-0 cursor-pointer" />
            <img src={GooglePlay} alt="GooglePlay" className="mb-4 md:mb-0 cursor-pointer" />
          </div>
        </div>
        <div className="p-4 md:flex justify-between">
          <div>
            <h6 className="text-gray text-sm">
              © 2022 - 2025 FreshCart eCommerce HTML Template. All rights
              reserved. Powered by
              <span className="text-main"> Codescandy </span> .
            </h6>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <h6 className="text-gray text-xs"> Follow us on </h6>
            <i className="fa-brands fa-facebook text-gray border p-1 rounded cursor-pointer hover:text-main transition duration-500"></i>
            <i className="fa-brands fa-twitter text-gray border p-1 rounded cursor-pointer hover:text-main transition duration-500"></i>
            <i className="fa-brands fa-instagram text-gray border p-1 rounded cursor-pointer hover:text-main transition duration-500"></i>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
