const express = require("express");
require("dotenv").config();
const Database = require("./src/config/database");
const indexRoute = require("./src/routes/index.route");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

Database.connectDatabase();
indexRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
