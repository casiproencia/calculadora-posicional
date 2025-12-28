function calcular() {
  const op = document.getElementById("operacion").value;

  const aE = document.getElementById("aE").value || "0";
  const aD = document.getElementById("aD").value || "";
  const bE = document.getElementById("bE").value || "0";
  const bD = document.getElementById("bD").value || "";

  const A = aE + aD;
  const B = bE + bD;

  const decA = aD.length;
  const decB = bD.length;

  let pasos = "";
  let resultado = "";
  let resto = "";

  if (op === "suma") {
    const res = Number(A) + Number(B);
    const dec = Math.max(decA, decB);
    resultado = (res / Math.pow(10, dec)).toFixed(dec).replace(".", ",");

    pasos = `
      <h3 class="azul">Suma paso a paso</h3>
      <p>Operamos sin decimales:</p>
      <p class="azul">${A} + ${B} = <span class="verde">${res}</span></p>
      <p>Colocamos la coma:</p>
      <p class="verde">Resultado final: ${resultado}</p>
    `;
  }

  if (op === "resta") {
    const res = Number(A) - Number(B);
    const dec = Math.max(decA, decB);
    resultado = (res / Math.pow(10, dec)).toFixed(dec).replace(".", ",");

    pasos = `
      <h3 class="azul">Resta paso a paso</h3>
      <p>Operamos sin decimales:</p>
      <p class="azul">${A} - ${B} = <span class="verde">${res}</span></p>
      <p>Colocamos la coma:</p>
      <p class="verde">Resultado final: ${resultado}</p>
    `;
  }

  if (op === "multiplicacion") {
    const res = Number(A) * Number(B);
    const dec = decA + decB;
    resultado = (res / Math.pow(10, dec)).toFixed(dec).replace(".", ",");

    pasos = `
      <h3 class="azul">Multiplicación paso a paso</h3>
      <p>Multiplicamos sin decimales:</p>
      <p class="azul">${A} × ${B} = <span class="verde">${res}</span></p>
      <p>Colocamos la coma:</p>
      <p class="verde">Resultado final: ${resultado}</p>
    `;
  }

  if (op === "division") {
    const dividendo = Number(A);
    const divisor = Number(bE);

    const cociente = Math.floor(dividendo / divisor);
    resto = dividendo % divisor;
    resultado = cociente.toString();

    pasos = `
      <h3 class="azul">División paso a paso</h3>
      <p class="azul">${dividendo} ÷ ${divisor}</p>
      <p>Cociente: <span class="verde">${cociente}</span></p>
      <p>Resto: <span class="morado">${resto}</span></p>
    `;
  }

  document.getElementById("resultado").value = resultado;
  document.getElementById("resto").value = resto;
  document.getElementById("pasos").innerHTML = pasos;
}