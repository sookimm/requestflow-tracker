const requests = [];
const auditLogs = [];

const createRequest = (req, res) => {
  const newRequest = {
    id: requests.length + 1,
    title: req.body.title,
    description: req.body.description,
    requestType: req.body.requestType,
    status: "PENDING",
    requestedBy: req.body.requestedBy,
  };

  requests.push(newRequest);

  res.status(201).json(newRequest);
};

const getAllRequests = (req, res) => {
  res.json(requests);
};

const approveRequest = (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  request.status = "APPROVED";

  auditLogs.push({
    requestId: request.id,
    action: "APPROVED",
    performedBy: "manager01",
    timestamp: new Date(),
  });

  res.json(request);
};

const rejectRequest = (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = requests.find((r) => r.id === requestId);

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  request.status = "REJECTED";

  auditLogs.push({
    requestId: request.id,
    action: "REJECTED",
    performedBy: "manager01",
    timestamp: new Date(),
  });

  res.json(request);
};

const getAuditLogs = (req, res) => {
  res.json(auditLogs);
};

module.exports = {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getAuditLogs,
};
