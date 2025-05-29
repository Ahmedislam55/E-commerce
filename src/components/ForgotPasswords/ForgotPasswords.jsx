import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useFormik } from "formik";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
function ForgotPasswords() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [successSend, setSuccessSend] = useState(null);
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
  });
  async function updatePassword(values) {
    try {
      setIsLoading(true);
      setErrorApi(null);
      setSuccessSend(null);
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
        values
      );
      localStorage.setItem("resetEmail", values.email);
      console.log(data);
      if (data.statusMsg === "success") {
        console.log(data.message);
        setSuccessSend(data.message);
        setTimeout(() => {
          setSuccessSend(null);
        }, 3000);
      }
      setIsLoading(false);
      navigate("/verifyCode");
    } catch (error) {
      setErrorApi(error.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setErrorApi(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: updatePassword,
  });

  return (
    <section className="p-8">
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-[80%] mx-auto text-zinc-700"
      >
        <h1 className="mb-8 text-4xl font-bold font-mono text-zinc-900">
          Forgot password
        </h1>
        <p>We’ll send a verification code to this email .</p>
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
        {successSend ? (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-green-50 text-main"
            role="alert"
          >
            {successSend}
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
              "Next"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgotPasswords;
