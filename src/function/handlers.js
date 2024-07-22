const log = require("./log/util");

// log/util.js
const {
  getTimestamp,
  info,
  warn,
  error,
  success,
  debug,
  deleted,
  updated,
  created,
  custom,
} = require("./log/util");

const log = (request) => {
  try {
    logInfo("Processing request");
    // Simulate processing request
    if (!request) {
      throw new Error("Invalid request");
    }
    logInfo("Request processed successfully");
  } catch (error) {
    logError(error.message);
  }
};

module.exports = {
  log,
};
