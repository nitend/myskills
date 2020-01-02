const passport = require('passport');
const expressSession = require('express-session');

module.exports = app = {
    passport.serielazeUser((user, done) => done(null, user.username))
    passport.deerializeUser((id, done)) => {
        const user = {
            username: 'test',
            firstname: 'test'
        }
    }


}

