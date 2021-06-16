const webhook = require('webhook-discord');

const Hook = new webhook.Webhook('https://discord.com/api/webhooks/848479755095638026/u1s2yh9NW4KVEvMxKnSuEcj0O_gHQa2BQXfMOW-vXjnKePE45gz-fMs8-kSC55zHtA6N');

const Logger = function () {};

Logger.prototype.info = function (logText) {
  const text = `${new Date()}info:::::${logText}`;
  console.log(text);
  Hook.info('INFO', text);
};

Logger.prototype.debug = function (logText) {
  const text = `${new Date()}debug:::::${logText}`;
  console.log(text);
  Hook.warn('DEBUG', text);
};

Logger.prototype.error = function (logText) {
  text = `${new Date()}error:::::${logText}`;
  console.log(text);
  Hook.err('ERROR', text);
};

module.exports = new Logger();
