var mongoose = require('mongoose')

var User = null;



const userm = 'usercol'

function conncetDB(){
    mongoose.connect('mongodb://localhost/myps', {useUnifiedTopology: true, useNewUrlParser: true })

    mongoose.set('useCreateIndex', true)
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(){
        console.log('Connected to mongoDB')
    }); 

    var userShema = new mongoose.Schema({
        username:  String,
        email: String,
        password: String,
        age: String    
    })
    User = mongoose.model(userm, userShema)
    
    /*
    UserSchema.pre('save', function(next) {
        const user = this;
        bcrypt.hash(user.password, 10, (err, hash) => {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        })
    });
    */

    
}

function saveUser (userData){
    
    var newUser = new User({username: userData.username, email: userData.email, password: userData.password})
    newUser.save(function (err, newUser) {
        if (err) 
        return console.error(err);     
      }
    )
}

function findUser(username, callback) {    
    mongoose.model(userm).findOne({email: username}, callback)
}

function findUserById(id, callback) {
    console.log(id)   
    mongoose.model(userm).findById(id, callback)
}


module.exports = {
    conncetDB,
    saveUser,
    findUser,
    findUserById
}

