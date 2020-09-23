exports.getLogin = (req,res,next) => {
    res.render('auth/login', {
        pageTitle: 'Login',
        path: '/login',
        isAuth: req.isLoggedIn
    });
}

exports.postLogin = (req,res,next) => {
    req.isLoggedIn = true
    res.redirect('/');
}