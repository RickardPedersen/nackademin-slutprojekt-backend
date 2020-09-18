class GeneralError extends Error {
    constructor(message) {
        super()
        this.message = message
    }

    getCode() {
        if (this instanceof BadRequestError) return 400
        if (this instanceof NotFoundError) return 404
        if (this instanceof UnauthorizedError) return 401

        return 500
    }
}

class BadRequestError extends GeneralError {}
class NotFoundError extends GeneralError {}
class UnauthorizedError extends GeneralError {}

module.exports = {
  GeneralError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
}
