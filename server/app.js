const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors')

app.use(cors());

// Creates connection
const db = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'root@12345',
     database: 'microfocus'
});

db.connect((err) => {
     if (err) {
          throw err;
     }
     console.log('Database Connected....');
});

// Query for getting the data
app.get('/getData', (req, res) => {
     const sql = `SELECT * FROM events`;
     const query = db.query(sql, (err, result) => {
          if (err) throw err;
          res.send(result);
     });
})

app.listen('3005', () => {
     console.log('Server started on port 3005...');
});