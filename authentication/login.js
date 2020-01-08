const passport = require('passport')
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const database = require('./model')
const bcrypt = require('bcrypt')


const testUser = {
    email: 'test@test.de',
    username: 'Tester',
    password: 'test'

}

module.exports = app => {

    database.conncetDB();

    passport.serializeUser((user, done) => {
        done(null, testUser.email)
    })
    passport.deserializeUser((id, done) => {
        done(null, testUser);
    });

     passport.use(
        new LocalStrategy( {usernameField: 'email', passwordField: 'password' },
            (email, password, done) => {
                database.findUser(email, async (err, user) => {
                    if(user == null){
                        return done(null, false, {message: 'Kein Nutzer mit dieser Email'})
                    }
                    try{
                        
                        if(await bcrypt.compare(password, user.password)){
                            return done(null, user)
                        } else{
                            return done(null, false, {message: 'Passwort ist nicht korrekt'})
                        }
                    } catch(e) {
                        done(e)
                    }

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
        passport.authenticate('local', {successRedirect: '/interview', failureRedirect: '/', failureFlash: true}));

    app.post(
        '/register', function (req, res) {
            database.findUser(req.body.email, async (err, user) => {
                if(user[0] == null) {
                    console.log('Register: Email already existing')
                } else{
                    try{
                        const hashedpassword = await bcrypt.hash(req.body.password, 10)
                        var user = {         
                            username: req.body.username,
                            email: req.body.email,
                            password: hashedpassword
                        }
                        database.saveUser(user);
                        res.redirect('/login')
                    }catch{
                        res.redirect('/register')
                    }
                }                
            })           
        });
}

