import { useContext, useState } from "react";
import { tokenContext } from "../Context/TokenContextProvider";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
function ChangePassword() {
  const [isloading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [successLogin, setSuccessLogin] = useState(null);
  let { token } = useContext(tokenContext);
  const initialValues = {
    currentPassword: "",
    password: "",
    rePassword: "",
  };
  const validationSchema = Yup.object({
    currentPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Invalid password")
      .required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Invalid password")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
  });
  async function changePassword(values) {
    setErrorApi(null);
    setSuccessLogin(null);
    console.log(values, "ValuesValues");
    console.log(token, "Tokentojken");
    try {
      setIsLoading(true);
      let { data } = await axios.put(
        "https://ecommerce.routemisr.com/api/v1/users/changeMyPassword",
        values,
        {
          headers: {
            token: token,
          },
        }
      );
      if (data.message === "success") {
        toast.success("Updated Password successfully", {
          theme: "dark",
        });
      }
      console.log(data);
      setIsLoading(false);
      setSuccessLogin("Success Update");
      formik.resetForm();
      setTimeout(() => {
        setSuccessLogin(null);
      }, 2000);
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
    onSubmit: changePassword,
  });

  return (
    <section className="p-8">
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-[80%] mx-auto text-zinc-700"
      >
        <h1 className="mb-8 text-4xl font-bold font-mono text-zinc-900">
          Change Password
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

        {/* currentPassword */}
        <div className="mt-4">
          <label htmlFor="password" className="text-xl font-mono">
            currentPassword:
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            onChange={formik.handleChange}
            value={formik.values.currentPassword}
            autoComplete="currentPassword"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
            onBlur={formik.handleBlur}
          />
          {formik.errors.currentPassword && formik.touched.currentPassword ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.currentPassword}
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

        {/* Re-password */}
        <div className="mt-4">
          <label htmlFor="rePassword" className="text-xl font-mono">
            rePassword:
          </label>
          <input
            type="password"
            name="rePassword"
            id="rePassword"
            onChange={formik.handleChange}
            value={formik.values.rePassword}
            autoComplete="new-password"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.rePassword}
            </div>
          ) : (
            ""
          )}
        </div>
        {/* forgotPassword , register , button */}
        <div className="flex justify-between items-center">
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
                "Update"
              )}
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
export default ChangePassword;
