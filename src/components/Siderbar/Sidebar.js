"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight, FaBars } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";

function Sidebar({ user, logout }) {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible1, setIsVisible1] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [totalBalance, setTotalBalance] = useState(null);
  useEffect(() => {
    const fetchTotalBalance = async () => {
      axios.defaults.withCredentials = true;
      try {
        if (user?.role === "admin") {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/admin/total-system-balance`
          );
          setTotalBalance(data.totalBalance);
        }
      } catch (error) {
        console.error("Failed to fetch total balance:", error);
      }
    };

    fetchTotalBalance();
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout-content-container flex flex-col w-80">
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-[#f8fafb] rounded-md lg:hidden"
      >
        <FaBars className="text-2xl" />
      </button>

      <div
        className={`fixed lg:relative h-full min-h-screen justify-between bg-[#f8fafb] p-4 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } w-80 z-40`}
      >
        <div className="flex flex-col gap-4">
          <Link
            href="/dash"
            className="text-[#0e161b] text-base text-center font-medium leading-normal tracking-widest"
          >
            M CASH
          </Link>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3 px-3 py-2 rounded-xl bg-[#e8eef3]">
              <div
                className="text-[#0e161b]"
                data-icon="House"
                data-size="24px"
                data-weight="fill"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M224,115.55V208a16,16,0,0,1-16,16H168a16,16,0,0,1-16-16V168a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v40a16,16,0,0,1-16,16H48a16,16,0,0,1-16-16V115.55a16,16,0,0,1,5.17-11.78l80-75.48.11-.11a16,16,0,0,1,21.53,0,1.14,1.14,0,0,0,.11.11l80,75.48A16,16,0,0,1,224,115.55Z"></path>
                </svg>
              </div>
              <Link
                href="/dash"
                className="text-[#0e161b] text-sm font-medium leading-normal"
              >
                Home
              </Link>
            </div>
            {user?.role === "user" && (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm">
                    <p
                      onClick={() => setIsVisible(!isVisible)}
                      className="cursor-pointer text-sm font-semibold text-gray-700"
                    >
                      Balance
                    </p>
                    <div
                      className={`text-sm font-bold transition-all ${
                        isVisible ? "text-black" : "blur-sm text-gray-500"
                      }`}
                    >
                      {user?.balance || "৳0.00"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                    </svg>
                  </div>
                  <Link
                    href="/sendmoney"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    Send Money
                  </Link>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M205.66,149.66l-72,72a8,8,0,0,1-11.32,0l-72-72a8,8,0,0,1,11.32-11.32L120,196.69V40a8,8,0,0,1,16,0V196.69l58.34-58.35a8,8,0,0,1,11.32,11.32Z"></path>
                    </svg>
                  </div>
                  <Link
                    href="/cashout"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    Cash out
                  </Link>
                </div>
                {/* <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <FaArrowRight className="mr-2" />
                  </div>
                  <Link
                    href="/cashin"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    Cash In
                  </Link>
                </div> */}
              </>
            )}
            {user?.role === "agent" && (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm">
                    <p
                      onClick={() => setIsVisible(!isVisible)}
                      className="cursor-pointer text-sm font-semibold text-gray-700"
                    >
                      Balance
                    </p>
                    <div
                      className={`text-sm font-bold transition-all ${
                        isVisible ? "text-black" : "blur-sm text-gray-500"
                      }`}
                    >
                      {user?.isApproved ? user?.balance || "0.00" : "0.00"}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm">
                    <p
                      onClick={() => setIsVisible1(!isVisible1)}
                      className="cursor-pointer text-sm font-semibold text-gray-700"
                    >
                      Income
                    </p>
                    <div
                      className={`text-sm font-bold transition-all ${
                        isVisible1 ? "text-black" : "blur-sm text-gray-500"
                      }`}
                    >
                      {user?.isApproved ? user?.agent_income || "0.00" : "0.00"}
                    </div>
                  </div>
                </div>

                {user?.isApproved ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                      <div
                        className="text-[#0e161b]"
                        data-icon="House"
                        data-size="24px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                        </svg>
                      </div>
                      <Link
                        href="/agentaddmoney"
                        className="text-[#0e161b] text-sm font-medium leading-normal"
                      >
                        Add Money
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                      <div
                        className="text-[#0e161b]"
                        data-icon="House"
                        data-size="24px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                        </svg>
                      </div>
                      <Link
                        href="/agentcashrequest"
                        className="text-[#0e161b] text-sm font-medium leading-normal"
                      >
                        Cash Request
                      </Link>
                    </div>
                    <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                      <div
                        className="text-[#0e161b]"
                        data-icon="House"
                        data-size="24px"
                        data-weight="fill"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                        </svg>
                      </div>
                      <Link
                        href="/agentwithdrawrequest"
                        className="text-[#0e161b] text-sm font-medium leading-normal"
                      >
                        Give A WithDraw Request
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-red-500 px-3 py-2">
                    Your account is not approved yet. Please wait for admin
                    approval.
                  </div>
                )}
              </>
            )}
            {user?.role === "admin" && (
              <>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm">
                    <p
                      onClick={() => setIsVisible(!isVisible)}
                      className="cursor-pointer text-sm font-semibold text-gray-700"
                    >
                      Current Income
                    </p>
                    <div
                      className={`text-sm font-bold transition-all ${
                        isVisible ? "text-black" : "blur-sm text-gray-500"
                      }`}
                    >
                      {user?.balance || "৳0.00"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-xl shadow-sm">
                    <p
                      onClick={() => setIsVisible(!isVisible)}
                      className="cursor-pointer text-sm font-semibold text-gray-700"
                    >
                      System Amount
                    </p>
                    <div
                      className={`text-sm font-bold transition-all ${
                        isVisible ? "text-black" : "blur-sm text-gray-500"
                      }`}
                    >
                      {totalBalance || "৳0.00"}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                    </svg>
                  </div>
                  <Link
                    href="/usermanagement"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    User Management
                  </Link>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                    </svg>
                  </div>
                  <Link
                    href="/adminapproveaddmoney"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    Add Money Agent
                  </Link>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                    </svg>
                  </div>
                  <Link
                    href="/agentapproval"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    Agent Approval
                  </Link>
                </div>
                <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
                  <div
                    className="text-[#0e161b]"
                    data-icon="House"
                    data-size="24px"
                    data-weight="fill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24px"
                      height="24px"
                      fill="currentColor"
                      viewBox="0 0 256 256"
                    >
                      <path d="M205.66,117.66a8,8,0,0,1-11.32,0L136,59.31V216a8,8,0,0,1-16,0V59.31L61.66,117.66a8,8,0,0,1-11.32-11.32l72-72a8,8,0,0,1,11.32,0l72,72A8,8,0,0,1,205.66,117.66Z"></path>
                    </svg>
                  </div>
                  <Link
                    href="/agentwithdrawmanagement"
                    className="text-[#0e161b] text-sm font-medium leading-normal"
                  >
                    WithDraw Approval
                  </Link>
                </div>
              </>
            )}

            <div className="flex items-center gap-3 px-3 py-2 rounded-xl">
              <div
                className="text-[#0e161b]"
                data-icon="House"
                data-size="24px"
                data-weight="fill"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  fill="currentColor"
                  viewBox="0 0 256 256"
                >
                  <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
                </svg>
              </div>
              <Link
                href={
                  user?.role === "admin" ? "/admintransaction" : "/transactions"
                }
                className="text-[#0e161b] text-sm font-medium leading-normal"
              >
                Transactions
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3 px-3 py-2">
            <div
              className="text-[#0e161b]"
              data-icon="Gear"
              data-size="24px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160Zm88-29.84q.06-2.16,0-4.32l14.92-18.64a8,8,0,0,0,1.48-7.06,107.21,107.21,0,0,0-10.88-26.25,8,8,0,0,0-6-3.93l-23.72-2.64q-1.48-1.56-3-3L186,40.54a8,8,0,0,0-3.94-6,107.71,107.71,0,0,0-26.25-10.87,8,8,0,0,0-7.06,1.49L130.16,40Q128,40,125.84,40L107.2,25.11a8,8,0,0,0-7.06-1.48A107.6,107.6,0,0,0,73.89,34.51a8,8,0,0,0-3.93,6L67.32,64.27q-1.56,1.49-3,3L40.54,70a8,8,0,0,0-6,3.94,107.71,107.71,0,0,0-10.87,26.25,8,8,0,0,0,1.49,7.06L40,125.84Q40,128,40,130.16L25.11,148.8a8,8,0,0,0-1.48,7.06,107.21,107.21,0,0,0,10.88,26.25,8,8,0,0,0,6,3.93l23.72,2.64q1.49,1.56,3,3L70,215.46a8,8,0,0,0,3.94,6,107.71,107.71,0,0,0,26.25,10.87,8,8,0,0,0,7.06-1.49L125.84,216q2.16.06,4.32,0l18.64,14.92a8,8,0,0,0,7.06,1.48,107.21,107.21,0,0,0,26.25-10.88,8,8,0,0,0,3.93-6l2.64-23.72q1.56-1.48,3-3L215.46,186a8,8,0,0,0,6-3.94,107.71,107.71,0,0,0,10.87-26.25,8,8,0,0,0-1.49-7.06Zm-16.1-6.5a73.93,73.93,0,0,1,0,8.68,8,8,0,0,0,1.74,5.48l14.19,17.73a91.57,91.57,0,0,1-6.23,15L187,173.11a8,8,0,0,0-5.1,2.64,74.11,74.11,0,0,1-6.14,6.14,8,8,0,0,0-2.64,5.1l-2.51,22.58a91.32,91.32,0,0,1-15,6.23l-17.74-14.19a8,8,0,0,0-5-1.75h-.48a73.93,73.93,0,0,1-8.68,0,8,8,0,0,0-5.48,1.74L100.45,215.8a91.57,91.57,0,0,1-15-6.23L82.89,187a8,8,0,0,0-2.64-5.1,74.11,74.11,0,0,1-6.14-6.14,8,8,0,0,0-5.1-2.64L46.43,170.6a91.32,91.32,0,0,1-6.23-15l14.19-17.74a8,8,0,0,0,1.74-5.48,73.93,73.93,0,0,1,0-8.68,8,8,0,0,0-1.74-5.48L40.2,100.45a91.57,91.57,0,0,1,6.23-15L69,82.89a8,8,0,0,0,5.1-2.64,74.11,74.11,0,0,1,6.14-6.14A8,8,0,0,0,82.89,69L85.4,46.43a91.32,91.32,0,0,1,15-6.23l17.74,14.19a8,8,0,0,0,5.48,1.74,73.93,73.93,0,0,1,8.68,0,8,8,0,0,0,5.48-1.74L155.55,40.2a91.57,91.57,0,0,1,15,6.23L173.11,69a8,8,0,0,0,2.64,5.1,74.11,74.11,0,0,1,6.14,6.14,8,8,0,0,0,5.1,2.64l22.58,2.51a91.32,91.32,0,0,1,6.23,15l-14.19,17.74A8,8,0,0,0,199.87,123.66Z"></path>
              </svg>
            </div>
            <button
              onClick={handleLogout}
              className="text-[#0e161b] text-sm font-medium leading-normal"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
