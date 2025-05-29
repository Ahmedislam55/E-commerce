import notFound from "../../assets/images/404.png";
function NotFound() {
  return (
    <>
      <div className="py-6">
        <img src={notFound} alt="notFound" />
      </div>
    </>
  );
}

export default NotFound;
