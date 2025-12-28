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

  if (operacion.value === "suma") {
    operar(numA.value, numB.value, "+");
  }
  if (operacion.value === "resta") {
    operar(numA.value, numB.value, "-");
  }
}

/* =========================
   MOTOR CORRECTO
========================= */
function operar(a, b, signo) {

  const da = (a.split(",")[1] || "").length;
  const db = (b.split(",")[1] || "").length;
  const decs = Math.max(da, db);

  const A = Number(a.replace(",", ".")) * Math.pow(10, decs);
  const B = Number(b.replace(",", ".")) * Math.pow(10, decs);

  const resultado = signo === "+" ? A + B : A - B;

  mostrarResultado(resultado, decs);

  generarPasos(a, b, signo, decs);
}

function mostrarResultado(valor, decs) {
  let s = Math.abs(valor).toString().padStart(decs + 1, "0");

  if (decs > 0) {
    s = s.slice(0, -decs) + "," + s.slice(-decs);
  }

  if (valor < 0) s = "-" + s;

  resultadoEl.textContent = s;
}

/* =========================
   PASO A PASO DIDÁCTICO
========================= */
function generarPasos(a, b, signo, decs) {

  const A = a.replace(",", "").padEnd(a.length + (decs - (a.split(",")[1]?.length || 0)), "0");
  const B = b.replace(",", "").padEnd(b.length + (decs - (b.split(",")[1]?.length || 0)), "0");

  let pasos = [];
  let carry = 0;

  pasos.push(`<strong>${signo === "+" ? "Suma" : "Resta"} alineando decimales</strong><br><br>`);

  for (let i = A.length - 1; i >= 0; i--) {
    const x = Number(A[i]);
    const y = Number(B[i]);

    if (signo === "+") {
      const t = x + y + carry;
      pasos.push(
        `<div class="paso">
          ${x} + ${y} ${carry ? `<span class="llevada">+ ${carry}</span>` : ""}
          = <span class="resultado-num">${t}</span>
          → cifra <span class="resultado-num">${t % 10}</span>
        </div>`
      );
      carry = Math.floor(t / 10);
    }

    if (signo === "-") {
      let xx = x - carry;
      let prestamo = "";

      if (xx < y) {
        xx += 10;
        carry = 1;
        prestamo = `<span class="llevada"> (pido 1)</span>`;
      } else {
        carry = 0;
      }

      const r = xx - y;

      pasos.push(
        `<div class="paso">
          ${xx} - ${y} = <span class="resultado-num">${r}</span>${prestamo}
        </div>`
      );
    }
  }

  pasosEl.innerHTML = pasos.join("");
}