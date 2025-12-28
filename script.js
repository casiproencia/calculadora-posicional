document.getElementById("btnCalcular").addEventListener("click", calcular);

function calcular() {
  const op = document.getElementById("operacion").value;

  const aE = document.getElementById("aEntero").value || "0";
  const aD = document.getElementById("aDecimal").value || "";
  const bE = document.getElementById("bEntero").value || "0";
  const bD = document.getElementById("bDecimal").value || "";

  const A = aE + aD;
  const B = bE + bD;

  let pasos = "";
  let resultado = "";
  let resto = "";

  if (op === "suma") {
    resultado = Number(aE + "." + aD) + Number(bE + "." + bD);
    pasos = `<h3>Suma paso a paso</h3>
      <div><span class="azul">${aE}.${aD}</span> + <span class="azul">${bE}.${bD}</span></div>
      <div class="verde">Resultado: ${resultado}</div>`;
  }

  if (op === "resta") {
    resultado = Number(aE + "." + aD) - Number(bE + "." + bD);
    pasos = `<h3>Resta paso a paso</h3>
      <div><span class="azul">${aE}.${aD}</span> - <span class="azul">${bE}.${bD}</span></div>
      <div class="verde">Resultado: ${resultado}</div>`;
  }

  if (op === "multiplicacion") {
    resultado = Number(aE + "." + aD) * Number(bE + "." + bD);
    pasos = `<h3>Multiplicación paso a paso</h3>
      <div><span class="azul">${aE}.${aD}</span> × <span class="azul">${bE}.${bD}</span></div>
      <div class="verde">Resultado: ${resultado}</div>`;
  }

  if (op === "division") {
    resultado = Math.floor(Number(aE) / Number(bE));
    resto = Number(aE) % Number(bE);
    pasos = `<h3>División paso a paso</h3>
      <div><span class="azul">${aE}</span> ÷ <span class="azul">${bE}</span></div>
      <div>Cociente: <span class="verde">${resultado}</span></div>
      <div>Resto: <span class="rojo">${resto}</span></div>`;
  }

  document.getElementById("resultado").value = resultado;
  document.getElementById("resto").value = resto;
  document.getElementById("pasos").innerHTML = pasos;
}