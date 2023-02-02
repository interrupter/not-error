import notErrorReporter from "./../../reporter.browser.mjs";
import nsErrorReporter from "./nsErrorReporter.mjs";

import notError from "./../../error.browser.mjs";
import notValidationError from "./../../validation.error.browser.mjs";
import notRequestError from "./../../request.error.browser.mjs";

const manifest = {};
const services = { nsErrorReporter };

export {
    manifest,
    notError,
    notValidationError,
    notRequestError,
    notErrorReporter,
    services,
};
