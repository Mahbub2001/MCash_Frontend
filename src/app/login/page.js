"use client";

import SecondaryButton from "@/components/SecondaryButon/SecondaryButton";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { AuthContext } from "@/hooks/AuthProvider";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
const Login = () => {
  const { login } = useContext(AuthContext);

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setPin(value);
      setError("");
    } else {
      setError("PIN must be exactly 5 digits and numeric");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const mobile = event.target.mobile.value;
    const pin = event.target.pin.value;
    login(mobile, pin)
      .then((result) => {
        toast.success("Login Success");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <>
      <div className="flex justify-center items-center pt-8 ">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-md">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Sign In</h1>
            <p className="text-sm text-gray-400">Welcome To Our service</p>
          </div>
          <form
            onSubmit={handleSubmit}
            noValidate=""
            action=""
            className="space-y-12 ng-untouched ng-pristine ng-valid"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm">
                  Phone Number
                </label>
                <input
                  required
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter Your Phone Number Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label htmlFor="pin" className="text-sm">
                    Give a Pin
                  </label>
                </div>
                <input
                  required
                  type="text"
                  name="pin"
                  id="pin"
                  placeholder="*****"
                  value={pin}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-200 focus:outline-orange-100 text-gray-900"
                />
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <SecondaryButton
                  type="submit"
                  classes="w-full px-8 py-3 font-semibold rounded-md "
                >
                  {loading ? <SmallSpinner /> : "Sign In"}
                </SecondaryButton>
              </div>
            </div>
          </form>
          <p className="px-6 text-sm text-center text-gray-400">
            Havent create an account yet?{" "}
            <Link href="/register" className="hover:underline text-gray-600">
              Sign Up
            </Link>
            .
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
