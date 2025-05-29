import axios from "axios";
import { useFormik } from "formik";
import { useContext } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { tokenContext } from "../Context/TokenContextProvider";
function Login() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [successLogin, setSuccessLogin] = useState(null);
  let { setToken } = useContext(tokenContext);
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Invalid password")
      .required("Required"),
  });
  async function LoginReqister(values) {
    setErrorApi(null);
    setSuccessLogin(null);
    try {
      setIsLoading(true);
      let { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      const token = data.token;
      setToken(token); // set token in context
      localStorage.setItem("userToken", token); // save token in local storage
      setIsLoading(false);
      setSuccessLogin("Success Register");
      setTimeout(() => {
        setSuccessLogin(null);
      }, 2000);
      navigate("/home");
    } catch (error) {
      setErrorApi(error.response.data.message);
      setTimeout(() => {
        setErrorApi(null);
      }, 2000);
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: LoginReqister,
  });

  return (
    <section className="p-8">
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-[80%] mx-auto text-zinc-700"
      >
        <h1 className="mb-8 text-4xl font-bold font-mono text-zinc-900">
          Login now
        </h1>
        {errorApi ? (
          <div
            class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            {errorApi}
          </div>
        ) : (
          ""
        )}
        {successLogin ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {successLogin}
          </div>
        ) : (
          ""
        )}
        {/* Email */}
        <div className="mt-4">
          <label htmlFor="email" className="text-xl font-mono">
            email:
          </label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            autoComplete="email"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Password */}
        <div className="mt-4">
          <label htmlFor="password" className="text-xl font-mono">
            password:
          </label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            autoComplete="new-password"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* forgotPassword , register , button */}
        <div className="flex justify-between items-center">
          <div>
            <Link
              to="/forgotPasswords"
              className="font-mono my-4 text-blue-600 hover:text-blue-800 text-lg hover:border-b-2 border-blue-800 pb-1"
            >
              Forgot your password?
            </Link>
            {/* Submit */}
            <span className="block text-lg mt-2">
              Have an account?
              <Link
                className="ml-2 font-mono my-4 text-blue-600 hover:text-blue-800 text-lg hover:border-b-2 border-blue-800 pb-1"
                to="/register"
              >
                Sign Up
              </Link>{" "}
            </span>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-main border-0 px-4 py-2 rounded hover:bg-green-800 hover:border-main hover:border transation duration-700 mt-4 text-white flex items-center justify-center"
            >
              {isloading ? (
                <ClipLoader
                  color="#ffffff"
                  loading={isloading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "Login"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Login;
