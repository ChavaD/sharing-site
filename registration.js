module.exports = {
    register,
    login
};

let users = [];

function register(req, res) {
    let userName = req.body.userName;
    let fullName = req.body.fullName;
    let email = req.body.email;
    let passWord = req.body.passWord;
    let confirmPassword = req.body.confirmPassword;

    for (let u of users) {

        if (userName === u.userName && passWord === u.passWord) {
            res.status(500);

            res.send('משתמש קיים!!');
        }
    }
    let user = {
        userName,
        fullName,
        passWord,
        email,
        confirmPassword
    };

    users.push(user);
    res.send("נרשמת בהצלחה")
}

function login(req, res) {}