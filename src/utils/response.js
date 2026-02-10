/**
 * Standardized response helpers
 */
const { OFFICIAL_EMAIL } = require("./constants");

function successResponse(data, res, statusCode = 200) {
  const body = {
    is_success: true,
    official_email: process.env.OFFICIAL_EMAIL || "anshita3781.beai23@chitkara.edu.in",
  };
  if (data !== undefined) {
    body.data = data;
  }
  return res.status(statusCode).json(body);
}

function errorResponse(message, res, statusCode = 400) {
  return res.status(statusCode).json({
    is_success: false,
    official_email: process.env.OFFICIAL_EMAIL || "anshita3781.beai23@chitkara.edu.in",
    error: message,
  });
}

module.exports = {
  successResponse,
  errorResponse,
};
