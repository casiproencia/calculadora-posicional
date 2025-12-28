const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

/* ================= UTILIDADES ================= */

function normalizar(n) {
  return n.replace(",", ".");
}

function mostrarResultado(resArray, decs) {
  let s = resArray.join("");
  if (decs > 0) {
    const p = s.length - decs;
    s = s.slice(0, p) + "," + s.slice(p);
  }
  s = s.replace(/^0+(?!,)/, "");
  resultadoEl.textContent = s || "0";
}

function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

/* ================= CONTROL ================= */

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

/* ================= SUMA ================= */

function suma(a, b) {
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
      `<span style="color:#0d47a1">${x}</span> + 
       <span style="color:#1b5e20">${y}</span>
       ${carry ? ` + <span style="color:#b71c1c">${carry}</span>` : ""} 
       = <span style="color:#263238">${s}</span>`
    );

    res.push(s % 10);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    res.push(carry);
    pasos.push(`<span style="color:#b71c1c">Llevada final: ${carry}</span>`);
  }

  mostrarResultado(res.reverse(), decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= RESTA (ARREGLADA) ================= */

function resta(a, b) {
  const [ai, ad = ""] = a.split(",");
  const [bi, bd = ""] = b.split(",");
  const decs = Math.max(ad.length, bd.length);

  let A = (ai + ad.padEnd(decs, "0")).split("").map(Number);
  let B = (bi + bd.padEnd(decs, "0")).split("").map(Number);

  while (B.length < A.length) B.unshift(0);

  let res = [];
  let pasos = [];

  for (let i = A.length - 1; i >= 0; i--) {
    let x = A[i];
    let y = B[i];

    if (x < y) {
      let j = i - 1;
      while (A[j] === 0) {
        A[j] = 9;
        j--;
      }
      A[j]--;
      x += 10;

      pasos.push(`<span style="color:#b71c1c">Pido 1</span>`);
    }

    const r = x - y;

    pasos.push(
      `<span style="color:#0d47a1">${x}</span> − 
       <span style="color:#1b5e20">${y}</span> = 
       <span style="color:#263238">${r}</span>`
    );

    res.unshift(r);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= MULTIPLICACIÓN ================= */

function multiplicacion(a, b) {
  const A = normalizar(a);
  const B = normalizar(b);

  const decA = (A.split(".")[1] || "").length;
  const decB = (B.split(".")[1] || "").length;

  const nA = A.replace(".", "");
  const nB = Number(B.replace(".", ""));

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = nA.length - 1; i >= 0; i--) {
    const x = Number(nA[i]);
    const t = x * nB + carry;
    const d = t % 10;

    pasos.push(
      `<span style="color:#0d47a1">${x}</span> × 
       <span style="color:#1b5e20">${nB}</span>
       ${carry ? ` + <span style="color:#b71c1c">${carry}</span>` : ""} 
       = <span style="color:#263238">${t}</span>`
    );

    res.unshift(d);
    carry = Math.floor(t / 10);
  }

  if (carry) {
    res.unshift(carry);
    pasos.push(`<span style="color:#b71c1c">Llevada final: ${carry}</span>`);
  }

  mostrarResultado(res, decA + decB);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= DIVISIÓN ================= */

function division(a, b) {
  const A = normalizar(a);
  const B = Number(normalizar(b));
  if (B === 0) return;

  let resto = 0;
  let cociente = "";
  let pasos = [];

  const partes = A.split(".");
  const enteroLen = partes[0].length;
  const digits = A.replace(".", "").split("");

  for (let i = 0; i < digits.length; i++) {
    const n = resto * 10 + Number(digits[i]);
    const q = Math.floor(n / B);
    resto = n % B;
    cociente += q;

    pasos.push(
      `<span style="color:#263238">${n}</span> ÷ 
       <span style="color:#1b5e20">${B}</span> = 
       <span style="color:#0d47a1">${q}</span><br>
       <span style="color:#b71c1c">Resto: ${resto}</span>`
    );

    if (i === enteroLen - 1 && partes[1]) {
      pasos.push(`<span style="color:#6a1b9a">← coma decimal</span>`);
    }
  }

  const decs = partes[1] ? partes[1].length : 0;
  mostrarResultado(cociente.split(""), decs);
  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("<br>");
}