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

            const da = parseInt(aStr[i]);
            const db = parseInt(bStr[i]);

            const suma = da + db + carry;
            const dig = suma % 10;

            let linea = `${da} + ${db}`;
            if (carry > 0) linea += ` <span class="llevada">(+${carry})</span>`;
            linea += ` = <span class="resultado-num">${dig}</span><br>`;

            proceso += linea;

            carry = Math.floor(suma / 10);
            res = dig + res;
        }

        if (carry > 0) {
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

            const r = aArr[i] - bArr[i];
            proceso += `${aArr[i]} - ${bArr[i]} = <span class="resultado-num">${r}</span><br>`;
            res = r + res;
        }

        resultado = insertarComa(res, maxDec);
    }

    /* ================= MULTIPLICACIÓN ================= */
    if (op === "MULTIPLICACIÓN") {

        proceso = "<strong>Multiplicación paso a paso</strong><br><br>";

        const aStr = A.toString().split("").reverse();
        const b = B;

        let carry = 0;
        let resParcial = "";

        for (let i = 0; i < aStr.length; i++) {

            const da = parseInt(aStr[i]);
            const prod = da * b + carry;
            const dig = prod % 10;

            let linea = `${da} × ${b}`;