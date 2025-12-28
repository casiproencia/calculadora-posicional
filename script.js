const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  if (operacion.value === "suma") suma(numA.value, numB.value);
  if (operacion.value === "resta") resta(numA.value, numB.value);
  if (operacion.value === "multiplicacion") multiplicacion(numA.value, numB.value);
  if (operacion.value === "division") division(numA.value, numB.value);
}

/* =========================
   UTILIDADES
========================= */
function splitNum(n) {
  const [i, d = ""] = n.replace(".", ",").split(",");
  return { i, d };
}
function span(c, t) {
  return `<span class="${c}">${t}</span>`;
}
function putComma(n, d) {
  if (d === 0) return n;
  return n.slice(0, n.length - d) + "," + n.slice(n.length - d);
}

/* =========================
   SUMA
========================= */
function suma(a, b) {
  const A = splitNum(a);
  const B = splitNum(b);
  const decs = Math.max(A.d.length, B.d.length);

  const x = (A.i + A.d.padEnd(decs, "0")).split("").reverse().map(Number);
  const y = (B.i + B.d.padEnd(decs, "0")).split("").reverse().map(Number);

  let carry = 0, res = [], pasos = [];

  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const s = (x[i] || 0) + (y[i] || 0) + carry;
    pasos.push(
      `${span("a", x[i] || 0)} + ${span("b", y[i] || 0)}${carry ? " + " + span("carry", carry) : ""} = ${span("calc", s)} → ${span("res", s % 10)}`
    );
    res.push(s % 10);
    carry = Math.floor(s / 10);
  }
  if (carry) res.push(carry);

  resultadoEl.textContent = putComma(res.reverse().join(""), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   RESTA (CORRECTA)
========================= */
function resta(a, b) {
  const A = splitNum(a);
  const B = splitNum(b);
  const decs = Math.max(A.d.length, B.d.length);

  let x = (A.i + A.d.padEnd(decs, "0")).split("").map(Number);
  let y = (B.i + B.d.padEnd(decs, "0")).split("").map(Number);

  while (y.length < x.length) y.unshift(0);

  let pasos = [], res = [];

  for (let i = x.length - 1; i >= 0; i--) {
    if (x[i] < y[i]) {
      let j = i - 1;
      while (x[j] === 0) {
        x[j] = 9;
        j--;
      }
      x[j]--;
      x[i] += 10;
      pasos.push(span("borrow", "Pido 1"));
    }
    const r = x[i] - y[i];
    pasos.push(`${span("a", x[i])} − ${span("b", y[i])} = ${span("res", r)}`);
    res.unshift(r);
  }

  resultadoEl.textContent = putComma(res.join(""), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   MULTIPLICACIÓN (PASO A PASO REAL)
========================= */
function multiplicacion(a, b) {
  const A = splitNum(a);
  const B = splitNum(b);

  const decs = A.d.length + B.d.length;
  const x = (A.i + A.d).split("").reverse().map(Number);
  const y = (B.i + B.d).split("").reverse().map(Number);

  let total = Array(x.length + y.length).fill(0);
  let pasos = [];

  for (let i = 0; i < y.length; i++) {
    let carry = 0;
    for (let j = 0; j < x.length; j++) {
      const t = y[i] * x[j] + total[i + j] + carry;
      pasos.push(
        `${span("b", y[i])} × ${span("a", x[j])} + ${span("carry", total[i + j])} = ${span("calc", t)} → ${span("res", t % 10)}`
      );
      total[i + j] = t % 10;
      carry = Math.floor(t / 10);
    }
    if (carry) total[i + x.length] += carry;
  }

  resultadoEl.textContent = putComma(total.reverse().join("").replace(/^0+/, ""), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   DIVISIÓN (CON COMA EXPLICADA)
========================= */
function division(a, b) {
  const A = splitNum(a);
  const divisor = Number(b.replace(",", "."));
  let resto = 0, cociente = "", pasos = [];

  const num = (A.i + A.d).split("");
  const comaPos = A.i.length;

  for (let i = 0; i < num.length; i++) {
    const actual = resto * 10 + Number(num[i]);
    const q = Math.floor(actual / divisor);
    resto = actual - q * divisor;
    cociente += q;

    pasos.push(
      `${span("calc", actual)} ÷ ${span("b", divisor)} = ${span("res", q)}<br>${span("resto", "Resto: " + resto)}`
    );

    if (i === comaPos - 1 && A.d.length > 0) {
      pasos.push(span("comma", "Aquí se coloca la coma"));
    }
  }

  resultadoEl.textContent = putComma(cociente, A.d.length);
  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("<br>");
}