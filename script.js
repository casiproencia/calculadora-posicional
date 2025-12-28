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

    const decA = rawA.includes(".") ? rawA.split(".")[1].length : 0;
    const decB = rawB.includes(".") ? rawB.split(".")[1].length : 0;

    let A = rawA.replace(".", "");
    let B = rawB.replace(".", "");

    /* ================= SUMA Y RESTA ================= */
    if (op === "SUMA" || op === "RESTA") {

        const maxDec = Math.max(decA, decB);
        A = A.padEnd(A.length + (maxDec - decA), "0");
        B = B.padEnd(B.length + (maxDec - decB), "0");

        let aArr = A.split("").map(Number);
        let bArr = B.padStart(A.length, "0").split("").map(Number);

        let res = "";
        let carry = 0;

        proceso.innerHTML = `<strong>${op} paso a paso</strong><br><br>`;

        for (let i = aArr.length - 1; i >= 0; i--) {

            if (op === "RESTA" && aArr[i] < bArr[i]) {
                aArr[i] += 10;
                aArr[i - 1] -= 1;
                proceso.innerHTML += `<div class="llevada">Pedimos 1</div>`;
            }

            const total = op === "SUMA"
                ? aArr[i] + bArr[i] + carry
                : aArr[i] - bArr[i];

            const dig = ((total % 10) + 10) % 10;

            proceso.innerHTML += `
                <div class="paso">
                    ${aArr[i]} ${op === "SUMA" ? "+" : "-"} ${bArr[i]}
                    ${carry ? `<span class="llevada"> + ${carry}</span>` : ""}
                    = <span class="resultado-num">${total}</span>
                    → cifra <span class="resultado-num">${dig}</span>
                </div>
            `;

            carry = op === "SUMA" ? Math.floor(total / 10) : 0;
            res = dig + res;
        }

        if (carry) {
            proceso.innerHTML += `<div class="llevada">Llevada final: ${carry}</div>`;
            res = carry + res;
        }

        resultadoEl.textContent = recolocarComa(res, maxDec);
        return;
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