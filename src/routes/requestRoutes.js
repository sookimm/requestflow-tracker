const express = require("express");

const router = express.Router();

const {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest,
} = require("../controllers/requestController");

router.post("/", createRequest);

router.get("/", getAllRequests);

router.patch("/:id/approve", approveRequest);

router.patch("/:id/reject", rejectRequest);

module.exports = router;
