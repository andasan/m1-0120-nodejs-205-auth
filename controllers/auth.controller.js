const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res, next) => {
    let errMsg = req.flash('error');
    if(errMsg.length > 0){
        errMsg = errMsg[0]
    }else{
        errMsg = null;
    }
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        errorMessage: errMsg
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email: email})
        .then(user => {
            if(!user){
                req.flash('error', 'Invalid Email or Password');
                return res.redirect('/login')
            }

            bcrypt
                .compare(password, user.password)
                .then((isMatching) => {
                    if(isMatching){
                        req.session.isLoggedIn = true;
                        req.session.user = user;
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        })   
                    }

                    //if password do not match
                    req.flash('error', 'Invalid Email or Password');
                    res.redirect('/login')
                })
                .catch(err => {
                    console.log(err);
                    req.flash('error', 'Invalid Email or Password');
                    res.redirect('/login');
                })
            })
            .catch(err => console.log(err))
}

exports.getSignUp = (req, res, next) => {
    let errMsg = req.flash('error');
    if(errMsg.length > 0){
        errMsg = errMsg[0]
    }else{
        errMsg = null;
    }
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        errorMessage: errMsg
    });
}

exports.postSignUp = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User
        .findOne({ email: email })
        .then((userDoc) => {
            //check if email exists
            if (userDoc) {
                req.flash('error', 'Email already exists.');
                return res.redirect('/signup');
            }

            return bcrypt.hash(password, 12) //12 rounds of hashing - considered to be highly secured
            .then((hashedPassword) => {
                const user = new User({
                    name: name,
                    email: email,
                    password: hashedPassword,
                    cart: { items: [] }
                });
                return user.save();
            })
            .then(() => {
                res.redirect('/login');
            })
        })
        .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}