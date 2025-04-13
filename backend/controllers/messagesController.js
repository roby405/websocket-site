const Message = require('../models/index').Message

const getMessages = async (req, res) => {
    try {
        const { roomId } = req.params;
        const messages = await Message.findAll({ where: { roomId } });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(501).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getMessages,
};