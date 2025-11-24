const express = require("express");
require("dotenv").config();
const Database = require("./src/config/database");
const indexRoute = require("./src/routes/index.route");

const app = express();
const PORT = process.env.PORT || 5050;
app.use(express.json());


Database.connectDatabase();
indexRoute(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
