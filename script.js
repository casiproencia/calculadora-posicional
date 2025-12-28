const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

function normalizar(n) {
  return n.replace(",", ".");
}

function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  switch (operacion.value) {
    case "suma":
      sumaPasoAPaso(numA.value, numB.value);
      break;
    case "resta":
      restaPasoAPaso(numA.value, numB.value);
      break;
    case "multiplicacion":
      multiplicacionPasoAPaso(numA.value, numB.value);
      break;
    case "division":
      divisionPasoAPaso(numA.value, numB.value);
      break;
  }
}

function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

/* =========================
   SUMA
========================= */
function sumaPasoAPaso(a, b) {
  const [ai, ad = ""] = a.split(",");
  const [bi, bd = ""] = b.split(",");
  const decs = Math.max(ad.length, bd.length);

  const A = (ai + ad.padEnd(decs, "0")).split("").reverse().map(Number);
  const B = (bi + bd.padEnd(decs, "0")).split("").reverse().map(Number);

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const x = A[i] || 0;
    const y = B[i] || 0;
    const s = x + y + carry;
    pasos.push(`${x} + ${y}${carry ? " + " + carry : ""} = ${s} → cifra ${s % 10}`);
    res.push(s % 10);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`Llevada final: ${carry}`);
    res.push(carry);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   RESTA
========================= */
function restaPasoAPaso(a, b) {
  const [ai, ad = ""] = a.split(",");
  const [bi, bd = ""] = b.split(",");
  const decs = Math.max(ad.length, bd.length);

  let A = (ai + ad.padEnd(decs, "0")).split("").map(Number);
  let B = (bi + bd.padEnd(decs, "0")).split("").map(Number);

  while (B.length < A.length) B.unshift(0);

  let pasos = [];
  let res = [];

  for (let i = A.length - 1; i >= 0; i--) {
    if (A[i] < B[i]) {
      A[i] += 10;
      A[i - 1]--;
      pasos.push(`Pido 1 → ${A[i]} - ${B[i]}`);
    }
    const r = A[i] - B[i];
    pasos.push(`${A[i]} - ${B[i]} = ${r}`);
    res.unshift(r);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   MULTIPLICACIÓN
========================= */
function multiplicacionPasoAPaso(a, b) {
  const m = parseInt(b, 10);
  const A = a.replace(",", "").split("").reverse().map(Number);

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < A.length; i++) {
    const p = A[i] * m + carry;
    pasos.push(`${A[i]} × ${m} + ${carry} = ${p} → cifra ${p % 10}`);
    res.push(p % 10);
    carry = Math.floor(p / 10);
  }

  if (carry) {
    pasos.push(`Llevada final: ${carry}`);
    res.push(carry);
  }

  resultadoEl.textContent =
    (parseFloat(normalizar(a)) * m).toFixed(2).replace(".", ",");

  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   DIVISIÓN (con coma)
========================= */
function divisionPasoAPaso(a, b) {
  const divisor = parseInt(b, 10);
  const partes = a.split(",");
  let cifras = partes[0].split("");
  let decimales = partes[1] || "";

  let resto = 0;
  let cociente = "";
  let pasos = [];
  let comaPuesta = false;

  for (let i = 0; i < cifras.length; i++) {
    resto = resto * 10 + parseInt(cifras[i]);
    const q = Math.floor(resto / divisor);
    pasos.push(`${resto} ÷ ${divisor} = ${q}`);
    resto = resto % divisor;
    pasos.push(`<span style="color:#dc2626">Resto: ${resto}</span>`);
    cociente += q;
  }

  if (decimales.length > 0) {
    pasos.push(`<strong>👉 Aquí colocamos la coma en el cociente</strong>`);
    cociente += ",";
    comaPuesta = true;
  }

  for (let i = 0; i < decimales.length; i++) {
    resto = resto * 10 + parseInt(decimales[i]);
    const q = Math.floor(resto / divisor);
    pasos.push(`${resto} ÷ ${divisor} = ${q}`);
    resto = resto % divisor;
    pasos.push(`<span style="color:#dc2626">Resto: ${resto}</span>`);
    cociente += q;
  }

  resultadoEl.textContent =
    (parseFloat(normalizar(a)) / divisor).toFixed(2).replace(".", ",");
  restoEl.textContent = resto;

  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   FORMATO RESULTADO
========================= */
function mostrarResultado(resArray, decs) {
  const texto = resArray.reverse().join("");
  const r =
    texto.slice(0, texto.length - decs) +
    (decs ? "," + texto.slice(-decs) : "");
  resultadoEl.textContent = r;
}