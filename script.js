function getNumero(entero, decimal) {
  if (entero === "" && decimal === "") return 0;
  if (decimal === "") return parseInt(entero);
  return parseFloat(entero + "." + decimal);
}

function calcular() {
  const op = document.getElementById("operacion").value;

  const aE = document.getElementById("aEntero").value || "0";
  const aD = document.getElementById("aDecimal").value || "";
  const bE = document.getElementById("bEntero").value || "0";
  const bD = document.getElementById("bDecimal").value || "";

  const A = getNumero(aE, aD);
  const B = getNumero(bE, bD);

  let resultado = "";
  let resto = "";
  let pasos = "";

  if (op === "suma") {
    resultado = (A + B).toFixed(2);
    pasos = `
      <b>Suma paso a paso</b><br>
      Operamos sin decimales:<br>
      <span class="azul">${aE}${aD}</span> + <span class="azul">${bE}${bD}</span>
      = <span class="verde">${resultado.replace(",", "")}</span><br><br>
      Resultado final: <span class="verde">${resultado.replace(".", ",")}</span>
    `;
  }

  if (op === "resta") {
    resultado = (A - B).toFixed(2);
    pasos = `
      <b>Resta paso a paso</b><br>
      Operamos sin decimales:<br>
      <span class="azul">${aE}${aD}</span> - <span class="azul">${bE}${bD}</span>
      = <span class="verde">${resultado.replace(".", "")}</span><br><br>
      Resultado final: <span class="verde">${resultado.replace(".", ",")}</span>
    `;
  }

  if (op === "multiplicacion") {
    resultado = (A * B).toFixed(2);
    pasos = `
      <b>Multiplicación paso a paso</b><br>
      Multiplicamos sin decimales:<br>
      <span class="azul">${aE}${aD}</span> × <span class="azul">${bE}${bD}</span>
      = <span class="verde">${resultado.replace(".", "")}</span><br><br>
      Resultado final: <span class="verde">${resultado.replace(".", ",")}</span>
    `;
  }

  if (op === "division") {
    const dividendo = parseInt(aE + aD);
    const divisor = parseInt(bE);
    const cociente = Math.floor(dividendo / divisor);
    resto = dividendo % divisor;

    resultado = cociente;

    pasos = `
      <b>División paso a paso</b><br>
      <span class="azul">${dividendo}</span> ÷ <span class="azul">${divisor}</span><br>
      Cociente: <span class="verde">${cociente}</span><br>
      Resto: <span class="rojo">${resto}</span>
    `;
  }

  document.getElementById("resultado").value = resultado.toString().replace(".", ",");
  document.getElementById("resto").value = resto;
  document.getElementById("pasos").innerHTML = pasos;
}