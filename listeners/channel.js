const env = require('../environments/environments');
const commands = ['/kayıt'];

function initialize(discordClient, pubsub) {
  discordClient.on('message', (value) => {
    const command = (value.content.split(' ')[0] || '');

    if (
      value.channel.id === env.channel.signupID
      && commands.indexOf(command) !== -1
    ) {
      pubsub.emit('channelReply', {
        command,
        message: value.content,
        userID: value.author.id,
        client: value,
      });
    }
  });
}

module.exports = initialize;
