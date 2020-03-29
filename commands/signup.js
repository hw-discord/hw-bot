const fs = require('fs');
const path = require('path');
const filePath = path.dirname(
  require.main.filename || process.mainModule.filename,
) + '/data/users.json';

async function execute(value, userID) {
  const params = value.split(' ');
  if ((params[1] || '').length < 3) {
    return { status: false, body: 'none' };
  }

  const result = await getData();
  if (result.status) {
    const findResult = result.data.find((query) =>
      query.userID === userID || query.username === params[1]);

    if (typeof findResult !== 'undefined') {
      return { status: false, data: 'none' };
    }

    const password = Math.random().toString(36)
      .substr(2, 6).toUpperCase();

    result.data.push({
      username: params[1],
      userID,
    });

    const updateResult = await updateData(result.data);
    return {
      status: updateResult,
      data: `authme register ${params[1]} ${password}`,
      password,
    };
  }
}

function getData() {
  return new Promise((resolve) => {
    fs.readFile(filePath, (error, value) => {
      if (error) {
        console.log('Data çağırılırken bir hata oluştu.', error);
        resolve({ status: false, data: 'none' });
      }

      resolve({ status: true, data: JSON.parse(value) });
    });
  });
}

function updateData(jsonData) {
  return new Promise((resolve) => {
    fs.writeFile(
      filePath, JSON.stringify(jsonData),
      'utf8', (error) => {
        if (error) {
          console.log('Data güncellenirken hata oluştu.', error);
          resolve(false);
        }

        resolve(true);
      });
  });
}

module.exports = execute;
