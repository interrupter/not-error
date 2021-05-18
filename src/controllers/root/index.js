import notErrorReporter from './../../reporter.browser.js';
import nsErrorReporter from './../common/nsErrorReporter.js';
import notError from './../../error.browser.js';

let manifest = {};
let services = {nsErrorReporter};

export {manifest, notError, notErrorReporter, services};
