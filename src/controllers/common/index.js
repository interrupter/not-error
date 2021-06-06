import notErrorReporter from './../../reporter.browser.js';
import nsErrorReporter from './nsErrorReporter.js';

import notError from './../../error.browser.js';

const manifest = {};
const services = {nsErrorReporter};

export {
	manifest,
	notError,
	notErrorReporter,
	services
};
