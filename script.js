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

function resetear() {
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

/* =========================
   SUMA
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
    pasos.push(`${x} + ${y}${carry ? " + " + carry : ""} = ${s} → cifra ${s % 10}`);
    res.push(s % 10);
    carry = Math.floor(s / 10);
  }

  if (carry) {
    pasos.push(`Llevada final: ${carry}`);
    res.push(carry);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}

/* =========================
   RESTA
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
      A[i] += 10;
      A[i - 1]--;
      pasos.push(`Pido 1 → ${A[i]} - ${B[i]}`);
    }
    const r = A[i] - B[i];
    pasos.push(`${A[i]} - ${B[i]} = ${r}`);
    res.unshift(r);
  }

  mostrarResultado(res, decs);
  pasosEl.innerHTML = pasos.join("<br>");
}


    /* ================= MULTIPLICACIÓN ================= */
    if (op === "MULTIPLICACIÓN") {

        const multiplicador = Number(rawB);
        const enteroA = A.split("").map(Number);

        let carry = 0;
        let res = "";

        proceso.innerHTML = "<strong>Multiplicación paso a paso</strong><br><br>";

        for (let i = enteroA.length - 1; i >= 0; i--) {

            const total = enteroA[i] * multiplicador + carry;
            const dig = Math.floor(total % 10);

            proceso.innerHTML += `
                <div class="paso">
                    ${enteroA[i]} × ${multiplicador}
                    ${carry ? `<span class="llevada"> + ${carry}</span>` : ""}
                    = <span class="resultado-num">${total}</span>
                    → cifra <span class="resultado-num">${dig}</span>
                </div>
            `;

            carry = Math.floor(total / 10);
            res = dig + res;
        }

        if (carry) {
            proceso.innerHTML += `<div class="llevada">Llevada final: ${carry}</div>`;
            res = carry + res;
        }

        resultadoEl.textContent = recolocarComa(res, decA);
        return;
    }

    /* ================= DIVISIÓN ================= */
    if (op === "DIVISIÓN") {

        const divisor = Number(rawB);
        let resto = 0;
        let cociente = "";

        const parteEnteraLen = rawA.includes(".")
            ? rawA.split(".")[0].length
            : rawA.length;

        proceso.innerHTML = "<strong>División paso a paso</strong><br><br>";

        for (let i = 0; i < A.length; i++) {

            const num = resto * 10 + Number(A[i]);
            const q = Math.floor(num / divisor);
            resto = num - q * divisor;

            proceso.innerHTML += `
                <div class="paso">
                    ${num} ÷ ${divisor} =
                    <span class="resultado-num">${q}</span><br>
                    <span class="llevada">Resto: ${resto}</span>
                </div>
            `;

            cociente += q;

            /* 👉 AQUÍ VA LA COMA */
            if (i === parteEnteraLen - 1 && decA > 0) {
                proceso.innerHTML += `
                    <div class="paso llevada">
                        👉 Aquí colocamos la coma en el cociente
                    </div>
                `;
            }
        }

        resultadoEl.textContent = recolocarComa(cociente, decA);
        restoEl.textContent = resto;
    }
}

function recolocarComa(num, dec) {
    if (dec === 0) return num.replace(/^0+/, "") || "0";
    const p = num.length - dec;
    return num.slice(0, p) + "," + num.slice(p);
}