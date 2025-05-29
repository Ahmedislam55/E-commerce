import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import * as Yup from "yup";
function VerifyCode() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [isloadingSend, setIsLoadingSend] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [successVerify, setSuccessVerify] = useState(null);
  const initialValues = {
    resetCode: "",
  };
  const validationSchema = Yup.object({
    resetCode: Yup.string().required("Required"),
  });
  async function verifyResetCode(values) {
    try {
      setIsLoading(true);
      setErrorApi(null);
      setSuccessVerify(null);
      const payload = {
        resetCode: values.resetCode.toString(), // resetCode must be string
      };
      const { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
        payload
      );
      localStorage.setItem("code", payload);
      if (data.status === "Success") {
        setSuccessVerify("Code verified successfully");
        setTimeout(() => {
          setSuccessVerify(null);
          // navigate("/reset-password");
        }, 3000);
      }
      navigate("/resetPassword");
    } catch (error) {
      setErrorApi(error.response?.data?.message || "Something went wrong");
      setTimeout(() => {
        setErrorApi(null);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }
  async function handleResendCode() {
    try {
      setIsLoadingSend(true);
      setErrorApi(null);
      setSuccessVerify(null);
      const email = localStorage.getItem("resetEmail");
      if (!email) {
        setErrorApi("Email not found. Please go back and enter your email.");
        return;
      }
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        { email }
      );
      console.log(data ,"datatatatatata")
      if (data.statusMsg === "success") {
        setSuccessVerify("Code has been sent to your email.");
        toast.success("Code has been sent to your email", {
          theme: "dark",
        });
      }
    } catch (error) {
      setErrorApi(error.response?.data?.message || "Failed to resend code");
    } finally {
      setIsLoadingSend(false);
      setTimeout(() => {
        setErrorApi(null);
        setSuccessVerify(null);
      }, 3000);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: verifyResetCode,
  });
  useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
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
          Enter the 6-digit code
        </h1>
        <p>Check email for a verification code.</p>
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
        {successVerify ? (
          <div
            className="p-4 mb-4 text-sm rounded-lg bg-green-50 text-main"
            role="alert"
          >
            {successVerify}
          </div>
        ) : (
          ""
        )}
        {/* resetCode */}
        <div className="mt-4">
          <label htmlFor="resetCode" className="text-xl font-mono">
            resetCode:
          </label>
          <input
            type="text"
            name="resetCode"
            id="resetCode"
            onChange={formik.handleChange}
            value={formik.values.resetCode}
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
            onBlur={formik.handleBlur}
          />
          {formik.errors.resetCode && formik.touched.resetCode ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.resetCode}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* forgotPassword , register , button */}

        <div className="flex justify-between items-center">
          <div>
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
          <div>
            {isloadingSend ? (
              <ClipLoader
                color="green"
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <button
                type="button"
                onClick={handleResendCode}
                className="text-main underline text-base font-mono hover:text-green-800 transition duration-300"
              >
                Send code again
              </button>
            )}{" "}
          </div>
        </div>
      </form>
    </section>
  );
}
export default VerifyCode;
