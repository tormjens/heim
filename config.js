var fs = require('fs');
var configuration = JSON.parse(
    fs.readFileSync('./heim.json')
);

module.exports = configuration;
