import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
function ResetPassword() {
  const navigate = useNavigate();

  const [isloading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [successLogin, setSuccessLogin] = useState(null);
  const initialValues = {
    email: "",
    newPassword: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Invalid password")
      .required("Required"),
  });
  async function LoginReqister(values) {
    setErrorApi(null);
    setSuccessLogin(null);
    try {
      setIsLoading(true);
      const { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        values
      );
      console.log(data, "dartatatta");
      setIsLoading(false);
      setSuccessLogin("Success Register");
      navigate("/login");
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

  useEffect(() => {
    const code = localStorage.getItem("code");
    if (!code) {
      navigate("/login");
    }
  }, []);

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
          <label htmlFor="newPassword" className="text-xl font-mono">
            newPassword:
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            onChange={formik.handleChange}
            value={formik.values.newPassword}
            autoComplete="new-password"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
            onBlur={formik.handleBlur}
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.newPassword}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* forgotPassword , register , button */}
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
      </form>
    </section>
  );
}

export default ResetPassword;
