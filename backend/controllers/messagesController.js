const Message = require('../models/index').Message
const User = require('../models/index').User

const getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await Message.findAll({ where: { roomId } });
        const userIds = [...new Set(messages.map((msg) => msg.authorId))];
        const users = await User.findAll({
            where: {
                id: userIds
            },
            attributes: ["id", "username", "usernameColor"]
        });
        const userMap = users.reduce((map, user) => {
            console.log(user);
            map[user.id] = {
                username: user.username,
                usernameColor: user.usernameColor
            };
            return map;
        }, {});
        res.json({ messages, users: userMap });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(501).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMessages,
};