const path = require("path");
module.exports = {
    name: "not-error",
    notError: require("./error.node.cjs"),
    notValidationError: require("./validation.error.node.cjs"),
    notRequestError: require("./request.error.node.cjs"),
    notErrorReporter: require("./reporter.node.cjs"),
    paths: {
        controllers: path.join(__dirname, "controllers"),
    },
};
