const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

function limpiarNumero(n) {
  return n.replace(",", ".");
}

function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  const a = limpiarNumero(numA.value);
  const b = limpiarNumero(numB.value);

  switch (operacion.value) {
    case "suma":
      sumaPasoAPaso(a, b);
      break;
    case "resta":
      restaPasoAPaso(a, b);
      break;
    case "multiplicacion":
      multiplicacion(a, b);
      break;
    case "division":
      division(a, b);
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
   SUMA PASO A PASO (CORRECTA)
========================= */
function sumaPasoAPaso(a, b) {
  const [ai, ad = ""] = a.split(".");
  const [bi, bd = ""] = b.split(".");
  const dec = Math.max(ad.length, bd.length);

  const A = (ai + ad.padEnd(dec, "0")).split("").reverse().map(Number);
  const B = (bi + bd.padEnd(dec, "0")).split("").reverse().map(Number);

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const x = A[i] || 0;
    const y = B[i] || 0;
    const s = x + y + carry;

    pasos.push(
      `<span style="color:#111">${x}</span> + 
       <span style="color:#111">${y}</span>
       ${carry ? ` + <span style="color:#c00">${carry}</span>` : ""}
       = <strong>${s}</strong> → cifra <strong>${s % 10}</strong>`
    );

    res.push(s % 10);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`<span style="color:#c00">Llevada final: ${carry}</span>`);
    res.push(carry);
  }

  mostrarResultado(res.reverse().join(""), dec);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   RESTA PASO A PASO (FIX REAL)
========================= */
function restaPasoAPaso(a, b) {
  const [ai, ad = ""] = a.split(".");
  const [bi, bd = ""] = b.split(".");
  const dec = Math.max(ad.length, bd.length);

  let A = (ai + ad.padEnd(dec, "0")).split("").map(Number);
  let B = (bi + bd.padEnd(dec, "0")).split("").map(Number);

  while (B.length < A.length) B.unshift(0);

  let pasos = [];
  let res = [];

  for (let i = A.length - 1; i >= 0; i--) {
    if (A[i] < B[i]) {
      let j = i - 1;
      while (A[j] === 0) {
        A[j] = 9;
        j--;
      }
      A[j]--;
      A[i] += 10;
      pasos.push(`<span style="color:#c00">Pido 1</span>`);
    }

    const r = A[i] - B[i];
    pasos.push(
      `<span style="color:#111">${A[i]}</span> - 
       <span style="color:#111">${B[i]}</span> = 
       <strong>${r}</strong>`
    );
    res.unshift(r);
  }

  mostrarResultado(res.join(""), dec);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   MULTIPLICACIÓN (ESTABLE)
========================= */
function multiplicacion(a, b) {
  const res = Number(a) * Number(b);
  resultadoEl.textContent = res.toLocaleString("es-ES");
  pasosEl.innerHTML = "<strong>Multiplicación directa correcta.</strong>";
}

/* =========================
   DIVISIÓN (ESTABLE + COMA)
========================= */
function division(a, b) {
  const divisor = Number(b);
  if (divisor === 0) {
    pasosEl.innerHTML = "<strong>Error: división por cero</strong>";
    return;
  }

  const res = Number(a) / divisor;
  resultadoEl.textContent = res.toLocaleString("es-ES");
  restoEl.textContent = (Number(a) % divisor).toFixed(0);

  pasosEl.innerHTML =
    "<strong>División directa correcta.</strong><br>" +
    "La coma se coloca al pasar a decimales.";
}

/* =========================
   UTIL
========================= */
function mostrarResultado(num, dec) {
  if (dec === 0) {
    resultadoEl.textContent = Number(num).toString();
  } else {
    const p = num.length - dec;
    resultadoEl.textContent =
      num.slice(0, p) + "," + num.slice(p);
  }
}