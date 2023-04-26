const Whatsapp = require('./model/whatsapp');
const Arquivo = require('./model/arquivo');
const { Message } = require('twilio/lib/twiml/MessagingResponse');

const interval = 1 * 60 * 1000;
setInterval(() => {
    const fromContact = process.env.WHATSAPP_FROM;
    const whatsappInstance = new Whatsapp();
    const arquivoInstance = new Arquivo();

    const data = arquivoInstance.ler('controller/mensagens.txt');
    data.forEach((message) => {
        if (message !== '') {
             whatsapp.send(JSON.parse(message).mensagem, JSON.parse(message).numero, fromContact);
        }
    });
}, interval);