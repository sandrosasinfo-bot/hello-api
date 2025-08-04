const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

const API_KEY = '7c0625a54e2a4ae770cfc158e3c0e8f0';
const CIDADE = 'Sao Paulo,BR';

// Serve arquivos estáticos da pasta 'public'
app.use(express.static('public'));

app.get('/api/tempo', async (req, res) => {
  try {
    const resposta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CIDADE}&appid=${API_KEY}&units=metric&lang=pt_br`);
    const clima = resposta.data.weather[0].description;
    const temperatura = Math.round(resposta.data.main.temp);
    res.json({ clima, temperatura });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao obter clima', detalhe: erro.message });
  }
});

app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
