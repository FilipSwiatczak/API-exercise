const path = require('path').join(__dirname, '.tmp', 'report');
const fs = require('fs');
if (!fs.existsSync(path)) {
    fs.mkdirSync(path, {recursive: true});
}
var common = [
    '--format json:.tmp/report/report.json',
    '--require ./dist/features/step_definitions/**/*.js'
].join(' ');

module.exports = {
    default: common
};