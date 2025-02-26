"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
function AgentApproval() {
  const [pendingAgents, setPendingAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/admin/agent-req`)
      .then((response) => {
        setPendingAgents(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const approveAgent = async (agentId) => {
    axios.defaults.withCredentials = true;
    const confirm = window.confirm(
      "Are you sure you want to approve this agent?"
    );
    if (!confirm) return;

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/approve-agent`,
        { agentId }
      );
      toast.success(response.data.message);
      setPendingAgents(pendingAgents.filter((agent) => agent._id !== agentId));
    } catch (err) {
      toast.error("Failed to approve agent");
    }
  };

  if (loading)
    return <p className="text-center text-gray-600">Loading agents...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load agents</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center py-10">
        Pending Agent Approvals
      </h2>

      {pendingAgents.length === 0 ? (
        <p className="text-center text-gray-500">No pending agents</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Name</th>
                <th className="border p-2">Mobile</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">NID</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingAgents.map((agent) => (
                <tr key={agent._id} className="text-center">
                  <td className="border p-2">{agent.name}</td>
                  <td className="border p-2">{agent.mobile}</td>
                  <td className="border p-2">{agent.email}</td>
                  <td className="border p-2">{agent.nid}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => approveAgent(agent._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                      Approve
                    </button>
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

export default AgentApproval;
