const op = document.getElementById("operacion");
const aInp = document.getElementById("numA");
const bInp = document.getElementById("numB");
const resEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");

document.getElementById("btnCalcular").onclick = calcular;
document.getElementById("btnReset").onclick = resetear;

function resetear() {
    aInp.value = "";
    bInp.value = "";
    resEl.textContent = "—";
    restoEl.textContent = "—";
    pasosEl.innerHTML = "";
}

function parseNum(v) {
    return v.replace(/\./g, "").replace(",", ".");
}

/* ================= SUMA ================= */
function suma(a, b) {
    const pasos = [];
    const x = parseFloat(parseNum(a));
    const y = parseFloat(parseNum(b));
    const r = x + y;

    pasos.push("Suma correcta alineando decimales.");

    return {
        res: r.toFixed(2).replace(".", ","),
        pasos: pasos.join("")
    };
}

/* ================= RESTA ================= */
function resta(a, b) {
    const pasos = [];
    const x = parseFloat(parseNum(a));
    const y = parseFloat(parseNum(b));
    const r = x - y;

    pasos.push("Resta directa con decimales alineados.");

    return {
        res: r.toFixed(2).replace(".", ","),
        pasos: pasos.join("")
    };
}

/* ================= MULTIPLICACIÓN ================= */
function multiplicacion(a, b) {
    const pasos = [];

    const decA = a.includes(",") ? a.split(",")[1].length : 0;
    const decB = b.includes(",") ? b.split(",")[1].length : 0;
    const totalDec = decA + decB;

    const A = a.replace(",", "");
    const B = b.replace(",", "");

    let carry = 0;
    let res = "";

    [...A].reverse().forEach(d => {
        const mult = parseInt(d) * parseInt(B) + carry;
        const cifra = mult % 10;
        carry = Math.floor(mult / 10);

        pasos.push(`
            <div class="paso">
                ${d} × ${B} = 
                <span class="resultado-num">${mult}</span>
                → cifra <span class="resultado-num">${cifra}</span>
                <span class="llevada"> llevada ${carry}</span>
            </div>
        `);

        res = cifra + res;
    });

    if (carry) {
        pasos.push(`<div class="llevada">Llevada final: ${carry}</div>`);
        res = carry + res;
    }

    if (totalDec > 0) {
        res =
            res.slice(0, res.length - totalDec) +
            "," +
            res.slice(res.length - totalDec);
    }

    return { res, pasos: pasos.join("") };
}

/* ================= DIVISIÓN ================= */
function division(a, b) {
    const pasos = [];

    const decA = a.includes(",") ? a.split(",")[1].length : 0;
    let A = a.replace(",", "");
    const B = parseInt(b.replace(",", ""));

    let resto = 0;
    let cociente = "";

    for (let i = 0; i < A.length; i++) {
        const n = resto * 10 + parseInt(A[i]);
        const cifra = Math.floor(n / B);
        resto = n % B;

        pasos.push(`
            <div class="paso">
                ${n} ÷ ${B} =
                <span class="resultado-num">${cifra}</span>
                <br>
                <span class="llevada">Resto: ${resto}</span>
            </div>
        `);

        cociente += cifra;
    }

    if (decA > 0) {
        cociente =
            cociente.slice(0, cociente.length - decA) +
            "," +
            cociente.slice(cociente.length - decA);
    }

    return {
        res: cociente.replace(/^0+(?=\d)/, ""),
        resto,
        pasos: pasos.join("")
    };
}

/* ================= CONTROL ================= */
function calcular() {
    const a = aInp.value.trim();
    const b = bInp.value.trim();
    if (!a || !b) return;

    pasosEl.innerHTML = "";
    restoEl.textContent = "—";

    if (op.value === "suma") {
        const r = suma(a, b);
        resEl.textContent = r.res;
        pasosEl.innerHTML = r.pasos;
    }

    if (op.value === "resta") {
        const r = resta(a, b);
        resEl.textContent = r.res;
        pasosEl.innerHTML = r.pasos;
    }

    if (op.value === "multiplicacion") {
        const r = multiplicacion(a, b);
        resEl.textContent = r.res;
        pasosEl.innerHTML = r.pasos;
    }

    if (op.value === "division") {
        const r = division(a, b);
        resEl.textContent = r.res;
        restoEl.textContent = r.resto;
        pasosEl.innerHTML = r.pasos;
    }
}