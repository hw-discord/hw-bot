const Rcon = require('rcon');
const env = require('../environments/environments');

const client = new Rcon(
  env.rcon.host, env.rcon.port, env.rcon.password,
);

function connect() {
  return new Promise((resolve) => {
    client.connect();

    client.on('auth', () => {
      console.log('Rcon bağlantısı sağlandı.');
      resolve(client);
    }).on('response', (response) => {
      console.log('Rcon response:', response);
    });
  });
}

module.exports = () => connect();
