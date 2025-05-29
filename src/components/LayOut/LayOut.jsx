import React from "react";
import NavBar from "../NavBar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import FooterButton from "../Footer/FooterButton";
import ScrollToTop from "../ScrollToTop/ScrollToTop";
function LayOut() {
  return (
    <>
      <NavBar />
      <ScrollToTop />
      <Outlet />
      <FooterButton />
      <Footer />
    </>
  );
}

export default LayOut;
