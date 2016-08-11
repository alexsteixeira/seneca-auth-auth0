
var Auth0Strategy = require('passport-auth0');

module.exports = function (options) {

  var seneca = this

  var authPlugin = new Auth0Strategy({
      domain: options.domain,
      clientID:    options.apiKey,
      clientSecret: options.apiSecret,
      callbackURL:    options.urlhost + "/callback"
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
  )

  seneca.act({role: 'auth', cmd: 'register_service', service: 'auth0', plugin: authPlugin, conf: options})

  return {
    name: 'auth0-auth'
  }
}
