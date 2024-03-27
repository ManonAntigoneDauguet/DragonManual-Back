class ValidationError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
    this.name = "ValidationError";
  }
}

module.exports.ValidationError = ValidationError;