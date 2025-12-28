const op = document.getElementById("operacion");
const aInp = document.getElementById("numA");
const bInp = document.getElementById("numB");
const resEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

function normaliza(v) {
    return v.replace(/\./g, "").replace(",", ".");
}

function resetear() {
    aInp.value = "";
    bInp.value = "";
    resEl.textContent = "—";
    restoEl.textContent = "—";
    pasosEl.innerHTML = "";
}

function calcular() {
    const A = aInp.value.trim();
    const B = bInp.value.trim();
    if (!A || !B) return;

    pasosEl.innerHTML = "";
    restoEl.textContent = "—";

    if (op.value === "suma") suma(A, B);
    if (op.value === "resta") resta(A, B);
    if (op.value === "multiplicacion") multiplicacion(A, B);
    if (op.value === "division") division(A, B);
}

/* ===== SUMA ===== */
function suma(a, b) {
    const r = parseFloat(normaliza(a)) + parseFloat(normaliza(b));
    resEl.textContent = r.toFixed(2).replace(".", ",");
    pasosEl.innerHTML = "Suma correcta alineando decimales.";
}

/* ===== RESTA ===== */
function resta(a, b) {
    const r = parseFloat(normaliza(a)) - parseFloat(normaliza(b));
    resEl.textContent = r.toFixed(2).replace(".", ",");
    pasosEl.innerHTML = "Resta correcta alineando decimales.";
}

/* ===== MULTIPLICACIÓN (SIN ×100) ===== */
function multiplicacion(a, b) {
    const da = a.includes(",") ? a.split(",")[1].length : 0;
    const db = b.includes(",") ? b.split(",")[1].length : 0;

    const A = a.replace(",", "");
    const B = b.replace(",", "");

    let carry = 0;
    let res = "";

    [...A].reverse().forEach(d => {
        const m = parseInt(d) * parseInt(B) + carry;
        const cifra = m % 10;
        carry = Math.floor(m / 10);

        pasosEl.innerHTML += `
            <div class="paso">
                ${d} × ${B} =
                <span class="resultado-num">${m}</span>
                → cifra <span class="resultado-num">${cifra}</span>
                <span class="llevada"> llevada ${carry}</span>
            </div>`;
        res = cifra + res;
    });

    if (carry) {
        pasosEl.innerHTML += `<div class="llevada">Llevada final: ${carry}</div>`;
        res = carry + res;
    }

    const dec = da + db;
    if (dec > 0) {
        res = res.slice(0, -dec) + "," + res.slice(-dec);
    }

    resEl.textContent = res;
}

/* ===== DIVISIÓN (SIN ×100) ===== */
function division(a, b) {
    const da = a.includes(",") ? a.split(",")[1].length : 0;
    const A = a.replace(",", "");
    const B = parseInt(b.replace(",", ""));

    let resto = 0;
    let cociente = "";

    for (let i = 0; i < A.length; i++) {
        const n = resto * 10 + parseInt(A[i]);
        const c = Math.floor(n / B);
        resto = n % B;

        pasosEl.innerHTML += `
            <div class="paso">
                ${n} ÷ ${B} =
                <span class="resultado-num">${c}</span><br>
                <span class="llevada">Resto: ${resto}</span>
            </div>`;
        cociente += c;
    }

    if (da > 0) {
        cociente = cociente.slice(0, -da) + "," + cociente.slice(-da);
    }

    resEl.textContent = cociente.replace(/^0+(?=\d)/, "");
    restoEl.textContent = resto;
}