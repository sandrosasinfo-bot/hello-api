// Atualiza a hora com segundos
function atualizarHora() {
  const agora = new Date();
  const data = agora.toLocaleDateString('pt-BR');
  const hora = agora.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  document.getElementById('data').textContent = data;
  document.getElementById('hora').textContent = hora;
}
setInterval(atualizarHora, 1000);
atualizarHora();

// Busca o clima da API local
fetch('/api/tempo')
  .then(res => res.json())
  .then(dados => {
    document.getElementById('tempo').textContent = `Tempo no Tatuapé: ${dados.clima}, ${dados.temperatura}°C`;
  })
  .catch(erro => {
    document.getElementById('tempo').textContent = 'Erro ao obter clima';
    console.error(erro);
  });
