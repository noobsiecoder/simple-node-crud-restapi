// npm module
const jwt = require("jsonwebtoken");

// Custom module
const { AUTH_KEY } = require("../../../config/config");

/*
 * Class { JSONWebToken } which does the following in server side :-
 *  1. Issue JWT
 *  2. Verify existing JWT whether it's valid
 */
class JSONWebToken {
  // Class constructor which contains { privateKey } that will be acting as a "secret key"
  constructor() {
    this.privateKey = AUTH_KEY.SECRET_KEY;
  }

  // Function to issue JWT with expiration time and it follows "HS256" type of encryption
  issueToken({ _id }) {
    return jwt.sign({ id: _id }, this.privateKey, {
      algorithm: "HS256",
      expiresIn: 60 * 60, // 1 hour
    });
  }

  // Function to verify whether { token } is a valid JWT
  verifyToken(token) {
    try {
      return jwt.verify(token, this.privateKey);
    } catch (e) {
      return "Invalid Signature";
    }
  }
}

// Class object
const jwtObject = new JSONWebToken();
module.exports = jwtObject;
