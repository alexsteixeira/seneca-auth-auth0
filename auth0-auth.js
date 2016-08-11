var Auth0Strategy = require('passport-auth0')

module.exports = function(opt) {
    var plugin = new Auth0Strategy({
        domain: opt.domain,
        clientID: opt.clientID,
        clientSecret: opt.clientSecret,
        callbackURL: opt.callbackURL
    }),
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }

    this.act({role: 'auth', cmd: 'register_service', service: 'auth0', plugin: plugin, conf: opt})

    return {
        name: 'auth0-auth'
    }
}
