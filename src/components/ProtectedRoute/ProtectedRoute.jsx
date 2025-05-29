import { Navigate } from "react-router-dom";

export default function ProtectedRoute(props) {
  if (localStorage.getItem("userToken")) {
    return props.children; // component
  } else {
    return <Navigate to={"/login"} /> // redirect to login page;
  }
}
