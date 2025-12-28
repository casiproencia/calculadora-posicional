const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

/* =========================
   UTILIDADES
========================= */
function normalizar(valor) {
  return valor.replace(",", ".");
}

function decimales(valor) {
  return (valor.split(",")[1] || "").length;
}

function formatear(num, dec) {
  return num.toFixed(dec).replace(".", ",");
}

function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

/* =========================
   CALCULAR
========================= */
function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  const aStr = numA.value;
  const bStr = numB.value;

  const a = parseFloat(normalizar(aStr));
  const b = parseFloat(normalizar(bStr));

  if (isNaN(a) || isNaN(b)) return;

  switch (operacion.value) {
    case "suma":
      suma(aStr, bStr, a, b);
      break;
    case "resta":
      resta(aStr, bStr, a, b);
      break;
    case "multiplicacion":
      multiplicacion(aStr, bStr, a, b);
      break;
    case "division":
      division(aStr, bStr, a, b);
      break;
  }
}

/* =========================
   SUMA
========================= */
function suma(aStr, bStr, a, b) {
  const dec = Math.max(decimales(aStr), decimales(bStr));
  const res = a + b;

  resultadoEl.textContent = formatear(res, dec);

  pasosEl.innerHTML = `
    <strong>Suma paso a paso</strong><br>
    ${aStr} + ${bStr} = ${formatear(res, dec)}
  `;
}

/* =========================
   RESTA
========================= */
function resta(aStr, bStr, a, b) {
  const dec = Math.max(decimales(aStr), decimales(bStr));
  const res = a - b;

  resultadoEl.textContent = formatear(res, dec);

  pasosEl.innerHTML = `
    <strong>Resta paso a paso</strong><br>
    ${aStr} − ${bStr} = ${formatear(res, dec)}
  `;
}

/* =========================
   MULTIPLICACIÓN
========================= */
function multiplicacion(aStr, bStr, a, b) {
  const dec = decimales(aStr) + decimales(bStr);
  const res = a * b;

  resultadoEl.textContent = formatear(res, dec);

  pasosEl.innerHTML = `
    <strong>Multiplicación paso a paso</strong><br>
    ${aStr} × ${bStr} = ${formatear(res, dec)}
  `;
}

/* =========================
   DIVISIÓN
========================= */
function division(aStr, bStr, a, b) {
  if (b === 0) {
    pasosEl.innerHTML = "No se puede dividir entre 0";
    return;
  }

  const res = a / b;
  const resto = a % b;

  resultadoEl.textContent = formatear(res, 2);
  restoEl.textContent = resto.toFixed(0);

  pasosEl.innerHTML = `
    <strong>División paso a paso</strong><br>
    ${aStr} ÷ ${bStr} = ${formatear(res, 2)}<br>
    Resto: ${resto.toFixed(0)}
  `;
}