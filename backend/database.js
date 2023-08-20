const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'new1234!',
    connectionLimit: 5,
    database: 'memo'
});
module.exports = {
           async run(query,params){
               return new Promise((resolve) => {
                   pool.getConnection()
                       .then(conn => {
                           conn.query(query,params)
                               .then((rows) => {
                                   resolve(rows);
                                   conn.end();
                               })
                               .catch(err => {
                                   //handle error
                                   console.log(err);
                                   conn.end();
                               })
                       }).catch(err => {
                       //not connected
                   });
               });
    }

}