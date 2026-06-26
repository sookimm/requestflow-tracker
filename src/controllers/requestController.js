const { PrismaClient } = require("@prisma/client");
const { sendApprovalEmail } = require("../services/emailService");

const prisma = new PrismaClient();

const createRequest = async (req, res) => {
  const newRequest = await prisma.request.create({
    data: {
      title: req.body.title,
      description: req.body.description,
      requestType: req.body.requestType,
      status: "PENDING",
      requestedBy: req.body.requestedBy,
    },
  });

  await sendApprovalEmail(newRequest);

  res.status(201).json(newRequest);
};

const getAllRequests = async (req, res) => {
  const requests = await prisma.request.findMany({
    orderBy: {
      id: "desc",
    },
  });

  res.json(requests);
};

const approveRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { status: "APPROVED" },
  });

  await prisma.auditLog.create({
    data: {
      requestId: requestId,
      action: "APPROVED",
      performedBy: "manager01",
    },
  });

  res.json(updatedRequest);
};

const rejectRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { status: "REJECTED" },
  });

  await prisma.auditLog.create({
    data: {
      requestId: requestId,
      action: "REJECTED",
      performedBy: "manager01",
    },
  });

  res.json(updatedRequest);
};

const startProcessingRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { status: "IN_PROGRESS" },
  });

  await prisma.auditLog.create({
    data: {
      requestId: requestId,
      action: "IN_PROGRESS",
      performedBy: "admin01",
    },
  });

  res.json(updatedRequest);
};

const completeRequest = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { status: "COMPLETED" },
  });

  await prisma.auditLog.create({
    data: {
      requestId: requestId,
      action: "COMPLETED",
      performedBy: "admin01",
    },
  });

  res.json(updatedRequest);
};

const approveFromLink = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { status: "APPROVED" },
  });

  await prisma.auditLog.create({
    data: {
      requestId,
      action: "APPROVED_FROM_LINK",
      performedBy: "manager01",
    },
  });

  res.send(`
  <html>
    <body style="font-family: Arial, sans-serif; background:#f3f4f6; padding:40px;">
      <div style="max-width:600px; margin:0 auto; background:white; padding:32px; border-radius:12px; text-align:center;">
        <h1 style="color:#16a34a;">Request Approved</h1>
        <h2>${updatedRequest.title}</h2>
        <p>This request has been approved successfully.</p>
        <p style="color:#6b7280;">You may now close this page.</p>
      </div>
    </body>
  </html>
`);
};

const rejectFromLink = async (req, res) => {
  const requestId = parseInt(req.params.id);

  const request = await prisma.request.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return res.status(404).json({
      message: "Request not found",
    });
  }

  const updatedRequest = await prisma.request.update({
    where: { id: requestId },
    data: { status: "REJECTED" },
  });

  await prisma.auditLog.create({
    data: {
      requestId,
      action: "REJECTED_FROM_LINK",
      performedBy: "manager01",
    },
  });

  res.send(`
  <html>
    <body style="font-family: Arial, sans-serif; background:#f3f4f6; padding:40px;">
      <div style="max-width:600px; margin:0 auto; background:white; padding:32px; border-radius:12px; text-align:center;">
        <h1 style="color:#dc2626;">Request Rejected</h1>
        <h2>${updatedRequest.title}</h2>
        <p>This request has been rejected.</p>
        <p style="color:#6b7280;">You may now close this page.</p>
      </div>
    </body>
  </html>
`);
};

const getAuditLogs = async (req, res) => {
  const auditLogs = await prisma.auditLog.findMany({
    orderBy: {
      id: "desc",
    },
  });

  res.json(auditLogs);
};

module.exports = {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getAuditLogs,
  startProcessingRequest,
  completeRequest,
  approveFromLink,
  rejectFromLink,
};
