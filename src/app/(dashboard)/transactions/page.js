"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/transactions`
        );
        setTransactions(response.data);
      } catch (err) {
        setError("Failed to fetch transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4 text-center">
        Transaction History
      </h2>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : transactions.length === 0 ? (
        <p className="text-center">No transactions found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">Sender</th>
                <th className="p-2 border">Receiver</th>
                <th className="p-2 border">Amount</th>
                <th className="p-2 border">Fee</th>
                <th className="p-2 border">Type</th>
                <th className="p-2 border">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx._id} className="border">
                  <td className="p-2 border">{tx.sender?.name || "N/A"}</td>
                  <td className="p-2 border">{tx.receiver?.name || "N/A"}</td>
                  <td className="p-2 border">${tx.amount}</td>
                  <td className="p-2 border">{tx.fee ? tx.fee : "None"}</td>
                  <td className="p-2 border">{tx.type}</td>
                  <td className="p-2 border">
                    {new Date(tx.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Transaction;
