import notErrorReporter from './../../reporter.browser.js';
import notError from './../../error.browser.js';

let manifest = {};
let services = {notErrorReporter, notError};

export {manifest, notError, notErrorReporter, services};
