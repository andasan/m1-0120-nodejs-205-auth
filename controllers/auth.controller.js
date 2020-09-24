const User = require('../models/user.model');

exports.getLogin = (req,res,next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuth: req.session.isLoggedIn
    });
}

exports.postLogin = (req,res,next) => {
    req.session.isLoggedIn = true;
    res.redirect('/');
}

exports.getSignUp = (req, res,next) => {
    res.render('auth/signup', {
        pageTitle: 'Sign Up',
        path: '/signup',
        isAuth: req.session.isLoggedIn
    });
}

exports.postSignUp = (req,res,next) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User
        .findOne({email: email})
        .then((userDoc) => {
            //check if email exists
            if(userDoc){ 
                return res.redirect('/signup');
            }

            const user = new User({
                name: name,
                email: email,
                password: password,
                cart: { items: [] }
            });
            return user.save();
        })
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => console.log(err));
}

exports.postLogout = (req,res,next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    })
}