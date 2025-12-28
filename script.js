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

function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

function pintarPaso(a, b, r) {
  return `<span style="color:#102a43">${a}</span> − 
          <span style="color:#7a1f1f">${b}</span> = 
          <span style="color:#0b3d0b">${r}</span>`;
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

/* ================= SUMA (OK) ================= */

function suma(a, b) {
  const A = Number(normalizar(a));
  const B = Number(normalizar(b));
  resultadoEl.textContent = (A + B).toString().replace(".", ",");
  pasosEl.innerHTML = "Suma directa correcta.";
}

/* ================= RESTA (REHECHA BIEN) ================= */

function resta(a, b) {
  let A = normalizar(a);
  let B = normalizar(b);

  const decA = (A.split(".")[1] || "").length;
  const decB = (B.split(".")[1] || "").length;
  const decs = Math.max(decA, decB);

  A = A.replace(".", "").padEnd(A.length + (decs - decA), "0");
  B = B.replace(".", "").padEnd(B.length + (decs - decB), "0");

  let arrA = A.split("").map(Number);
  let arrB = B.split("").map(Number);

  while (arrB.length < arrA.length) arrB.unshift(0);

  let pasos = [];
  let res = [];

  for (let i = arrA.length - 1; i >= 0; i--) {
    if (arrA[i] < arrB[i]) {
      let j = i - 1;
      while (arrA[j] === 0) {
        arrA[j] = 9;
        j--;
      }
      arrA[j]--;
      arrA[i] += 10;
      pasos.push(`<span style="color:#7a1f1f">Pido 1</span>`);
    }

    const r = arrA[i] - arrB[i];
    pasos.push(pintarPaso(arrA[i], arrB[i], r));
    res.unshift(r);
  }

  let resultado = res.join("");
  if (decs > 0) {
    const p = resultado.length - decs;
    resultado = resultado.slice(0, p) + "," + resultado.slice(p);
  }

  resultadoEl.textContent = resultado.replace(/^0+(?!,)/, "");
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= MULTIPLICACIÓN ================= */

function multiplicacion(a, b) {
  const A = Number(normalizar(a));
  const B = Number(normalizar(b));
  resultadoEl.textContent = (A * B).toString().replace(".", ",");
  pasosEl.innerHTML = "Multiplicación directa correcta.";
}

/* ================= DIVISIÓN (CON COMA EXPLICADA) ================= */

function division(a, b) {
  const A = normalizar(a);
  const B = Number(normalizar(b));
  if (B === 0) return;

  let resto = 0;
  let cociente = "";
  let pasos = [];

  const partes = A.split(".");
  const enteroLen = partes[0].length;
  const digitos = A.replace(".", "").split("");

  for (let i = 0; i < digitos.length; i++) {
    const n = resto * 10 + Number(digitos[i]);
    const q = Math.floor(n / B);
    resto = n % B;

    pasos.push(
      `<span style="color:#102a43">${n}</span> ÷ 
       <span style="color:#7a1f1f">${B}</span> = 
       <span style="color:#0b3d0b">${q}</span>
       <br><span style="color:#5c1a7a">Resto: ${resto}</span>`
    );

    cociente += q;

    if (i === enteroLen - 1 && partes[1]) {
      pasos.push(`<strong style="color:#5c1a7a">👉 AQUÍ SE PONE LA COMA</strong>`);
    }
  }

  let res = cociente;
  if (partes[1]) {
    const p = enteroLen;
    res = res.slice(0, p) + "," + res.slice(p);
  }

  resultadoEl.textContent = res;
  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("<br>");
}