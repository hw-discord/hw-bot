const EventEmitter = require('events').EventEmitter;
const pubsub = new EventEmitter();

const rcon = require('./clients/rcon');
const discord = require('./clients/discord');

const channelListener = require('./listeners/channel');
const signupCommand = require('./commands/signup');

const infoMessage = (password) =>
  // eslint-disable-next-line max-len
  `Hesabın oluşturuldu, şifreni değiştirmeyi unutma! Şifren: ${password}`;

(async () => {
  const rconClient = await rcon();
  const discordClient = await discord();

  channelListener(discordClient, pubsub);

  pubsub.on('channelReply', async (value) => {
    if (value.command === '/kayıt') {
      const result = await signupCommand(
        value.message, value.userID,
      );

      const author = value.client.author;
      if (result.status) {
        rconClient.send(result.data);

        author.send(infoMessage(result.password))
          .catch(() => {
            value.client.reply(infoMessage(result.password));
          });
      } else {
        author.send('Daha önce kayıt oldun.')
          .catch(() => {
            value.client.reply('Daha önce kayıt oldun.');
          });
      }
    }
  });
})();
