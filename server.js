const { connectDB, connectTestDB } = require("./config/db");
const app = require("./app");
require("dotenv").config({ path: "./config/config.env" });

// Connect to MongoDB service
connectDB();

// WEB SERVER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`);
});
