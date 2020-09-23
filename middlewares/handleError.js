const { GeneralError } = require('../utilities/error')

const handleErrors = (err, req, res, next) => {
	if (err instanceof GeneralError) {
		return res.status(err.getCode()).json({
			error: true,
			status: 'error',
			message: err.message,
		})
	}

	return res.status(500).json({
		error: true,
		status: 'error',
		message: err.message,
	})
}

module.exports = handleErrors
