const User = require('../models/user');

module.exports.getAllUsers = async (req, res) => {
    const users = await User.find();
    res.json({ users: users })
}

module.exports.getUserById = async (req, res) => {
    let userId = req.params.id;
    let user = await User.findOne({ userId });
    res.json({ user : user });
}
