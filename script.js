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
  const aTxt = normalizar(numA.value.trim());
  const bTxt = normalizar(numB.value.trim());

  if (!aTxt || !bTxt) return;

  const a = parseFloat(aTxt);
  const b = parseFloat(bTxt);

  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  switch (operacion.value) {
    case "suma":
      sumaPasoAPaso(aTxt, bTxt);
      break;
    case "resta":
      restaPasoAPaso(aTxt, bTxt);
      break;
    case "multiplicacion":
      multiplicacionPasoAPaso(aTxt, bTxt);
      break;
    case "division":
      divisionPasoAPaso(aTxt, bTxt);
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
   SUMA POSICIONAL
========================= */
function sumaPasoAPaso(a, b) {
  const da = a.split(",");
  const db = b.split(",");

  const decA = da[1] || "";
  const decB = db[1] || "";
  const decs = Math.max(decA.length, decB.length);

  const A = (da[0] + decA.padEnd(decs, "0")).split("").reverse();
  const B = (db[0] + decB.padEnd(decs, "0")).split("").reverse();

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const x = parseInt(A[i] || 0);
    const y = parseInt(B[i] || 0);
    const s = x + y + carry;
    res.push(s % 10);
    pasos.push(`${x} + ${y}${carry ? " + " + carry : ""} = ${s} → cifra ${s % 10}`);
    carry = Math.floor(s / 10);
  }
  if (carry) {
    res.push(carry);
    pasos.push(`Llevada final: ${carry}`);
  }

  const resultado =
    res.reverse().join("").slice(0, -decs) +
    (decs ? "," + res.reverse().join("").slice(-decs) : "");

  resultadoEl.textContent = resultado;
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   RESTA POSICIONAL
========================= */
function restaPasoAPaso(a, b) {
  const da = a.split(",");
  const db = b.split(",");

  const decA = da[1] || "";
  const decB = db[1] || "";
  const decs = Math.max(decA.length, decB.length);

  let A = (da[0] + decA.padEnd(decs, "0")).split("").map(Number);
  let B = (db[0] + decB.padEnd(decs, "0")).split("").map(Number);

  while (B.length < A.length) B.unshift(0);

  let pasos = [];
  let res = [];

  for (let i = A.length - 1; i >= 0; i--) {
    if (A[i] < B[i]) {
      A[i] += 10;
      A[i - 1]--;
      pasos.push(`Pido prestado → ${A[i]} - ${B[i]}`);
    }
    const r = A[i] - B[i];
    res.unshift(r);
    pasos.push(`${A[i]} - ${B[i]} = ${r}`);
  }

  const resultado =
    res.join("").slice(0, -decs) +
    (decs ? "," + res.join("").slice(-decs) : "");

  resultadoEl.textContent = resultado;
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   MULTIPLICACIÓN POSICIONAL
========================= */
function multiplicacionPasoAPaso(a, b) {
  if (b.includes(",") || a.includes(",")) {
    pasosEl.innerHTML = "Para el proceso posicional, usa multiplicador entero.";
  }

  const A = a.replace(",", "").split("").reverse().map(Number);
  const m = parseInt(b);
  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < A.length; i++) {
    const p = A[i] * m + carry;
    res.push(p % 10);
    pasos.push(`${A[i]} × ${m} + ${carry} = ${p} → cifra ${p % 10}`);
    carry = Math.floor(p / 10);
  }
  if (carry) pasos.push(`Llevada final: ${carry}`);

  resultadoEl.textContent = (parseFloat(a.replace(",", ".")) * m)
    .toFixed(2)
    .replace(".", ",");

  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   DIVISIÓN POSICIONAL
========================= */
function divisionPasoAPaso(a, b) {
  const divisor = parseInt(b);
  let pasos = [];
  let resto = 0;
  let cociente = "";

  const partes = a.replace(",", "").split("");

  let comaPuesta = false;
  let decimales = 0;

  for (let i = 0; i < partes.length; i++) {
    resto = resto * 10 + parseInt(partes[i]);
    const q = Math.floor(resto / divisor);
    resto = resto % divisor;
    cociente += q;
    pasos.push(`${resto + q * divisor} ÷ ${divisor} = ${q}`);
    pasos.push(`<span style="color:#ff4444">Resto: ${resto}</span>`);
  }

  if (a.includes(",")) {
    cociente =
      cociente.slice(0, a.indexOf(",")) +
      "," +
      cociente.slice(a.indexOf(","));
  }

  resultadoEl.textContent = (parseFloat(a.replace(",", ".")) / divisor)
    .toFixed(2)
    .replace(".", ",");
  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("<br>");
}