const passport = require('passport')
const expressSession = require('express-session');
const LocalStrategy = require('passport-local');
const database = require('./model')
const bcrypt = require('bcrypt')


module.exports = app => {

    database.conncetDB();

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })
    passport.deserializeUser((id, done) => {
        database.findUserById(id, done)
    });

     passport.use(
        new LocalStrategy( {usernameField: 'email'},
            (email, password, done) => {
                database.findUser(email, async (err, user) => {
                    // Error
                    if(err != null){
                        console.log(err)
                        return done(err)
                        
                    }    
                    // No User
                    if(!Object.keys(user).length){
                        return done(null, false)
                        //
                    }
                    // Check password
                    try{   
                        console.log('user ' + user)
                        console.log('password ' + password + ' hash ' + user['email'])
                        if(await bcrypt.compare(password, user.password)){
                            return done(null, user)
                        } else{
                            console.log('password wrong')
                            return done(null, false)
                            // 
                        }
                    } catch(e) {
                        done(e)
                    }
                })
                
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
        passport.authenticate('local', {successRedirect: '/interview', failureRedirect: '/fail', failureFlash: true}));

    app.post(
        '/register', function (req, res) {
            database.findUser(req.body.email, async (err, user) => {
                if(user != null) {
                    res.redirect('/')
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

