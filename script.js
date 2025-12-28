function calcular() {

    const op = document.getElementById("operacion").value;

    const aE = document.getElementById("aEntera").value || "0";
    const aD = document.getElementById("aDecimal").value || "";
    const bE = document.getElementById("bEntera").value || "0";
    const bD = document.getElementById("bDecimal").value || "";

    const decA = aD.length;
    const decB = bD.length;
    const maxDec = Math.max(decA, decB);

    const A = parseInt(aE + aD.padEnd(maxDec, "0"));
    const B = parseInt(bE + bD.padEnd(maxDec, "0"));

    let resultado = "";
    let resto = "";
    let proceso = "";

    /* ================= SUMA ================= */
    if (op === "SUMA") {

        let carry = 0;
        let res = "";
        const aStr = A.toString().padStart(Math.max(A, B).toString().length, "0");
        const bStr = B.toString().padStart(aStr.length, "0");

        proceso = "Suma paso a paso\n\n";

        for (let i = aStr.length - 1; i >= 0; i--) {
            let suma = parseInt(aStr[i]) + parseInt(bStr[i]) + carry;
            let dig = suma % 10;
            carry = Math.floor(suma / 10);

            proceso += `${aStr[i]} + ${bStr[i]}`;
            if (carry) proceso += ` <span class="llevada">(+${carry})</span>`;
            proceso += ` = <span class="resultado-num">${dig}</span>\n\n`;

            res = dig + res;
        }

        if (carry) res = carry + res;

        resultado = insertarComa(res, maxDec);
    }

    /* ================= RESTA ================= */
    if (op === "RESTA") {

        let aArr = A.toString().split("").map(Number);
        let bArr = B.toString().padStart(aArr.length, "0").split("").map(Number);

        proceso = "Resta paso a paso\n\n";
        let res = "";

        for (let i = aArr.length - 1; i >= 0; i--) {

            if (aArr[i] < bArr[i]) {
                aArr[i] += 10;
                aArr[i - 1] -= 1;
                proceso += `<span class="llevada">Pedimos 1</span>\n`;
            }

            let r = aArr[i] - bArr[i];
            proceso += `${aArr[i]} - ${bArr[i]} = <span class="resultado-num">${r}</span>\n\n`;
            res = r + res;
        }

        resultado = insertarComa(res, maxDec);
    }

    /* ================= MULTIPLICACIÓN ================= */
    if (op === "MULTIPLICACIÓN") {

        proceso = "Multiplicación paso a paso\n\n";
        let res = A * B;
        let decTotal = decA + decB;

        resultado = insertarComa(res.toString(), decTotal);

        let bStr = B.toString().split("").reverse();
        let linea = 1;

        bStr.forEach(d => {
            proceso += `${A} × ${d} = <span class="resultado-num">${A * d}</span>\n`;
            linea++;
        });
    }

    /* ================= DIVISIÓN ================= */
    if (op === "DIVISIÓN") {

        proceso = "División paso a paso\n\n";
        let dividendo = aE + aD;
        let divisor = parseInt(bE);
        let cociente = "";
        let restoActual = 0;
        let comaPuesta = false;

        for (let i = 0; i < dividendo.length; i++) {

            let cifra = parseInt(dividendo[i]);
            let numero = restoActual * 10 + cifra;

            if (!comaPuesta && i >= aE.length) {
                proceso += "👉 Aquí colocamos la coma en el cociente\n\n";
                cociente += ",";
                comaPuesta = true;
            }

            let cabe = Math.floor(numero / divisor);
            restoActual = numero - cabe * divisor;

            proceso += `${numero} ÷ ${divisor} = <span class="resultado-num">${cabe}</span>\n`;
            proceso += `Resto: ${restoActual}\n\n`;

            cociente += cabe;
        }

        resultado = cociente;
        resto = restoActual;
    }

    document.getElementById("resultadoFinal").innerHTML = resultado;
    document.getElementById("restoFinal").innerHTML = resto;
    document.getElementById("proceso").innerHTML = proceso;
}

function insertarComa(num, dec) {
    if (dec === 0) return num;
    return num.slice(0, -dec) + "," + num.slice(-dec);
}