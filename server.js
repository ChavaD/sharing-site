require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const registration = require('./registration.js');
const app = express();
const mysql = require('./mysql.js');
const port = process.env.PORT || 80;


app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(cookieParser());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/', (req, res) => res.sendFile('./public/pages/homepage.html', {
    root: __dirname
}));
app.get('/registration', (req, res) => res.sendFile('./public/pages/ Registration.html', {
    root: __dirname
}));
app.get('/login', (req, res) => res.sendFile('./pages/loginpage.html', {
    root: __dirname
}));
app.get('/about', (req, res) => res.sendFile('./pages/about.html', {
    root: __dirname
}));
// let user = ['chava', 'adva'];
// app.get('/userInfo/:id', (req, res) => {
//     console.log('req.params.id');
//     res.render('pages/userInfo', {
//         users: user[req.params.id],
//         id: req.params.id
//     });
// });

app.get('/mysql', async function (req, res) {
    let data = await mysql();
    res.send(data);
});

app.post('/registration/register', (req, res) => {
    return registration.register(req, res);
});
app.post('/registration/login', (req, res) => {
    return registration.login(req, res);
});

app.listen(port, () => console.log('Example app listening on port ' + port));