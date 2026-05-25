const express = require("express");

const router = express.Router();

const {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/requestController");

const { checkManagerRole } = require("../middleware/roleMiddleware");

router.post("/", createRequest);

router.get("/", getAllRequests);

router.patch("/:id/approve", checkManagerRole, approveRequest);

router.patch("/:id/reject", checkManagerRole, rejectRequest);

module.exports = router;
