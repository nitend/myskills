const passport = require('passport')
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const database = require('./model')


const testUser = {
    email: 'test@test.de',
    username: 'Tester',
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
                database.findUser(username, (err, User) => {
                    console.log('user exists: ' + User)
                    console.log(err)
                })
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
}

