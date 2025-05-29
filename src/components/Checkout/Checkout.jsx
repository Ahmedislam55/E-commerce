import { useFormik } from "formik";
import { useContext, useState } from "react";
import { ClipLoader } from "react-spinners";
import * as Yup from "yup";
import { CartContext } from "../Context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [isloading, setIsLoading] = useState(false);
  const [isdisabled, setIsdisabled] = useState(false);
  const [errorApi, setErrorApi] = useState(null);
  const [isOnline, setisOnline] = useState(false);
  const navigate = useNavigate();
  const { callOfLinePayment , callOnLinepayment} = useContext(CartContext);

  const initialValues = {
    details: "",
    phone: "",
    city: "",
  };

  const validationSchema = Yup.object({
    details: Yup.string().required("Required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "Invalid phone number")
      .required("Required"),
    city: Yup.string().required("Required"),
  });

  async function handleOnlinePayment(values) {
    try {
      setIsLoading(true);
      const data = await callOnLinepayment(values);
      window.location.href = data.session.url;
      if (data.status === "success") {
        toast.success("Paid Online Successfully", { theme: "dark" });
        setIsdisabled(true);
      }
    } catch (error) {
      setErrorApi(error?.response?.data?.message || "Online payment failed");
      setIsdisabled(true);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleOfflinePayment(values) {
    try {
      setIsLoading(true);
      const data = await callOfLinePayment(values);
      if (data.status === "success") {
        toast.success("Paid Offline Successfully", { theme: "dark" });
        setIsdisabled(true);
      }
      navigate("/allorders");
    } catch (error) {
      setErrorApi(error?.response?.data?.message || "Offline payment failed");
      setIsdisabled(true);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      if (isOnline) {
        handleOnlinePayment(values);
      } else {
        handleOfflinePayment(values);
      }
    },
  });

  return (
    <section className="p-8">
      <form
        onSubmit={formik.handleSubmit}
        className="md:w-[80%] mx-auto text-zinc-700"
      >
        <h1 className="mb-8 text-4xl font-bold font-mono text-zinc-900">
          Shipping Info
        </h1>
        {errorApi && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
            {errorApi}
          </div>
        )}
        {/* details input */}
        <div className="mt-4">
          <label htmlFor="details" className="text-xl font-mono">Details:</label>
          <input
            type="text"
            name="details"
            id="details"
            onChange={formik.handleChange}
            value={formik.values.details}
            autoComplete="details"
            onBlur={formik.handleBlur}
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
          />
          {formik.errors.details && formik.touched.details && (
            <div className="text-sm text-red-600">{formik.errors.details}</div>
          )}
        </div>

        {/* phone input */}
        <div className="mt-4">
          <label htmlFor="phone" className="text-xl font-mono">Phone:</label>
          <input
            type="tel"
            name="phone"
            id="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            autoComplete="phone"
            onBlur={formik.handleBlur}
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
          />
          {formik.errors.phone && formik.touched.phone && (
            <div className="text-sm text-red-600">{formik.errors.phone}</div>
          )}
        </div>

        {/* city input */}
        <div className="mt-4">
          <label htmlFor="city" className="text-xl font-mono">City:</label>
          <input
            type="text"
            name="city"
            id="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            autoComplete="city"
            onBlur={formik.handleBlur}
            className="block w-full rounded mt-2 focus:border-main border-zinc-200 mb-2"
          />
          {formik.errors.city && formik.touched.city && (
            <div className="text-sm text-red-600">{formik.errors.city}</div>
          )}
        </div>

        {/* payment type selection */}
        <div className="flex gap-4 my-6">
          <button
            type="button"
            onClick={() => setisOnline(false)}
            className={`px-4 py-2 rounded font-mono ${
              !isOnline ? "bg-main text-white" : "bg-gray-200"
            }`}
          >
            Pay Offline
          </button>
          <button
            type="button"
            onClick={() => setisOnline(true)}
            className={`px-4 py-2 rounded font-mono ${
              isOnline ? "bg-main text-white" : "bg-gray-200"
            }`}
          >
            Pay Online
          </button>
        </div>

        {/* submit button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-main font-mono border-0 px-4 py-2 rounded hover:bg-green-800 hover:border-main hover:border transition duration-700 mt-4 text-white flex items-center justify-center"
            disabled={isdisabled}
          >
            {isloading ? (
              <ClipLoader color="#ffffff" size={20} />
            ) : isOnline ? "Pay Online" : "Pay Offline"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default Checkout;
