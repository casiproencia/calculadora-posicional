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

function mostrarResultado(numStr, decs) {
  if (decs > 0) {
    const p = numStr.length - decs;
    numStr = numStr.slice(0, p) + "," + numStr.slice(p);
  }
  numStr = numStr.replace(/^0+(?!,)/, "");
  resultadoEl.textContent = numStr || "0";
}

/* =========================
   CONTROL
========================= */
function calcular() {
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";

  if (!numA.value || !numB.value) return;

  if (operacion.value === "suma") {
    sumaPasoAPaso(numA.value, numB.value);
  } else if (operacion.value === "resta") {
    restaPasoAPaso(numA.value, numB.value);
  } else {
    pasosEl.innerHTML =
      "<div class='llevada'>Multiplicación y división se activan después.</div>";
  }
}

/* =========================
   SUMA (correcta)
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
    const cifra = s % 10;

    pasos.push(
      `<div class="paso">
        ${x} + ${y}
        ${carry ? `<span class="llevada"> + ${carry}</span>` : ""}
        = <span class="resultado-num">${s}</span>
        → cifra <span class="resultado-num">${cifra}</span>
      </div>`
    );

    res.push(cifra);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`<div class="llevada">Llevada final: ${carry}</div>`);
    res.push(carry);
  }

  mostrarResultado(res.reverse().join(""), decs);
  pasosEl.innerHTML = pasos.join("");
}

/* =========================
   RESTA (DE VERDAD CORRECTA)
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
      let j = i - 1;

      while (A[j] === 0) {
        pasos.push(
          `<div class="llevada">
            El ${A[j]} se convierte en 9 al pedir prestado
          </div>`
        );
        A[j] = 9;
        j--;
      }

      A[j]--;
      A[i] += 10;

      pasos.push(
        `<div class="llevada">
          Pido 1 → ahora ${A[i]} - ${B[i]}
        </div>`
      );
    }

    const r = A[i] - B[i];

    pasos.push(
      `<div class="paso">
        ${A[i]} - ${B[i]} =
        <span class="resultado-num">${r}</span>
      </div>`
    );

    res.unshift(r);
  }

  mostrarResultado(res.join(""), decs);
  pasosEl.innerHTML = pasos.join("");
}