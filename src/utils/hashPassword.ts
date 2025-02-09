const myCrypto = require("crypto");

const generateSalt = () => {
    return myCrypto.randomBytes(16).toString("base64");
}

const encryptPassword = (password:string, salt:string) => {
    return myCrypto
       .createHash("RSA-SHA256")
       .update(password)
       .update(salt)
       .digest("hex");
 }

 const validatePassword = (targetPassword: string, salt: string, hashedPassword: string) => {
    return encryptPassword(targetPassword, salt) === hashedPassword;
};

module.exports = {generateSalt, encryptPassword, validatePassword}