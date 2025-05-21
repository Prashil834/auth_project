const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const router = express.Router();
const validateSignup = require("../middleware/validateSignup");

router.post("/signup", validateSignup, async (req, res, next) => {
    const { name, email, password } = req.validatedBody;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all required fields" });
    }
    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        user = new User({
            name,
            email,
            password: hashPassword,
        });

        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server Error" });
    }
});
router.post("/signin", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Please enter all required fields" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const verifyPassword = await bcrypt.compare(password, user.password);
        if (!verifyPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const payload = {
            user: {
                id: user.id,
            },
        };
        jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "99h" }, (err, token) => {
            if (err) throw err;
            return res.json({ token });
        });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server Error" });
    }
});

router.get("/users", authMiddleware, async (req, res, next) => {
    try {
        const users = await User.find({}, "name email");
        res.json(users);
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ message: "Server Error" });
    }
});
module.exports = router;
