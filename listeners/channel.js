const env = require('../environments/environments');

function initialize(discordClient, pubsub) {
  discordClient.once('message', (value) => {
    if (value.channel.id === env.channel.signupID) {
      pubsub.emit('channelReply', value.content);
    }
  });
}

module.exports = initialize;
