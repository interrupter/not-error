const path = require('path');
module.exports = {
	name: 'not-error',
	notError: require('./error.node.js'),
	notValidationError: require('./validation.error.node.js'),
	notRequestError: require('./request.error.node.js'),
	notErrorReporter: require('./reporter.node.js'),
	paths:{
		controllers: path.join(__dirname, 'controllers')
	}
};
