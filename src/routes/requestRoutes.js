const express = require("express");

const router = express.Router();

const {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
  getAuditLogs,
  startProcessingRequest,
  completeRequest,
  approveFromLink,
  rejectFromLink,
} = require("../controllers/requestController");

const { checkManagerRole } = require("../middleware/roleMiddleware");

router.post("/", createRequest);

router.get("/", getAllRequests);

router.get("/audit/logs", getAuditLogs);

router.patch("/:id/approve", checkManagerRole, approveRequest);

router.patch("/:id/reject", checkManagerRole, rejectRequest);

router.patch("/:id/start-processing", startProcessingRequest);

router.patch("/:id/complete", completeRequest);

router.get("/:id/approve-link", approveFromLink);

router.get("/:id/reject-link", rejectFromLink);

module.exports = router;
