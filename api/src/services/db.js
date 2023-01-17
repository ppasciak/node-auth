const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'node_db'
});

db.connect((err) => {
  if (err) throw err;

  console.log('connected');
  db.query('SELECT * FROM user', (err, result) => {
    if (err) throw err;
    console.log(result);
  });
});