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

async function register(req, res) {

    let users = await getUsers();

    let name = req.body.name;
    let email = req.body.email;
    let passWord = req.body.passWord;
    let confirmPassWord = req.body.confirmPassWord;
    if (passWord !== confirmPassWord) {
        return res.send("הסיסמא אינה תואמת")
    }
    for (let u of users) {
        if (name === u.name && passWord === u.passWord && email === u.email) {
            // return 'משתמש קיים!!';
            return res.sendStatus(500);
        }
    }
    await db.query(`INSERT INTO usersname(name,email,passWord) VALUES("${name}","${email}","${passWord}")`);
    res.send("נרשמת בהצלחה");



};



async function getUsers() {

    let data = await db.query("select * from usersname");
    return data;
}