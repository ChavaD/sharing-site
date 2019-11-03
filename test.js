const mysql = require('promise-mysql');

let db;

mysql.createPool({
    connectionLimit: 100,
    host: "localhost",
    user: "root",
    password: "beitar",
    database: "sharing-site "
}).then((c) => {
    db = c;
    console.log(db);

}).catch((e) => {
    // console.error(e);
});

module.exports = async function (req, res) {
    let promise = db.query("select * from users");
    let data = await promise;
    res.send(data);


}