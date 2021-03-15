// npm modules
const bcrypt = require("bcrypt");

// Class { EncryptDecryptPassword } to hash incoming password or compare password with hashed password
class EncryptDecryptPassword {
  // Asynchronous function to hash { password } with auto generated { salt }
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(); // Generate random { salt }
    const hashedPassword = await bcrypt.hash(password, salt); // Hash { password } along with { salt }
    return hashedPassword;
  }

  // Function to compare { password } with { hashedPassword } existing in the database
  comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }
}

// Class object
const HashPassword = new EncryptDecryptPassword();
module.exports = HashPassword;
