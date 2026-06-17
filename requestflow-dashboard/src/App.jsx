import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [requests, setRequests] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requestType, setRequestType] = useState("GITHUB_ACCESS");
  const [requestedBy, setRequestedBy] = useState("employee01");

  const fetchRequests = () => {
    fetch("http://localhost:3000/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error(err));
  };

  const fetchAuditLogs = () => {
    fetch("http://localhost:3000/requests/audit/logs")
      .then((res) => res.json())
      .then((data) => setAuditLogs(data))
      .catch((err) => console.error(err));
  };

  const createRequest = async (e) => {
    e.preventDefault();

    await fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        description,
        requestType,
        requestedBy,
      }),
    });

    setTitle("");
    setDescription("");
    setRequestType("GITHUB_ACCESS");
    setRequestedBy("employee01");

    fetchRequests();
    fetchAuditLogs();
  };

  const approveRequest = async (id) => {
    await fetch(`http://localhost:3000/requests/${id}/approve`, {
      method: "PATCH",
      headers: {
        role: "MANAGER",
      },
    });

    fetchRequests();
    fetchAuditLogs();
  };

  const rejectRequest = async (id) => {
    await fetch(`http://localhost:3000/requests/${id}/reject`, {
      method: "PATCH",
      headers: {
        role: "MANAGER",
      },
    });

    fetchRequests();
    fetchAuditLogs();
  };

  const startProcessingRequest = async (id) => {
    await fetch(`http://localhost:3000/requests/${id}/start-processing`, {
      method: "PATCH",
    });

    fetchRequests();
    fetchAuditLogs();
  };

  const completeRequest = async (id) => {
    await fetch(`http://localhost:3000/requests/${id}/complete`, {
      method: "PATCH",
    });

    fetchRequests();
    fetchAuditLogs();
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "APPROVED":
        return "status-approved";
      case "REJECTED":
        return "status-rejected";
      case "IN_PROGRESS":
        return "status-progress";
      case "COMPLETED":
        return "status-completed";
      default:
        return "status-pending";
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchAuditLogs();
  }, []);

  const totalRequests = requests.length;

  const pendingRequests = requests.filter(
    (request) => request.status === "PENDING",
  ).length;

  const approvedRequests = requests.filter(
    (request) => request.status === "APPROVED",
  ).length;

  const completedRequests = requests.filter(
    (request) => request.status === "COMPLETED",
  ).length;

  return (
    <div className="app-container">
      <h1 className="page-title">RequestFlow Tracker</h1>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Requests</h3>
          <p>{totalRequests}</p>
        </div>

        <div className="metric-card">
          <h3>Pending</h3>
          <p>{pendingRequests}</p>
        </div>

        <div className="metric-card">
          <h3>Approved</h3>
          <p>{approvedRequests}</p>
        </div>

        <div className="metric-card">
          <h3>Completed</h3>
          <p>{completedRequests}</p>
        </div>
      </div>

      <div className="section-card">
        <h2 className="section-title">Create New Request</h2>

        <form className="request-form" onSubmit={createRequest}>
          <div className="form-row">
            <input
              type="text"
              placeholder="Request title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value="GITHUB_ACCESS">GitHub Access</option>
              <option value="VPN_ACCESS">VPN Access</option>
              <option value="DATABASE_ACCESS">Database Access</option>
              <option value="SOFTWARE_INSTALL">Software Install</option>
              <option value="LAPTOP_REQUEST">Laptop Request</option>
            </select>

            <input
              type="text"
              placeholder="Requested by"
              value={requestedBy}
              onChange={(e) => setRequestedBy(e.target.value)}
              required
            />
          </div>

          <textarea
            placeholder="Request description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button className="submit-button" type="submit">
            Submit Request
          </button>
        </form>
      </div>

      <div className="section-card">
        <h2 className="section-title">Requests</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Requested By</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.title}</td>
                <td>
                  <span
                    className={`status-badge ${getStatusClass(request.status)}`}
                  >
                    {request.status}
                  </span>
                </td>
                <td>{request.requestedBy}</td>
                <td>
                  {request.status === "PENDING" && (
                    <>
                      <button
                        className="action-button approve-button"
                        onClick={() => approveRequest(request.id)}
                      >
                        Approve
                      </button>

                      <button
                        className="action-button reject-button"
                        onClick={() => rejectRequest(request.id)}
                      >
                        Reject
                      </button>
                    </>
                  )}

                  {request.status === "APPROVED" && (
                    <button
                      className="action-button approve-button"
                      onClick={() => startProcessingRequest(request.id)}
                    >
                      Start Processing
                    </button>
                  )}

                  {request.status === "IN_PROGRESS" && (
                    <button
                      className="action-button approve-button"
                      onClick={() => completeRequest(request.id)}
                    >
                      Complete
                    </button>
                  )}

                  {(request.status === "COMPLETED" ||
                    request.status === "REJECTED") && (
                    <span className="no-action">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-card">
        <h2 className="section-title">Audit Logs</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Request ID</th>
              <th>Action</th>
              <th>Performed By</th>
              <th>Timestamp</th>
            </tr>
          </thead>

          <tbody>
            {auditLogs.map((log) => (
              <tr key={log.id}>
                <td>{log.id}</td>
                <td>{log.requestId}</td>
                <td>{log.action}</td>
                <td>{log.performedBy}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
