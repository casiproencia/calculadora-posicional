function calcular() {

    const op = document.getElementById("operacion").value;
    const rawA = document.getElementById("numA").value.trim().replace(",", ".");
    const rawB = document.getElementById("numB").value.trim().replace(",", ".");

    const proceso = document.getElementById("proceso");
    const resultadoEl = document.getElementById("resultadoFinal");
    const restoEl = document.getElementById("restoFinal");

    proceso.innerHTML = "";
    resultadoEl.textContent = "—";
    restoEl.textContent = "—";

    if (!rawA || !rawB || isNaN(Number(rawA)) || isNaN(Number(rawB))) {
        proceso.textContent = "Introduce números válidos";
        return;
    }

    /* ========= NORMALIZACIÓN ========= */
    const decA = rawA.includes(".") ? rawA.split(".")[1].length : 0;
    const decB = rawB.includes(".") ? rawB.split(".")[1].length : 0;
    const maxDec = Math.max(decA, decB);

    let A = rawA.replace(".", "");
    let B = rawB.replace(".", "");

    A = A.padEnd(A.length + (maxDec - decA), "0");
    B = B.padEnd(B.length + (maxDec - decB), "0");

    let aArr = A.split("").map(Number);
    let bArr = B.padStart(A.length, "0").split("").map(Number);

    /* ================= SUMA ================= */
    if (op === "SUMA") {

        proceso.innerHTML = "<strong>Suma paso a paso</strong><br><br>";
        let carry = 0;
        let res = "";

        for (let i = aArr.length - 1; i >= 0; i--) {
            const total = aArr[i] + bArr[i] + carry;
            const dig = total % 10;

            proceso.innerHTML += `
                <div class="paso">
                    ${aArr[i]} + ${bArr[i]}
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

        resultadoEl.textContent = recolocarComa(res, maxDec);
    }

    /* ================= RESTA ================= */
    if (op === "RESTA") {

        proceso.innerHTML = "<strong>Resta paso a paso</strong><br><br>";
        let res = "";

        for (let i = aArr.length - 1; i >= 0; i--) {

            if (aArr[i] < bArr[i]) {
                aArr[i] += 10;
                aArr[i - 1] -= 1;
                proceso.innerHTML += `<div class="llevada">Pedimos 1</div>`;
            }

            const r = aArr[i] - bArr[i];

            proceso.innerHTML += `
                <div class="paso">
                    ${aArr[i]} - ${bArr[i]} =
                    <span class="resultado-num">${r}</span>
                </div>
            `;

            res = r + res;
        }

        resultadoEl.textContent = recolocarComa(res, maxDec);
    }

    /* ================= MULTIPLICACIÓN ================= */
    if (op === "MULTIPLICACIÓN") {

        proceso.innerHTML = "<strong>Multiplicación paso a paso</strong><br><br>";

        const multiplicador = parseInt(B, 10);
        let carry = 0;
        let res = "";

        for (let i = aArr.length - 1; i >= 0; i--) {

            const total = aArr[i] * multiplicador + carry;
            const dig = total % 10;

            proceso.innerHTML += `
                <div class="paso">
                    ${aArr[i]} × ${multiplicador}
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

        resultadoEl.textContent = recolocarComa(res, maxDec * 2);
    }

    /* ================= DIVISIÓN ================= */
    if (op === "DIVISIÓN") {

        proceso.innerHTML = "<strong>División paso a paso</strong><br><br>";

        const divisor = parseInt(B, 10);
        let resto = 0;
        let cociente = "";

        for (let i = 0; i < A.length; i++) {

            const num = resto * 10 + parseInt(A[i]);
            const q = Math.floor(num / divisor);
            resto = num - q * divisor;

            proceso.innerHTML += `
                <div class="paso">
                    ${num} ÷ ${divisor} =
                    <span class="resultado-num">${q}</span>
                    <br>
                    <span class="llevada">Resto: ${resto}</span>
                </div>
            `;

            cociente += q;
        }

        resultadoEl.textContent = recolocarComa(cociente, maxDec);
        restoEl.textContent = resto;
    }
}

/* ========= UTIL ========= */
function recolocarComa(num, dec) {
    if (dec === 0) return num;
    const p = num.length - dec;
    return num.slice(0, p) + "," + num.slice(p);
}