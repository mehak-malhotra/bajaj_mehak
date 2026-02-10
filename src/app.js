/**
 * Express application setup
 */
const express = require("express");
const routes = require("./routes");

const app = express();

app.use(express.json({ limit: "1mb" }));

app.use("/", routes);

app.use((req, res) => {
  res.status(404).json({
    is_success: false,
    error: "Not found",
  });
});

app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const { errorResponse } = require("./utils/response");
  const statusCode = err instanceof SyntaxError ? 400 : 500;
  const message = err instanceof SyntaxError ? "Invalid JSON" : "Internal server error";
  errorResponse(message, res, statusCode);
});

module.exports = app;
