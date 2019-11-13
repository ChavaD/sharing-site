// const test = require('./test1.js')

module.exports = {
    register,
    // login,
    getUsers
};

const mysql = require('promise-mysql');

let db;
mysql.createPool({
    connectionLimit: 100,
    host: process.env.MYSQL_URL,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB

}).then((c) => {
    db = c;
}).catch((e) => {
    console.error(e);
});
console.log('check2');

async function register(req, res) {
    console.log('check2');

    let users = await getUsers();

    let userName = req.body.userName;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let passWord = req.body.passWord;
    let confirmPassWord = req.body.confirmPassWord;

    for (let u of users) {
        if (userName === u.userName && passWord === u.passWord) {
            // return 'משתמש קיים!!';
            return res.sendStatus(500);
        }
    }
    await db.query(`INSERT INTO users(userName,fullName,email,passWord) VALUES("${userName}","${fullName}","${email}","${passWord}")`);
    res.send("נרשמת בהצלחה");



};



async function getUsers() {

    let data = await db.query("select * from users");
    return data;
}