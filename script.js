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

/* ===================== SUMA ===================== */
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

    pasos.push(
      `<div class="paso">
        ${x} + ${y}
        ${carry ? `<span class="llevada"> + ${carry}</span>` : ""}
        = <span class="resultado-num">${s}</span>
        → cifra <span class="resultado-num">${s % 10}</span>
      </div>`
    );

    res.push(s % 10);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`<div class="llevada">Llevada final: ${carry}</div>`);
    res.push(carry);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("");
}

/* ===================== RESTA ===================== */
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
      pasos.push(`<div class="llevada">Pido 1</div>`);
    }

    const r = A[i] - B[i];

    pasos.push(
      `<div class="paso">
        ${A[i]} - ${B[i]} = <span class="resultado-num">${r}</span>
      </div>`
    );

    res.unshift(r);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("");
}

/* ===================== MULTIPLICACIÓN ===================== */
function multiplicacionPasoAPaso(a, b) {
  const decA = (a.split(",")[1] || "").length;
  const decB = (b.split(",")[1] || "").length;
  const totalDec = decA + decB;

  const A = a.replace(",", "").split("").reverse().map(Number);
  const B = parseInt(b.replace(",", ""), 10);

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < A.length; i++) {
    const t = A[i] * B + carry;
    pasos.push(
      `<div class="paso">
        ${A[i]} × ${B}
        ${carry ? `<span class="llevada"> + ${carry}</span>` : ""}
        = <span class="resultado-num">${t}</span>
        → cifra <span class="resultado-num">${t % 10}</span>
      </div>`
    );
    res.push(t % 10);
    carry = Math.floor(t / 10);
  }

  if (carry) {
    pasos.push(`<div class="llevada">Llevada final: ${carry}</div>`);
    res.push(carry);
  }

  mostrarResultado(res, totalDec);
  pasosEl.innerHTML = pasos.join("");
}

/* ===================== DIVISIÓN ===================== */
function divisionPasoAPaso(a, b) {
  const divisor = parseInt(b.replace(",", ""), 10);
  const [ent, dec = ""] = a.split(",");
  const cifras = (ent + dec).split("");

  let resto = 0;
  let cociente = "";
  let pasos = [];

  for (let i = 0; i < cifras.length; i++) {
    const n = resto * 10 + Number(cifras[i]);
    const q = Math.floor(n / divisor);
    resto = n % divisor;

    pasos.push(
      `<div class="paso">
        ${n} ÷ ${divisor} =
        <span class="resultado-num">${q}</span><br>
        <span class="llevada">Resto: ${resto}</span>
      </div>`
    );

    cociente += q;

    if (i === ent.length - 1 && dec.length > 0) {
      pasos.push(
        `<div class="llevada">👉 Aquí colocamos la coma en el cociente</div>`
      );
    }
  }

  resultadoEl.textContent =
    (parseFloat(normalizar(a)) / parseFloat(normalizar(b)))
      .toFixed(2)
      .replace(".", ",");

  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("");
}

/* ===================== RESULTADO ===================== */
function mostrarResultado(res, decs) {
  const texto = res.reverse().join("");
  if (decs === 0) {
    resultadoEl.textContent = texto.replace(/^0+/, "") || "0";
  } else {
    const p = texto.length - decs;
    resultadoEl.textContent =
      texto.slice(0, p) + "," + texto.slice(p);
  }
}