"use client";

import SecondaryButton from "@/components/SecondaryButon/SecondaryButton";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { AuthContext } from "@/hooks/AuthProvider";
import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

const AgentAddMoney = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, getUser } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const userPhone = event.target.mobile.value;
    const amount = parseInt(event.target.amount.value);
    const agentPin = event.target.pin.value;

    if (user.balance < amount) {
      toast.error("Insufficient balance in your account");
      setLoading(false);
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/agent/cash-in`,
        {
          userPhone,
          amount,
          agentPin,
        }
      );

      if (response.status === 200) {
        toast.success("Cash-in successful");
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
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-md">
          <div className="mb-8 text-center">
            <h1 className="my-3 text-4xl font-bold">Cash In User</h1>
            <p className="text-sm text-gray-400">Send Your Money Safely</p>
          </div>
          <form
            onSubmit={handleSubmit}
            noValidate=""
            action=""
            className="space-y-12 ng-untouched ng-pristine ng-valid px-10"
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="mobile" className="block mb-2 text-sm">
                  Receiver Phone Number
                </label>
                <input
                  required
                  type="number"
                  name="mobile"
                  id="mobile"
                  placeholder="Enter Receiver Phone Number Here"
                  className="w-full px-10 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="amount" className="block mb-2 text-sm">
                  Enter Amount
                </label>
                <input
                  required
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Enter Amount Here"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                />
              </div>
              <div>
                <label htmlFor="pin" className="block mb-2 text-sm">
                  Enter Pin
                </label>
                <input
                  required
                  type="number"
                  name="pin"
                  id="pin"
                  placeholder="Enter your pin"
                  className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-green-500 bg-gray-200 text-gray-900"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div>
                <SecondaryButton
                  type="submit"
                  classes="w-full px-8 py-3 font-semibold rounded-md "
                >
                  {loading ? <SmallSpinner /> : "Cash In"}
                </SecondaryButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AgentAddMoney;