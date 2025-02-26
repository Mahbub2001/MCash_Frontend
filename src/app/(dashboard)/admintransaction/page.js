"use client";
import SmallSpinner from "@/components/Spinner/SmallSpinner";
import { AuthContext } from "@/hooks/AuthProvider";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

function AdminUserTransactions() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/users`);
      setUsers(response.data);

      if (response.data.length > 0) {
        setSelectedUserId(response.data[0]._id);
        fetchUserTransactions(response.data[0]._id);
      }
    } catch (err) {
      toast.error("Failed to fetch users");
    }
  };

  const fetchUserTransactions = async (userId) => {
    try {
      setLoading(true);
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/admin/user-transactions/${userId}`);
      setTransactions(response.data);
      setSelectedUserId(userId);
    } catch (err) {
      toast.error("Failed to fetch transactions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Transactions</h1>
      <div className="flex gap-4">
        <div className="w-1/3">
          <h2 className="text-lg font-semibold mb-2">Users/Agents</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user._id}
                onClick={() => fetchUserTransactions(user._id)}
                className={`p-2 cursor-pointer rounded-lg ${
                  selectedUserId === user._id ? "bg-gray-200" : "hover:bg-gray-100"
                }`}
              >
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-600">{user.mobile}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="w-2/3">
          <h2 className="text-lg font-semibold mb-2">Transactions</h2>
          {loading ? (
            <SmallSpinner />
          ) : transactions.length > 0 ? (
            <div className="space-y-2">
              {transactions.map((transaction) => (
                <div key={transaction._id} className="border p-4 rounded-lg">
                  <p className="font-medium">Amount: ৳{transaction.amount}</p>
                  <p className="text-sm text-gray-600">
                    Type: {transaction.type}
                  </p>
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
        </div>
      </div>
    </div>
  );
}

export default AdminUserTransactions;