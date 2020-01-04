const passport = require('passport')
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');

const testUser = {
    email: 'test@test.de',
    username: 'test@test.de',
    password: 'test'

}

module.exports = app => {
    passport.serializeUser((user, done) => {
        done(null, testUser.email)
    })
    passport.deserializeUser((id, done) => {
        done(null, testUser);
    });

    passport.use(
        new LocalStrategy( {usernameField: 'email', passwordField: 'password' },
            (username, password, done) => {
                // database access
                done(null, testUser)
            })
    )

    app.use(
        expressSession({
            secret: 'top secret',
            resave: false,
            saveUninitialized: false
        }),    
    )
    app.use(passport.initialize());
    app.use(passport.session());

  
    app.post(
        '/login', 
        passport.authenticate('local', {successRedirect: '/interview', failureRedirect: '/'}));
    /*

    app.post('/login', function(req, res, next) {
        console.log(req.url);
        passport.authenticate('local', function(err, user, info) {
            console.log("authenticate");
            console.log(err);
            console.log(user);
            console.log(info);
        })(req, res, next);
    });
    */
}

