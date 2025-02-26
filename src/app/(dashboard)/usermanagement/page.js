"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SmallSpinner from "@/components/Spinner/SmallSpinner";

function UserManagement() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/user-transactions/${userId}`);
      setTransactions(response.data);
      setSelectedUserId(userId);
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/admin/block-user`, { userId });
      toast.success(response.data.message);
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to block/unblock user");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/search-users?phone=${searchQuery}`);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to search users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by phone number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>
      {loading ? (
        <SmallSpinner />
      ) : users.length > 0 ? (
        <div className="space-y-4">
          {users.map((user) => (
            <div key={user._id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-600">{user.mobile}</p>
              <p className="text-sm text-gray-600">Role: {user.role}</p>
              <p className="text-sm text-gray-600">Balance: ৳{user.balance}</p>
              {user.role === "agent" && (
                <p className="text-sm text-gray-600">Agent Income: ৳{user.agent_income}</p>
              )}
              <p className="text-sm text-gray-600">
                Status: {user.isBlocked ? "Blocked" : "Active"}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleBlockUser(user._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
                <button
                  onClick={() => fetchUserTransactions(user._id)}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  View Transactions
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
            <h2 className="text-xl font-bold mb-4">Transactions</h2>
            {transactions.length > 0 ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {transactions.map((transaction) => (
                  <div key={transaction._id} className="border p-4 rounded-lg">
                    <p className="font-medium">Amount: ৳{transaction.amount}</p>
                    <p className="text-sm text-gray-600">Type: {transaction.type}</p>
                    <p className="text-sm text-gray-600">
                      Sender: {transaction.sender?.name} ({transaction.sender?.mobile})
                    </p>
                    <p className="text-sm text-gray-600">
                      Receiver: {transaction.receiver?.name} ({transaction.receiver?.mobile})
                    </p>
                    <p className="text-sm text-gray-600">
                      Date: {new Date(transaction.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No transactions found.</p>
            )}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserManagement;