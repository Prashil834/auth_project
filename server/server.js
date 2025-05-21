const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");

const app = express();

dotenv.config();
connectDB();

app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Server is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
