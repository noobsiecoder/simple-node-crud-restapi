// Custom module
const { COOKIE } = require("../../../config/config");

/*
 * Class { Cookies } which does the following in/from client side :-
 *  1. Setting cookies
 *  2. Getting cookies
 *  3. Destroying cookies
 */
class Cookies {
  // Class constructor which contains { cookieName } that will be acting as a "secret key"
  constructor() {
    this.cookieName = COOKIE.SECRET_NAME;
  }

  // Function to set cookie to client side
  setCookies(res, cookie) {
    res.cookie(this.cookieName, cookie, {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true, // { httpOnly } is flag to secure our webapp's cookie set. This prevents JavaScript code to access these cookies
      path: "/",
      sameSite: true,
    });
  }

  // Function to get cookie from client side
  getCookies(req) {
    return req.cookies[this.cookieName];
  }

  // Function to destroy cookie in client side
  destroyCookies(res) {
    res.cookie(this.cookieName, "", {
      expires: new Date(0),
    });
  }
}

// Class Object
const cookieObject = new Cookies();
module.exports = cookieObject;
