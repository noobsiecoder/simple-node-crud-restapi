// Use ".dotenv" from "./app/config" directory
require("dotenv").config({ path: __dirname + "/app/config/.env" });

// npm modules
const http = require("http"),
  mongoose = require("mongoose");

// Custom module
const CONFIG = require("./app/config/config"),
  expressApp = require("./app/routes/routes");

// Sensitive data from config file
const PORT = CONFIG.PORT_NUMBER || 3000,
  dbUserName = CONFIG.DB_USERNAME,
  dbPassword = CONFIG.DB_PASSWORD,
  dbName = CONFIG.DB_NAME;

// MongoDB URI
const mongoDbUri = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.cwp3t.mongodb.net/${dbName}?retryWrites=true&w=majority`;

// Mongoose object is created as a "Promise"
mongoose
  // Connecting MongoDB with { mongoDbUri } along with few middlewares to handle deprecation warning
  .connect(mongoDbUri, {
    useFindAndModify: false,
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // Upon success, create http server at given { hostname } and { PORT }
  .then(() => {
    console.log("Success! Connected database with server, starting server");
    const server = http.createServer(expressApp);
    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  // If any error is caught, display { error }
  .catch((err) => console.log(err));
