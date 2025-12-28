function calcular() {
  const op = document.getElementById("operacion").value;

  let aE = document.getElementById("aE").value || "0";
  let aD = document.getElementById("aD").value || "";
  let bE = document.getElementById("bE").value || "0";
  let bD = document.getElementById("bD").value || "";

  // 1️⃣ Igualamos decimales
  const maxDec = Math.max(aD.length, bD.length);
  aD = aD.padEnd(maxDec, "0");
  bD = bD.padEnd(maxDec, "0");

  // 2️⃣ Construimos números SIN coma
  const A = aE + aD;
  const B = bE + bD;

  let pasos = "";
  let resultado = "";
  let resto = "";

  // 🔵 SUMA
  if (op === "suma") {
    const res = Number(A) + Number(B);
    resultado = (res / Math.pow(10, maxDec))
      .toFixed(maxDec)
      .replace(".", ",");

    pasos = `
      <h3 class="azul">Suma paso a paso</h3>
      <p>Igualamos decimales:</p>
      <p class="azul">${aE},${aD} + ${bE},${bD}</p>
      <p>Operamos sin coma:</p>
      <p class="azul">${A} + ${B} = <span class="verde">${res}</span></p>
      <p>Colocamos la coma:</p>
      <p class="verde">Resultado final: ${resultado}</p>
    `;
  }

  // 🔵 RESTA
  if (op === "resta") {
    const res = Number(A) - Number(B);
    resultado = (res / Math.pow(10, maxDec))
      .toFixed(maxDec)
      .replace(".", ",");

    pasos = `
      <h3 class="azul">Resta paso a paso</h3>
      <p>Igualamos decimales:</p>
      <p class="azul">${aE},${aD} − ${bE},${bD}</p>
      <p>Operamos sin coma:</p>
      <p class="azul">${A} − ${B} = <span class="verde">${res}</span></p>
      <p>Colocamos la coma:</p>
      <p class="verde">Resultado final: ${resultado}</p>
    `;
  }

  // 🔵 MULTIPLICACIÓN
  if (op === "multiplicacion") {
    const res = Number(A) * Number(B);
    const totalDec = aD.length + bD.length;

    resultado = (res / Math.pow(10, totalDec))
      .toFixed(totalDec)
      .replace(".", ",");

    pasos = `
      <h3 class="azul">Multiplicación paso a paso</h3>
      <p>Quitamos decimales:</p>
      <p class="azul">${A} × ${B} = <span class="verde">${res}</span></p>
      <p>Decimales totales: ${totalDec}</p>
      <p class="verde">Resultado final: ${resultado}</p>
    `;
  }

  // 🔵 DIVISIÓN (entera con resto)
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