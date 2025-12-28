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

        proceso = "<strong>Suma paso a paso</strong><br><br>";

        for (let i = aStr.length - 1; i >= 0; i--) {

            let da = parseInt(aStr[i]);
            let db = parseInt(bStr[i]);

            let suma = da + db + carry;
            let dig = suma % 10;
            let carryPrevio = carry;
            carry = Math.floor(suma / 10);

            proceso += `${da} + ${db}`;
            if (carryPrevio) {
                proceso += ` <span class="llevada">(+${carryPrevio})</span>`;
            }
            proceso += ` = <span class="resultado-num">${dig}</span><br>`;

            res = dig + res;
        }

        if (carry) {
            proceso += `<span class="llevada">Llevada final: ${carry}</span><br>`;
            res = carry + res;
        }

        resultado = insertarComa(res, maxDec);
    }

    /* ================= RESTA ================= */
    if (op === "RESTA") {

        let aArr = A.toString().split("").map(Number);
        let bArr = B.toString().padStart(aArr.length, "0").split("").map(Number);

        proceso = "<strong>Resta paso a paso</strong><br><br>";
        let res = "";

        for (let i = aArr.length - 1; i >= 0; i--) {

            if (aArr[i] < bArr[i]) {
                aArr[i] += 10;
                aArr[i - 1] -= 1;
                proceso += `<span class="llevada">Pedimos 1</span><br>`;
            }

            let r = aArr[i] - bArr[i];
            proceso += `${aArr[i]} - ${bArr[i]} = <span class="resultado-num">${r}</span><br>`;
            res = r + res;
        }

        resultado = insertarComa(res, maxDec);
    }

    /* ================= MULTIPLICACIÓN ================= */
    if (op === "MULTIPLICACIÓN") {

        proceso = "<strong>Multiplicación paso a paso</strong><br><br>";

        let res = A * B;
        let decTotal = decA + decB;

        const bStr = B.toString().split("").reverse();

        bStr.forEach((d, i) => {
            proceso += `${A} × ${d} = <span class="resultado-num">${A * d}</span><br>`;
        });

        resultado = insertarComa(res.toString(), decTotal);
    }

    /* ================= DIVISIÓN ================= */
    if (op === "DIVISIÓN") {

        proceso = "<strong>División paso a paso</strong><br><br>";

        let dividendo = aE + aD;
        let divisor = parseInt(bE);
        let cociente = "";
        let restoActual = 0;
        let comaPuesta = false;

        for (let i = 0; i < dividendo.length; i++) {

            let cifra = parseInt(dividendo[i]);
            let numero = restoActual * 10 + cifra;

            if (!comaPuesta && i >= aE.length) {
                proceso += "👉 Aquí colocamos la coma en el cociente<br><br>";
                cociente += ",";
                comaPuesta = true;
            }

            let cabe = Math.floor(numero / divisor);
            restoActual = numero - cabe * divisor;

            proceso += `${numero} ÷ ${divisor} = <span class="resultado-num">${cabe}</span><br>`;
            proceso += `Resto: ${restoActual}<br><br>`;

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