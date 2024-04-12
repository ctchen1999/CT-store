const mongoose = require("mongoose");
const { connectDB } = require("./config/db");
const app = require("./app");
require("dotenv").config({ path: "./config/config.env" });

connectDB();

// WEB SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
