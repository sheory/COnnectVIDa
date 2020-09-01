const Message = require('../models/Message');

module.exports = {
    async post(req, res) {
        try {
            const message = req.body;

            await Message.create(message);
            const success = "Sua mensagem foi enviada para a nossa equipe!"

            res.render('contato/contato', { success });
        } catch (error) {
            const success = "Algo deu errado!"
            res.render('contato/contato', { success });
        }
    }
}