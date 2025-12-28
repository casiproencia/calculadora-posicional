const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  switch (operacion.value) {
    case "suma":
      suma(numA.value, numB.value);
      break;
    case "resta":
      resta(numA.value, numB.value);
      break;
    case "multiplicacion":
      multiplicacion(numA.value, numB.value);
      break;
    case "division":
      division(numA.value, numB.value);
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
   UTILIDADES
========================= */
function separar(n) {
  const [i, d = ""] = n.replace(".", ",").split(",");
  return { i, d };
}

function formatear(num, decs) {
  if (decs === 0) return num;
  const p = num.length - decs;
  return num.slice(0, p) + "," + num.slice(p);
}

function span(clase, txt) {
  return `<span class="${clase}">${txt}</span>`;
}

/* =========================
   SUMA
========================= */
function suma(a, b) {
  const A = separar(a);
  const B = separar(b);
  const decs = Math.max(A.d.length, B.d.length);

  const x = (A.i + A.d.padEnd(decs, "0")).split("").reverse().map(Number);
  const y = (B.i + B.d.padEnd(decs, "0")).split("").reverse().map(Number);

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < Math.max(x.length, y.length); i++) {
    const s = (x[i] || 0) + (y[i] || 0) + carry;
    pasos.push(
      `${span("numA", x[i] || 0)} + ${span("numB", y[i] || 0)}${carry ? " + " + span("carry", carry) : ""} = ${span("calc", s)} → cifra ${span("res", s % 10)}`
    );
    res.push(s % 10);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`Llevada final: ${span("carry", carry)}`);
    res.push(carry);
  }

  resultadoEl.textContent = formatear(res.reverse().join(""), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   RESTA (CORRECTA)
========================= */
function resta(a, b) {
  const A = separar(a);
  const B = separar(b);
  const decs = Math.max(A.d.length, B.d.length);

  let x = (A.i + A.d.padEnd(decs, "0")).split("").map(Number);
  let y = (B.i + B.d.padEnd(decs, "0")).split("").map(Number);

  while (y.length < x.length) y.unshift(0);

  let pasos = [];
  let res = [];

  for (let i = x.length - 1; i >= 0; i--) {
    if (x[i] < y[i]) {
      let j = i - 1;
      while (x[j] === 0) {
        x[j] = 9;
        j--;
      }
      x[j]--;
      x[i] += 10;
      pasos.push(`${span("borrow", "Pido 1")}`);
    }

    const r = x[i] - y[i];
    pasos.push(
      `${span("numA", x[i])} − ${span("numB", y[i])} = ${span("res", r)}`
    );
    res.unshift(r);
  }

  resultadoEl.textContent = formatear(res.join(""), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   MULTIPLICACIÓN (PASO A PASO REAL)
========================= */
function multiplicacion(a, b) {
  const A = separar(a);
  const B = separar(b);

  const decs = A.d.length + B.d.length;

  const x = (A.i + A.d).split("").reverse().map(Number);
  const y = (B.i + B.d).split("").reverse().map(Number);

  let total = Array(x.length + y.length).fill(0);
  let pasos = [];

  for (let i = 0; i < y.length; i++) {
    let carry = 0;
    for (let j = 0; j < x.length; j++) {
      const p = y[i] * x[j] + total[i + j] + carry;
      pasos.push(
        `${span("numB", y[i])} × ${span("numA", x[j])} + ${span("carry", total[i + j])} = ${span("calc", p)} → cifra ${span("res", p % 10)}`
      );
      total[i + j] = p % 10;
      carry = Math.floor(p / 10);
    }
    if (carry) total[i + x.length] += carry;
  }

  resultadoEl.textContent = formatear(total.reverse().join("").replace(/^0+/, ""), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   DIVISIÓN (CON COMA EXPLICADA)
========================= */
function division(a, b) {
  const A = separar(a);
  const divisor = Number(b.replace(",", "."));
  let resto = 0;
  let cociente = "";
  let pasos = [];

  const num = (A.i + A.d).split("");
  const comaPos = A.i.length;

  for (let i = 0; i < num.length; i++) {
    const actual = resto * 10 + Number(num[i]);
    const q = Math.floor(actual / divisor);
    resto = actual - q * divisor;
    cociente += q;

    pasos.push(
      `${span("calc", actual)} ÷ ${span("numB", divisor)} = ${span("res", q)}<br>${span("resto", "Resto: " + resto)}`
    );

    if (i === comaPos - 1 && A.d.length > 0) {
      pasos.push(span("comma", "Aquí colocamos la coma"));
    }
  }

  resultadoEl.textContent = formatear(cociente, A.d.length);
  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("<br>");
}