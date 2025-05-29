import styles from "./Loading.module.css";
function Loading() {
  return (
    <div className="h-screen w-full main">
      <div className={`${styles.loader} bg-main -mt-40`}></div>
    </div>
  );
}

export default Loading;
