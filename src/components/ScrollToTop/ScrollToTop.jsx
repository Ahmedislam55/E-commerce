import { useEffect } from "react";
import { useLocation } from "react-router-dom"; // This hook gives you access to the location object that represents the current URL

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
