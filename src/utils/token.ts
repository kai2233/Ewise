const jwt = require('jsonwebtoken')

const getAccessToken = (user: any) => {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"3 day"})
}

module.exports = getAccessToken