"use client";

import React, { useContext } from "react";
import SecondaryButton from "@/components/SecondaryButon/SecondaryButton";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaAngleUp, FaAngleDown, FaCheck } from "react-icons/fa";
import Link from "next/link";
import axios from "axios";

const options = [{ role: "user" }, { role: "Agent" }];

const Register = () => {
  const [selected, setSelected] = useState(options[0]);
  const [loading, setLoading] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

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
    setLoading(true);
    const name = event.target.name.value;
    const email = event.target.email.value;
    const role = selected.role;
    const mobile = event.target.mobile.value;
    const nid = event.target.nid.value;
    const userData = {
      name,
      mobile,
      email,
      pin,
      nid,
      role,
    };
    // console.log(userData);
    // return;
    axios.defaults.withCredentials = true;
    axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, userData)
      .then((res) => {
        console.log(res.data.accessToken);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center pt-8 ">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Signup</h1>
          <p className="text-sm text-gray-400">Create a new account</p>
        </div>
        <form
          onSubmit={handleSubmit}
          noValidate=""
          action=""
          className="space-y-12 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-100 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="mobile" className="block mb-2 text-sm">
                Phone Number
              </label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                placeholder="Enter Your Phone Number Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-100 bg-gray-200 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                required
                type="email"
                name="email"
                id="email"
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-100 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <label htmlFor="nid" className="block mb-2 text-sm">
                Your NID
              </label>
              <input
                required
                type="text"
                name="nid"
                id="nid"
                placeholder="Enter Your NID Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-orange-100 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative mt-1">
                <Listbox.Button className="relative w-full rounded-lg  py-3.5 pl-3 pr-10 text-left shadow-md focus:outline-none bg-gray-200 cursor-pointer focus-visible:border-orange-100 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.role}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <FaAngleDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leavehref="opacity-0"
                >
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {options.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active
                              ? "bg-amber-100 text-amber-900"
                              : "text-gray-900"
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {person.role}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <FaCheck
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
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
                {loading ? <SmallSpinner /> : "Sign Up"}
              </SecondaryButton>
            </div>
          </div>
        </form>
        <p className="px-6 text-sm text-center text-gray-400">
          Already have an account yet?{" "}
          <Link href="/login" className="hover:underline text-gray-600">
            Sign In
          </Link>
          .
        </p>
      </div>
    </div>
  );
};

export default Register;
