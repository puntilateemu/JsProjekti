var mariadb = require('mariadb');
const dotenv = require('dotenv');
dotenv.config();


var pool =
  mariadb.createPool({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database:process.env.DB_DATABASE
  });

// Expose a method to establish connection with MariaDB
module.exports={
    getConnection: function(){
      return new Promise(function(resolve,reject){
        pool.getConnection().then(function(connection){
          resolve(connection);
        }).catch(function(error){
          reject(error);
        });
      });
    }
  }
