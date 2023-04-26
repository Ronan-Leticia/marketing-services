const express = require('express');
const bodyParse = require('body-parser');
const Arquivo = require('../model/arquivo');

const app = express();
app.use(bodyParse.json());

app.post('/mensagens', (req, res) => {
    const {numero, mensagem } = req.body;
    const data = {numero, mensagem, horario : new Date().toISOString()};

    const arquivoInstance = new Arquivo();
    arquivoInstance.salvar('mensagens.txt', data);
    res.send("Mensagem recebida com sucesso");
});

app.get('/mensagens', (req, res) => {
    const arquivoInstance = new Arquivo();
    const data = arquivoInstance.ler('mensagens.txt');
    
    const messages = [];
    data.forEach((message) => {
        if (message !== '') {
          messages.push(JSON.parse(message));
        }
      });
    res.send(messages);
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});