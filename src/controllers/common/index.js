import notErrorReporter from './../../reporter.browser.js';
import nsErrorReporter from './nsErrorReporter.js';

import notError from './../../error.browser.js';
import notValidationError from './../../validation.error.browser.js';
import notRequestError from './../../request.error.browser.js';

const manifest = {};
const services = {nsErrorReporter};

export {
	manifest,
	notError,
	notValidationError,
	notRequestError,
	notErrorReporter,
	services
};
