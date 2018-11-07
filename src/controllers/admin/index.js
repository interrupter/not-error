import notErrorReporter from './../../reporter.browser.js';
import notError from './../../error.browser.js';

let manifest = {
	services:{
		'errorReporter': notErrorReporter
	}
};

export {manifest, notError, notErrorReporter};
