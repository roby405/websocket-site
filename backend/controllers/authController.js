const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/index").User;

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ error: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        const token = jwt.sign({ id: newUser.id }, "verysecretstring", {
            expiresIn: "1h",
        });

        res.status(200).json({
            id: newUser.id,
            username: username,
            email: email,
            token: token,
        });
    } catch (error) {
        console.error("Error signing up:", error)
        res.status(500).json({ error: "Backend Error" })
    }
};

const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ error: "Incorrect credentials" });
        }
        const token = jwt.sign({ id: user.id }, "verysecretstring", {
            expiresIn: "1h",
        });

        res.status(200).json({
            id: user.id,
            username: user.username,
            email: email,
            token: token,
        });
    } catch (error) {
        console.error("Error signing up:", error)
        res.status(500).json({ error: "Backend Error" })
    }
};

const whoami = async (req, res) => {
    const id = req.user.id;

    const user = await User.findOne({ where: { id } });
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
        id: user.id,
        username: user.username,
        email: user.email,
        usernameColor: user.usernameColor,
        profilePicture: user.profilePicture,
        onlineStatus: user.status,
    });
}

const updateprofile = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const updated = req.body;
        
        // Check if username is being changed
        if (updated.username && updated.username !== user.username) {
            // Check if new username already exists
            const existingUser = await User.findOne({ 
                where: { username: updated.username } 
            });
            
            if (existingUser) {
                return res.status(409).json({ 
                    error: "Username already exists" 
                });
            }
        }

        await User.update(updated, { where: { id }});
        return res.status(200).json({ message: "Profile updated successfully" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}

// const updateProfilePicture = async (req, res) => {

// }

module.exports = {
    signup,
    signin,
    whoami,
    updateprofile,
}