const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

// Configurações
const API_KEY = '7c0625a54e2a4ae770cfc158e3c0e8f0';
const CIDADE = 'Sao Paulo,BR';

app.get('/', async (req, res) => {
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString('pt-BR');

  let tempo = 'Tempo indisponível';

  try {
    const resposta = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${CIDADE}&appid=${API_KEY}&units=metric&lang=pt_br`);
    const clima = resposta.data.weather[0].description;
    const temperatura = Math.round(resposta.data.main.temp);
    tempo = `${clima}, ${temperatura}°C`;
  } catch (erro) {
    tempo = `Erro ao obter tempo: ${erro.message}`;
    console.error('Erro ao obter o tempo:', erro.message);
  }

  res.send(`
    <html>
      <head>
        <title>Painel Tatuapé</title>
        <style>
          body {
            background-color: #87CEEB;
            color: #000;
            font-family: Arial, sans-serif;
            font-weight: bold;
            font-size: 2em;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div>${dataFormatada}</div>
        <div id="hora">Carregando hora...</div>
        <div>Tempo em São Paulo: ${tempo}</div>

        <script>
          function atualizarHora() {
            const agora = new Date();
            const opcoes = { hour: '2-digit', minute: '2-digit', second: '2-digit' };
            document.getElementById('hora').textContent = agora.toLocaleTimeString('pt-BR', opcoes);
          }
          atualizarHora();
          setInterval(atualizarHora, 1000);
        </script>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(\`API rodando em http://localhost:\${port}\`);
});
