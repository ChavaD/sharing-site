require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const registration = require('./registration.js');
const login = require('./login.js');
const app = express();
const port = process.env.PORT || 80;
const bodyParser = require('body-parser');
const multer = require('multer');
const multerUupload = multer({
    dest: __dirname + '/images'
});
const upload = require('./upload.js');

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(cookieParser());
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.json());


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


app.post('/registration/register', async function (req, res) {
    let result = await registration.register(req, res);
    res.send(result);
});
app.post('/loginpage/login', async function (req, res) {
    let result = await login.login(req, res);
    res.send(result);
});
app.post('/forDelivery/upload', multerUupload.single('image'), async function (req, res) {
    let result = await upload.upload(req, res);
    res.send(result);
});

app.listen(port, () => console.log('Example app listening on port ' + port));