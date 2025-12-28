const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

/* ================= RESET ================= */
function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

/* ================= CALCULAR ================= */
function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  const a = numA.value.replace(",", ".");
  const b = numB.value.replace(",", ".");

  switch (operacion.value) {
    case "suma":
      suma(a, b);
      break;
    case "resta":
      resta(a, b);
      break;
    case "multiplicacion":
      multiplicacion(a, b);
      break;
    case "division":
      division(a, b);
      break;
  }
}

/* ================= SUMA ================= */
function suma(a, b) {
  const [ai, ad = ""] = a.split(".");
  const [bi, bd = ""] = b.split(".");
  const decs = Math.max(ad.length, bd.length);

  const A = (ai + ad.padEnd(decs, "0")).split("").reverse().map(Number);
  const B = (bi + bd.padEnd(decs, "0")).split("").reverse().map(Number);

  let carry = 0;
  let res = [];
  let pasos = [];

  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const x = A[i] ?? 0;
    const y = B[i] ?? 0;
    const s = x + y + carry;
    const cifra = s % 10;

    pasos.push(
      `<span style="color:#00e5ff">${x}</span> + 
       <span style="color:#ffd54f">${y}</span>
       ${carry ? ` + <span style="color:#ff5252">${carry}</span>` : ""}
       = <b>${s}</b> → cifra <span style="color:#00ff7f">${cifra}</span>`
    );

    res.push(cifra);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`Llevada final: <span style="color:#ff5252">${carry}</span>`);
    res.push(carry);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= RESTA ================= */
function resta(a, b) {
  const [ai, ad = ""] = a.split(".");
  const [bi, bd = ""] = b.split(".");
  const decs = Math.max(ad.length, bd.length);

  let A = (ai + ad.padEnd(decs, "0")).split("").map(Number);
  let B = (bi + bd.padEnd(decs, "0")).split("").map(Number);

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
      pasos.push(`<span style="color:#ff5252">Pido 1</span>`);
    }

    const r = A[i] - B[i];
    pasos.push(
      `<span style="color:#00e5ff">${A[i]}</span> − 
       <span style="color:#ffd54f">${B[i]}</span> = 
       <span style="color:#00ff7f">${r}</span>`
    );
    res.unshift(r);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= MULTIPLICACIÓN ================= */
function multiplicacion(a, b) {
  const decA = (a.split(".")[1] || "").length;
  const decB = (b.split(".")[1] || "").length;

  const A = a.replace(".", "");
  const B = b.replace(".", "");

  let carry = 0;
  let res = "";
  let pasos = [];

  for (let i = A.length - 1; i >= 0; i--) {
    const total = Number(A[i]) * Number(B) + carry;
    const cifra = total % 10;

    pasos.push(
      `<span style="color:#00e5ff">${A[i]}</span> × 
       <span style="color:#ffd54f">${B}</span>
       ${carry ? ` + <span style="color:#ff5252">${carry}</span>` : ""}
       = <b>${total}</b> → cifra <span style="color:#00ff7f">${cifra}</span>`
    );

    res = cifra + res;
    carry = Math.floor(total / 10);
  }

  if (carry) {
    pasos.push(`Llevada final: <span style="color:#ff5252">${carry}</span>`);
    res = carry + res;
  }

  colocarComa(res, decA + decB);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= DIVISIÓN ================= */
function division(a, b) {
  const divisor = Number(b);
  const A = a.replace(".", "");
  const decA = (a.split(".")[1] || "").length;

  let resto = 0;
  let cociente = "";
  let pasos = [];

  for (let i = 0; i < A.length; i++) {
    const num = resto * 10 + Number(A[i]);
    const q = Math.floor(num / divisor);
    resto = num - q * divisor;

    pasos.push(
      `<span style="color:#00e5ff">${num}</span> ÷ 
       <span style="color:#ffd54f">${divisor}</span> = 
       <span style="color:#00ff7f">${q}</span><br>
       <span style="color:#ff5252">Resto: ${resto}</span>`
    );

    cociente += q;

    if (i === A.length - decA - 1 && decA > 0) {
      pasos.push(`<b>👉 Aquí colocamos la coma</b>`);
    }
  }

  colocarComa(cociente, decA);
  restoEl.textContent = resto;
  pasosEl.innerHTML = pasos.join("<br>");
}

/* ================= UTILIDADES ================= */
function mostrarResultado(res, decs) {
  let num = res.reverse().join("");
  if (decs > 0) {
    const p = num.length - decs;
    num = num.slice(0, p) + "," + num.slice(p);
  }
  resultadoEl.textContent = num.replace(/^0+/, "") || "0";
}

function colocarComa(num, dec) {
  if (dec === 0) {
    resultadoEl.textContent = num;
    return;
  }
  const p = num.length - dec;
  resultadoEl.textContent = num.slice(0, p) + "," + num.slice(p);
}