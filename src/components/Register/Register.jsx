import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
function Register() {
  const navigate = useNavigate();
  const [isloading, setIsLoading] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [successRegister, setSuccessRegister] = useState(null);
  const initialValues = {
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(5, "Name must be at least 5 characters")
      .max(15, "Name must be at most 15 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{6,15}$/, "Invalid password")
      .required("Required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Required"),
  });
  async function registerReqister(values) {
    setErrorApi(null);
    setSuccessRegister(null);
    try {
      setIsLoading(true);
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      setIsLoading(false);
      setSuccessRegister("Success Register");
      setTimeout(() => {
        setSuccessRegister(null);
      }, 2000);
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
    // validate: (values) => {
    //   const errors = {};
    //   if (!values.name) {
    //     errors.name = "Required";
    //   } else if (values.name.length < 5) {
    //     errors.name = "Name Lenght Must more 5";
    //   } else if (values.name.length > 15) {
    //     errors.name = " Name Lenght Must less 15 ";
    //   }
    //   if (!values.email) {
    //     errors.email = "Required";
    //   } else if (
    //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    //   ) {
    //     errors.email = "Invalid email address";
    //   }
    //   if (!values.password) {
    //     errors.password = "Required";
    //   } else if (!/^[A-Z][a-z0-9]{3,8}$/.test(values.password)) {
    //     errors.password = "Invalid password";
    //   }
    //   if (!values.rePassword) {
    //     errors.rePassword = "Required";
    //   } else if (values.password !== values.rePassword) {
    //     errors.rePassword = "rePassword shoud match password";
    //   }
    //   if (!values.phone) {
    //     errors.phone = "Required";
    //   } else if (!/^01[0125][0-9]{8}$/.test(values.phone)) {
    //     errors.phone = "invaild phone";
    //   }
    //   return errors;
    // },
    onSubmit: registerReqister,
  });

  return (
    <section className="p-8">
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-[80%] mx-auto text-zinc-700"
      >
        <h1 className="mb-8 text-4xl font-bold font-mono text-zinc-900">
          Register Now 
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
        {successRegister ? (
          <div
            className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
            role="alert"
          >
            {successRegister}
          </div>
        ) : (
          ""
        )}
        {/* Name */}
        <div>
          <label htmlFor="name" className="text-xl font-mono">
            name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            onBlur={formik.handleBlur}
            autoComplete="name"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
          />
          {formik.errors.name && formik.touched.name ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.name}
            </div>
          ) : (
            ""
          )}
        </div>
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

        {/* Phone */}
        <div className="mt-4">
          <label htmlFor="phone" className="text-xl font-mono">
            phone:
          </label>
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            autoComplete="tel"
            className="block w-full rounded mt-2 focus:border-main border-zinc-200"
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone ? (
            <div
              class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.phone}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Submit */}

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
              "Register"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Register;
