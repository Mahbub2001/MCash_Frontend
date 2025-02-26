"use client";

import SecondaryButton from "@/components/SecondaryButon/SecondaryButton";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { AuthContext } from "@/hooks/AuthProvider";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
function CashRequest() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, getUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/agent/request-recharge`
      );

      if (response.status === 200) {
        toast.success("Money Request send successfully");
        getUser();
        event.target.reset();
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data.message || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("Network error. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Request For Cash!</h1>
          <p className="text-sm text-gray-400">Get Cash From Admin</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid px-10"
        >
          <div className="space-y-2">
            <div>
              <SecondaryButton
                type="submit"
                classes="w-full px-8 py-3 font-semibold rounded-md "
              >
                {loading ? <SmallSpinner /> : "Sent A Request!"}
              </SecondaryButton>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CashRequest;
