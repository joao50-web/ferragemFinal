// Selecionar os elementos do DOM
const valorInput = document.getElementById("valor");
const custoInput = document.getElementById("custo");
const percentualText = document.getElementById("percentual");

// Função para calcular o percentual de lucro/prejuízo
function calcularPercentual() {
    // Obter os valores dos campos
    const valor = parseFloat(valorInput.value) || 0;
    const custo = parseFloat(custoInput.value) || 0;

    // Verificar se o custo é 0 para evitar divisão por zero
    if (custo === 0) {
        percentualText.textContent = " (custo = 0)";
        percentualText.style.color = "black";
        return;
    }

    // Calcular o percentual de lucro ou prejuízo
    const percentual = ((valor - custo) / custo) * 100;

    // Atualizar o texto do percentual
    percentualText.textContent = `Percentual: ${percentual.toFixed(2)}%`;

    // Alterar a cor do texto com base no lucro ou prejuízo
    percentualText.style.color = percentual >= 0 ? "green" : "red";
}

// Adicionar eventos para recalcular sempre que o valor ou custo for alterado
valorInput.addEventListener("input", calcularPercentual);
custoInput.addEventListener("input", calcularPercentual);