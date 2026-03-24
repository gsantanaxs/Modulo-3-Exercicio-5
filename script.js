const startBtn = document.getElementById("start-btn");
const report = document.getElementById("report");

startBtn.addEventListener("click", () => {
  report.classList.add("hidden");
  report.textContent = "";

  const nome = prompt("Digite seu nome, cavaleiro(a) de Athena:");
  if (!nome || !nome.trim()) {
    alert("Nome inválido. Recarregue e tente novamente.");
    return;
  }

  let cosmoAtual = +prompt("Informe o Cosmo Inicial (número):", "400");
  if (Number.isNaN(cosmoAtual) || cosmoAtual <= 0) {
    alert("Cosmo inicial inválido. Recarregue e tente novamente.");
    return;
  }

  const sacrificar = confirm("Você deseja sacrificar o sentido para dobrar o cosmo inicial?");
  if (sacrificar) {
    cosmoAtual *= 2;
  }

  let statusVida = "Vivo";
  const casas = [120, 110, 95, 130, 105, 125, 100, 140, 115, 135, 98, 112];
  const log = [];

  casas.forEach((dano, index) => {
    if (statusVida === "Morto") return;

    cosmoAtual -= dano;
    if (cosmoAtual < 0) cosmoAtual = 0;
    log.push(`Casa ${index + 1}: -${dano} de cosmo. Restante: ${cosmoAtual}`);

    if (cosmoAtual <= 0) {
      statusVida = "Morto";
      log.push(`Você morreu na Casa ${index + 1}.`);
    }
  });

  const venceu = cosmoAtual >= 1000 && statusVida === "Vivo";
  let mensagem;

  if (venceu) {
    mensagem = `Parabéns, ${nome}, você salvou Athena com ${cosmoAtual} de cosmo restante!`;
  } else {
    mensagem = `Infelizmente, ${nome}, você não conseguiu salvar Athena. Status: ${statusVida}. Cosmo final: ${cosmoAtual}.`;
  }

  report.textContent = `Resultado da Batalha:\n${mensagem}\n\nDetalhes das casas:\n${log.join("\n")}`;
  report.classList.remove("hidden");
  alert(mensagem);
});
