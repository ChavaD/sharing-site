module.exports = {
    login
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


async function login(req, res) {
    let usersname = await getUsers();
    let email = req.body.email;
    let passWord = req.body.passWord;


    for (let e of usersname) {
        if (email === e.email && passWord === e.passWord) {
            console.log(e.email);
            console.log(email);
            return res.send("שלום");
        }
    }
    res.status(500).send("אינך משתמש רשום");
};


async function getUsers() {
    let data = await db.query("select * from usersname");
    return data;
}