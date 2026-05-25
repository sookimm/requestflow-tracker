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
} = require("../controllers/requestController");

const { checkManagerRole } = require("../middleware/roleMiddleware");

router.post("/", createRequest);

router.get("/", getAllRequests);

router.get("/audit/logs", getAuditLogs);

router.patch("/:id/approve", checkManagerRole, approveRequest);

router.patch("/:id/reject", checkManagerRole, rejectRequest);

router.patch("/:id/start-processing", startProcessingRequest);

router.patch("/:id/complete", completeRequest);

module.exports = router;
