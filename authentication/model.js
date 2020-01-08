var mongoose = require('mongoose')

var UserModel = '';

function conncetDB(){
    mongoose.connect('mongodb://localhost/myps', {useUnifiedTopology: true, useNewUrlParser: true })

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'))
    db.once('open', function(){
        console.log('Connected to mongoDB')
    }); 
    
    var UserShema = new mongoose.Schema({
        username: String,
        email: String,
        password: String
    })  
    UserModel = mongoose.model('UserModel', UserShema)
}

function saveUser (User){
    var newUser = new UserModel(User)
    newUser.save(function (err, newUser) {
        if (err) 
        return console.error(err);     
      }
    )
}

function findUser(username, callback) {
    mongoose.model('UserModel').find({email: username}, callback)
}


module.exports = {
    conncetDB,
    saveUser,
    findUser
}

