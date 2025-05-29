import { useEffect, useState } from "react";

function FooterButton() {
  const [scroll, setScroll] = useState(false);
  useEffect(() => {
    function handleScroll() {
      setScroll(window.scrollY > 200);
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <>
      <div className="fixed bottom-4 right-4">
        {scroll && (
          <button onClick={scrollToTop} className="cursor-pointer bg-main px-3 py-2 rounded-md text-white tracking-wider shadow-xl hover:animate-none animate-up">
            <svg
              className="w-5 h-5 rotate-180"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
      </div>
    </>
  );
}
export default FooterButton;
