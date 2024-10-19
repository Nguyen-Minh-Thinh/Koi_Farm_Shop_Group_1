// db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'your_password',
  database: 'your_database'
});

connection.connect((err) => {
  if (err) {
    console.error('Kết nối DB thất bại:', err.message);
    return;
  }
  console.log('Đã kết nối tới DB!');
});

module.exports = connection;
