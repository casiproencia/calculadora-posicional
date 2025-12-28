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
function mostrarResultado(arr, decs) {
  let s = arr.join("");
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

/* =========================
   CONTROL PRINCIPAL
========================= */
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

    default:
      pasosEl.innerHTML =
        "<div class='llevada'>Multiplicación y división se rehacen después.</div>";
  }
}

/* =========================
   SUMA PASO A PASO
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
    const suma = x + y + carry;
    const cifra = suma % 10;

    pasos.push(
      `<div class="paso">
        ${x} + ${y}
        ${carry ? `<span class="llevada"> + ${carry}</span>` : ""}
        = <span class="resultado-num">${suma}</span>
        → cifra <span class="resultado-num">${cifra}</span>
      </div>`
    );

    res.push(cifra);
    carry = Math.floor(suma / 10);
  }

  if (carry) {
    pasos.push(`<div class="llevada">Llevada final: ${carry}</div>`);
    res.push(carry);
  }

  mostrarResultado(res.reverse(), decs);
  pasosEl.innerHTML = pasos.join("");
}

/* =========================
   RESTA PASO A PASO (CORRECTA)
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
      while (j >= 0 && A[j] === 0) {
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

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("");
}