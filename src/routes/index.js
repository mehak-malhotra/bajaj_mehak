
const express = require("express");
const router = express.Router();
const { handleBfhl } = require("../controllers/bfhlController");
const { handleHealth } = require("../controllers/healthController");

router.post("/bfhl", handleBfhl);
router.get("/health", handleHealth);

module.exports = router;
