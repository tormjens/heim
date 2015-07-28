var CronJob = require('cron').CronJob;
var config = require('../config');
var colors = require('colors');
var Switch = require('./handlers/switch');

var timezone = config.get('timezone');

console.log(colors.green('# '));

config.get('tasks').forEach(function(task) {
    console.log(colors.green('# ') + 'Registered task: ' + colors.bold(task.description));
    new CronJob(task.pattern, function() {

        console.log(colors.green('# '));
        console.log(colors.green('# ') + 'Running scheduled task: ' + colors.bold(task.description));

        var delay = 0;
        task.devices.forEach(function(item) {
            var name = item.split('_');
            var device = new Switch({ provider: name[0], id: name[1] });
            setTimeout(function() {
                if(task.action == 'on') {
                    device.on()
                }
                else if(task.action == 'off') {
                    device.off();
                }
            }, delay);
            delay += 500;
        });


    }, null, true, timezone);
});

console.log(colors.green('# '));
console.log(colors.green('###############################################'));
