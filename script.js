function normalizar(entero, decimal) {
  entero = entero || "0";
  decimal = decimal || "";
  return { entero, decimal };
}

function calcular() {
  const op = document.getElementById("operacion").value;

  const a = normalizar(
    document.getElementById("aEntero").value,
    document.getElementById("aDecimal").value
  );

  const b = normalizar(
    document.getElementById("bEntero").value,
    document.getElementById("bDecimal").value
  );

  let pasos = "";
  let resultado = "";
  let resto = "";

  if (op === "suma" || op === "resta") {
    const decLen = Math.max(a.decimal.length, b.decimal.length);
    const aNum = parseInt(a.entero + a.decimal.padEnd(decLen, "0"));
    const bNum = parseInt(b.entero + b.decimal.padEnd(decLen, "0"));

    const res = op === "suma" ? aNum + bNum : aNum - bNum;
    resultado = (res / Math.pow(10, decLen)).toString().replace(".", ",");

    pasos = `<strong>${op === "suma" ? "Suma" : "Resta"} paso a paso</strong><br>
    Operamos sin decimales:<br>
    <span class="num">${aNum}</span> ${op === "suma" ? "+" : "-"} <span class="num">${bNum}</span> =
    <span class="calc">${res}</span><br><br>
    Resultado final: <span class="calc">${resultado}</span>`;
  }

  if (op === "multiplicacion") {
    const decLen = a.decimal.length + b.decimal.length;
    const aNum = parseInt(a.entero + a.decimal);
    const bNum = parseInt(b.entero + b.decimal);

    const res = aNum * bNum;
    resultado = (res / Math.pow(10, decLen)).toString().replace(".", ",");

    pasos = `<strong>Multiplicación paso a paso</strong><br>
    Multiplicamos sin decimales:<br>
    <span class="num">${aNum}</span> × <span class="num">${bNum}</span> =
    <span class="calc">${res}</span><br><br>
    Resultado final: <span class="calc">${resultado}</span>`;
  }

  if (op === "division") {
    const dividendo = parseInt(a.entero + a.decimal);
    const divisor = parseInt(b.entero || "1");
    resultado = Math.floor(dividendo / divisor);
    resto = dividendo % divisor;

    pasos = `<strong>División paso a paso</strong><br>
    <span class="num">${dividendo}</span> ÷ <span class="num">${divisor}</span><br>
    Cociente: <span class="calc">${resultado}</span><br>
    Resto: <span class="calc">${resto}</span>`;
  }

  document.getElementById("resultado").value = resultado;
  document.getElementById("resto").value = resto;
  document.getElementById("pasos").innerHTML = pasos;
}