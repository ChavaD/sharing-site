module.exports = {
    upload
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

async function upload(req, res) {

    // let users = await getUsers();

    let image = req.file;
    let description = req.body.description;
    let category = req.body.category;
    let phoneNumber = req.body.phoneNumber;
    let adress = req.body.adress;
    let email = req.body.email;


    // for (let u of users) {
    //     if (userName === u.userName && passWord === u.passWord) {
    //         // return 'משתמש קיים!!';
    //         return res.sendStatus(500);
    //     }
    await db.query(`INSERT INTO images(image,description,category,phoneNumber,adress,email) VALUES("${image.originalname}","${description}","${category}","${phoneNumber}","${adress}","${email}")`);
    res.send("התמונה הועלתה בהצלחה");
};