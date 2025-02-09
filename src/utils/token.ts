const jwt = require('jsonwebtoken')

const getAccessToken = (user: any) => {
    return jwt.sign(user,process.env.access_token_secret,{expiresIn:"3 day"})
}

module.exports = getAccessToken