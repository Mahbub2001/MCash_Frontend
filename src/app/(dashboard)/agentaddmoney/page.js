"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import SmallSpinner from "@/components/Spinner/SmallSpinner";

function AgentAddMoney() {
  const [loading, setLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchPendingRequests = async () => {
    axios.defaults.withCredentials = true;
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/pending-money-request`
      );
      setPendingRequests(response.data);
    } catch (error) {
      toast.error("Failed to fetch pending requests");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const handleApprove = async () => {
    if (!selectedRequest) return;

    try {
      setLoading(true);
      axios.defaults.withCredentials = true;
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/approve-money-request`,
        {
          agentId: selectedRequest.agentId,
          requestId: selectedRequest.requestId,
        }
      );

      toast.success(response.data.message);
      fetchPendingRequests()
      setPendingRequests((prev) =>
        prev.map((agent) => {
          if (agent._id === selectedRequest.agentId) {
            return {
              ...agent,
              rechargeRequests: agent.rechargeRequests.map((req) =>
                req._id === selectedRequest.requestId
                  ? { ...req, status: "confirmed" }
                  : req
              ),
            };
          }
          return agent;
        })
      );

      setIsModalOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to approve request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Money Requests</h1>
      {loading ? (
        <SmallSpinner />
      ) : pendingRequests.length > 0 ? (
        <div className="space-y-4">
          {pendingRequests.map((agent) => (
            <div key={agent._id} className="border p-4 rounded-lg">
              <h2 className="text-lg font-semibold">{agent.name}</h2>
              <p className="text-sm text-gray-600">{agent.mobile}</p>
              <div className="mt-2">
                <h3 className="font-medium">Pending Requests:</h3>
                {agent.rechargeRequests
                  .filter((req) => req.status === "pending")
                  .map((req) => (
                    <div key={req._id} className="ml-4 mt-2">
                      <p>Amount: ৳{req.amount}</p>
                      <p className="text-sm text-gray-600">
                        Requested on: {new Date(req.timestamp).toLocaleString()}
                      </p>
                      <button
                        onClick={() => {
                          setSelectedRequest({
                            agentId: agent._id,
                            requestId: req._id,
                          });
                          setIsModalOpen(true);
                        }}
                        className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No pending money requests found.</p>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Confirm Approval</h2>
            <p>Are you sure you want to approve this request?</p>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                No
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AgentAddMoney;
