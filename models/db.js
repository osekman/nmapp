const mariadb = require('mariadb');
const path = require('path');
const env = require('dotenv').config({path:path.join(__dirname)+'/.env'});

let con;

const DB_NAME     = process.env.DB_NAME;
const DB_HOST     = process.env.DB_HOST;
const DB_USER     = process.env.DB_USER;
const DB_PASS     = process.env.DB_PASS;

module.exports = {
    //singleton db connection
    con:function(){
      if(con){
          return con;
       }else{

        con = mariadb.createPool({
              host             : DB_HOST,
              database         : DB_NAME,
              user             : DB_USER,
              password         : DB_PASS,
              connectionLimit  : 10
          });
        
          return con;
      }
    }
}