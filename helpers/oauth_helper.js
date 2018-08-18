const http = require("request-promise-native");

module.exports = {
  facebook: (accessToken) => {
    return http({
        json: true,
        url: `https://graph.facebook.com/me?fields=id,name,email&access_token=${accessToken}`
    })
  }
}
