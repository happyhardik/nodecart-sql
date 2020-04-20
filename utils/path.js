const path = require("path");

module.exports.get = (...arr) => {
    return path.join(path.dirname(process.mainModule.filename),...arr);
}