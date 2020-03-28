const Discord = require('discord.js');
const client = new Discord.Client();

const env = require('../environments/environments');

function connect() {
  return new Promise((resolve) => {
    client.login(env.discord.token);

    client.once('ready', () => {
      console.log('Discord bağlantısı sağlandı.');
      resolve(client);
    });
  });
}

module.exports = connect;
