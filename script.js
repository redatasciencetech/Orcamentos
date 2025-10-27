document.getElementById("addItem").addEventListener("click", () => {
  const tbody = document.getElementById("itens");
  const linha = document.createElement("tr");
  linha.innerHTML = `
    <td><input type="number" value="1" class="qtd" /></td>
    <td><input type="text" class="desc" placeholder="Descrição" /></td>
    <td><input type="number" class="valor" step="0.01" /></td>
    <td class="total">R$ 0,00</td>
  `;
  tbody.appendChild(linha);
});

document.addEventListener("input", (e) => {
  if (e.target.classList.contains("qtd") || e.target.classList.contains("valor")) {
    atualizarTotais();
  }
});

function atualizarTotais() {
  let totalGeral = 0;
  document.querySelectorAll("#itens tr").forEach(tr => {
    const qtd = parseFloat(tr.querySelector(".qtd").value) || 0;
    const valor = parseFloat(tr.querySelector(".valor").value) || 0;
    const total = qtd * valor;
    tr.querySelector(".total").innerText = `R$ ${total.toFixed(2)}`;
    totalGeral += total;
  });
  document.getElementById("totalGeral").innerText = `R$ ${totalGeral.toFixed(2)}`;
}

// Gerar PDF
document.getElementById("gerarPDF").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const canvas = await html2canvas(document.querySelector("#orcamento"));
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF();
  const width = pdf.internal.pageSize.getWidth();
  const height = (canvas.height * width) / canvas.width;
  pdf.addImage(imgData, "PNG", 0, 0, width, height);
  pdf.save("orcamento.pdf");
});

// Gerar imagem
document.getElementById("gerarIMG").addEventListener("click", async () => {
  const canvas = await html2canvas(document.querySelector("#orcamento"));
  const link = document.createElement("a");
  link.download = "orcamento.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
});
