var nconf = require('nconf');

nconf.use('file', { file: './heim.json' });
nconf.load();

module.exports = nconf;
