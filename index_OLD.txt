const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  const now = new Date();
  res.json({
    message: 'hello world',
    datetime: now.toISOString()
  });
});

app.listen(port, () => {
  console.log(`API rodando na porta ${port}`);
});
