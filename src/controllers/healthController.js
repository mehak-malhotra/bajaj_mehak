
const { successResponse } = require("../utils/response");

function handleHealth(req, res) {
  return successResponse(undefined, res);
}

module.exports = { handleHealth };
