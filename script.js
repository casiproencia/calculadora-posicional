function normalizar(txt) {
    return txt.replace(",", ".");
}

function calcular() {
    const op = document.getElementById("operacion").value;
    const aTxt = document.getElementById("numA").value.trim();
    const bTxt = document.getElementById("numB").value.trim();

    if (!aTxt || !bTxt) return;

    let proceso = "";
    let resultado = "—";
    let resto = "—";

    // ======= PREPARACIÓN DECIMALES =======
    const aPart = normalizar(aTxt).split(".");
    const bPart = normalizar(bTxt).split(".");

    const decA = aPart[1]?.length || 0;
    const decB = bPart[1]?.length || 0;
    const dec = Math.max(decA, decB);

    const A = parseInt(aPart[0] + (aPart[1] || "").padEnd(dec, "0"));
    const B = parseInt(bPart[0] + (bPart[1] || "").padEnd(dec, "0"));

    // ================= SUMA =================
    if (op === "SUMA") {
        let carry = 0;
        let res = "";

        const aStr = A.toString().padStart(Math.max(A, B).toString().length, "0");
        const bStr = B.toString().padStart(aStr.length, "0");

        proceso = "<strong>Suma paso a paso</strong><br><br>";

        for (let i = aStr.length - 1; i >= 0; i--) {
            const da = +aStr[i];
            const db = +bStr[i];
            const suma = da + db + carry;
            const dig = suma % 10;

            proceso += `${da} + ${db}`;
            if (carry) proceso += ` <span class="llevada">(+${carry})</span>`;
            proceso += ` = <span class="resultado-num">${dig}</span><br>`;

            carry = Math.floor(suma / 10);
            res = dig + res;
        }

        if (carry) {
            proceso += `<span class="llevada">Llevada final: ${carry}</span><br>`;
            res = carry + res;
        }

        resultado = insertarComa(res, dec);
    }

    // ================= RESTA =================
    if (op === "RESTA") {
        let aArr = A.toString().split("").map(Number);
        let bArr = B.toString().padStart(aArr.length, "0").split("").map(Number);

        proceso = "<strong>Resta paso a paso</strong><br><br>";
        let res = "";

        for (let i = aArr.length - 1; i >= 0; i--) {
            if (aArr[i] < bArr[i]) {
                aArr[i] += 10;
                aArr[i - 1]--;
                proceso += `<span class="llevada">Pedimos 1</span><br>`;
            }

            const r = aArr[i] - bArr[i];
            proceso += `${aArr[i]} − ${bArr[i]} = <span class="resultado-num">${r}</span><br>`;
            res = r + res;
        }

        resultado = insertarComa(res, dec);
    }

    // ================= MULTIPLICACIÓN =================
    if (op === "MULTIPLICACION") {
        proceso = "<strong>Multiplicación paso a paso</strong><br><br>";

        let carry = 0;
        let res = "";
        const aStr = A.toString().split("").reverse();

        for (let i = 0; i < aStr.length; i++) {
            const prod = (+aStr[i]) * B + carry;
            const dig = prod % 10;

            proceso += `${aStr[i]} × ${B}`;
            if (carry) proceso += ` <span class="llevada">(+${carry})</span>`;
            proceso += ` = ${prod} → <span class="resultado-num">cifra ${dig}</span><br>`;

            carry = Math.floor(prod / 10);
            res = dig + res;
        }

        if (carry) {
            proceso += `<span class="llevada">Llevada final: ${carry}</span><br>`;
            res = carry + res;
        }

        resultado = insertarComa(res, dec * 2);
    }

    // ================= DIVISIÓN =================
    if (op === "DIVISION") {
        proceso = "<strong>División paso a paso</strong><br><br>";

        let dividendo = A;
        let divisor = B;
        let cociente = "";
        let r = 0;

        const digits = dividendo.toString();

        for (let i = 0; i < digits.length; i++) {
            r = r * 10 + +digits[i];
            const q = Math.floor(r / divisor);
            proceso += `${r} ÷ ${divisor} = <span class="resultado-num">${q}</span><br>`;
            r = r % divisor;
            proceso += `<span class="llevada">Resto: ${r}</span><br><br>`;
            cociente += q;
        }

        resultado = insertarComa(cociente, dec);
        resto = r.toString();
    }

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("resto").innerText = resto;
    document.getElementById("proceso").innerHTML = proceso;
}

// ======= UTILIDADES =======
function insertarComa(num, dec) {
    if (dec === 0) return num;
    const pos = num.length - dec;
    return num.slice(0, pos) + "," + num.slice(pos);
}

function resetear() {
    document.getElementById("numA").value = "";
    document.getElementById("numB").value = "";
    document.getElementById("resultado").innerText = "—";
    document.getElementById("resto").innerText = "—";
    document.getElementById("proceso").innerHTML = "—";
}