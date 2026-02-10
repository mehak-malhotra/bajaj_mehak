
const { VALID_KEYS } = require("../utils/constants");
const { successResponse, errorResponse } = require("../utils/response");
const { generateFibonacci } = require("../services/fibonacciService");
const { filterPrimes } = require("../services/primeService");
const { computeLCM } = require("../services/lcmService");
const { computeHCF } = require("../services/hcfService");
const { getSingleWordAnswer } = require("../services/aiService");

function getPresentKeys(body) {
  return VALID_KEYS.filter((key) => body[key] !== undefined && body[key] !== null);
}

function handleBfhl(req, res) {
  try {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return errorResponse("Request body must be a JSON object", res, 400);
    }

    const presentKeys = getPresentKeys(body);

    if (presentKeys.length === 0) {
      return errorResponse("Request must contain exactly one of: fibonacci, prime, lcm, hcf, AI", res, 400);
    }

    if (presentKeys.length > 1) {
      return errorResponse("Request must contain exactly one key, not multiple", res, 400);
    }

    const key = presentKeys[0];

    switch (key) {
      case "fibonacci":
        return handleFibonacci(body.fibonacci, res);
      case "prime":
        return handlePrime(body.prime, res);
      case "lcm":
        return handleLcm(body.lcm, res);
      case "hcf":
        return handleHcf(body.hcf, res);
      case "AI":
        return handleAI(body.AI, res);
      default:
        return errorResponse("Invalid key", res, 400);
    }
  } catch (err) {
    console.error("bfhl error:", err.message);
    return errorResponse("Internal server error", res, 500);
  }
}

function handleFibonacci(value, res) {
  if (typeof value !== "number" || !Number.isInteger(value)) {
    return errorResponse("fibonacci must be an integer", res, 422);
  }
  if (value <= 0) {
    return errorResponse("fibonacci must be a positive integer", res, 422);
  }
  if (value > 10000) {
    return errorResponse("fibonacci value too large", res, 422);
  }

  const data = generateFibonacci(value);
  return successResponse(data, res);
}

function handlePrime(value, res) {
  if (!Array.isArray(value)) {
    return errorResponse("prime must be an array", res, 422);
  }
  if (value.length === 0) {
    return errorResponse("prime array cannot be empty", res, 422);
  }

  const validNumbers = value.filter(
    (n) => typeof n === "number" && Number.isInteger(n)
  );
  if (validNumbers.length === 0) {
    return errorResponse("prime array must contain at least one valid integer", res, 422);
  }

  const data = filterPrimes(value);
  return successResponse(data, res);
}

function handleLcm(value, res) {
  if (!Array.isArray(value)) {
    return errorResponse("lcm must be an array", res, 422);
  }
  if (value.length < 2) {
    return errorResponse("lcm array must have at least 2 elements", res, 422);
  }

  const validNumbers = value.filter(
    (n) => typeof n === "number" && Number.isInteger(n)
  );
  if (validNumbers.length < 2) {
    return errorResponse("lcm array must contain at least 2 valid integers", res, 422);
  }

  const hasNegative = validNumbers.some((n) => n < 0);
  if (hasNegative) {
    return errorResponse("lcm array must not contain negative numbers", res, 422);
  }

  const data = computeLCM(value);
  return successResponse(data, res);
}

function handleHcf(value, res) {
  if (!Array.isArray(value)) {
    return errorResponse("hcf must be an array", res, 422);
  }
  if (value.length < 2) {
    return errorResponse("hcf array must have at least 2 elements", res, 422);
  }

  const validNumbers = value.filter(
    (n) => typeof n === "number" && Number.isInteger(n)
  );
  if (validNumbers.length < 2) {
    return errorResponse("hcf array must contain at least 2 valid integers", res, 422);
  }

  const data = computeHCF(value);
  return successResponse(data, res);
}

async function handleAI(value, res) {
  if (typeof value !== "string") {
    return errorResponse("AI must be a string", res, 422);
  }
  const trimmed = value.trim();
  if (trimmed.length === 0) {
    return errorResponse("AI question cannot be empty", res, 422);
  }

  try {
    const data = await getSingleWordAnswer(trimmed);
    return successResponse(data, res);
  } catch (err) {
    console.error("AI service error:", err.message);
    return errorResponse(
      "AI service unavailable. Please ensure GEMINI_API_KEY is set correctly.",
      res,
      500
    );
  }
}

module.exports = { handleBfhl };
