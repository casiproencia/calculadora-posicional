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
function parseNumero(valor) {
  return valor.replace(",", ".");
}

function formatear(num, decimales) {
  return num.toFixed(decimales).replace(".", ",");
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

  const a = parseFloat(parseNumero(aStr));
  const b = parseFloat(parseNumero(bStr));

  if (isNaN(a) || isNaN(b)) return;

  switch (operacion.value) {
    case "suma":
      sumaPasoAPaso(aStr, bStr);
      break;
    case "resta":
      restaPasoAPaso(aStr, bStr);
      break;
    case "multiplicacion":
      multiplicacionPasoAPaso(aStr, bStr);
      break;
    case "division":
      divisionPasoAPaso(aStr, bStr);
      break;
  }
}

/* =========================
   SUMA
========================= */
function sumaPasoAPaso(aStr, bStr) {
  const a = parseFloat(parseNumero(aStr));
  const b = parseFloat(parseNumero(bStr));

  const dec = Math.max(
    (aStr.split(",")[1] || "").length,
    (bStr.split(",")[1] || "").length
  );

  const res = a + b;
  resultadoEl.textContent = formatear(res, dec);

  pasosEl.innerHTML =
    `<strong>Suma paso a paso</strong><br>` +
    `${aStr} + ${bStr} = ${formatear(res, dec)}`;
}

/* =========================
   RESTA (CORRECTA)
========================= */
function restaPasoAPaso(aStr, bStr) {
  const a = parseFloat(parseNumero(aStr));
  const b = parseFloat(parseNumero(bStr));

  const dec = Math.max(
    (aStr.split(",")[1] || "").length,
    (bStr.split(",")[1] || "").length
  );

  const res = a - b;
  resultadoEl.textContent = formatear(res, dec);

  pasosEl.innerHTML =
    `<strong>Resta paso a paso</strong><br>` +
    `${aStr} − ${bStr} = ${formatear(res, dec)}`;
}

/* =========================
   MULTIPLICACIÓN (DECIMALES OK)
========================= */
function multiplicacionPasoAPaso(aStr, bStr) {
  const aDec = (aStr.split(",")[1] || "").length;
  const bDec = (bStr.split(",")[1] || "").length;

  const a = parseFloat(parseNumero(aStr));
  const b = parseFloat(parseNumero(bStr));

  const res = a * b;
  const dec = aDec + bDec;

  resultadoEl.textContent = formatear(res, dec);

  pasosEl.innerHTML =
    `<strong>Multiplicación paso a paso</strong><br>` +
    `${aStr} × ${bStr} = ${formatear(res, dec)}`;
}

/* =========================
   DIVISIÓN (COMA CORRECTA)
========================= */
function divisionPasoAPaso(aStr, bStr) {
  const a = parseFloat(parseNumero(aStr));
  const b = parseFloat(parseNumero(bStr));

  if (b === 0) {
    pasosEl.innerHTML = "No se puede dividir entre 0";
    return;
  }

  const dec = 2;
  const res = a / b;
  const resto = a % b;

  resultadoEl.textContent = formatear(res, dec);
  restoEl.textContent = resto.toFixed(0);

  pasosEl.innerHTML =
    `<strong>División paso a paso</strong><br>` +
    `${aStr} ÷ ${bStr} = ${formatear(res, dec)}<br>` +
    `Resto: ${resto.toFixed(0)}`;
}