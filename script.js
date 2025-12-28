function calcular() {

    const op = document.getElementById("operacion").value;

    const aE = document.getElementById("aEntera").value.trim();
    const aD = document.getElementById("aDecimal").value.trim();
    const bE = document.getElementById("bEntera").value.trim();
    const bD = document.getElementById("bDecimal").value.trim();

    const numA = parseFloat(aE + (aD ? "." + aD : ""));
    const numB = parseFloat(bE + (bD ? "." + bD : ""));

    if (isNaN(numA) || isNaN(numB)) {
        document.getElementById("proceso").innerHTML =
            "<span class='llevada'>Introduce números válidos</span>";
        return;
    }

    let resultado = "";
    let resto = "";
    let proceso = "";

    /* ================= SUMA ================= */
    if (op === "SUMA") {

        const aStr = normalizar(numA);
        const bStr = normalizar(numB);

        let carry = 0;
        let res = "";

        proceso = "<strong>Suma paso a paso</strong><br><br>";

        for (let i = aStr.length - 1; i >= 0; i--) {

            if (aStr[i] === ",") {
                res = "," + res;
                continue;
            }

            const da = parseInt(aStr[i]);
            const db = parseInt(bStr[i]);

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

        resultado = res;
    }

    /* ================= RESTA ================= */
    if (op === "RESTA") {

        const aStr = normalizar(numA);
        const bStr = normalizar(numB);

        let res = "";
        let aArr = aStr.replace(",", "").split("").map(Number);
        let bArr = bStr.replace(",", "").split("").map(Number);

        proceso = "<strong>Resta paso a paso</strong><br><br>";

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

        resultado = insertarComa(res, contarDecimales(aStr));
    }

    /* ================= MULTIPLICACIÓN ================= */
    if (op === "MULTIPLICACIÓN") {

        proceso = "<strong>Multiplicación paso a paso</strong><br><br>";

        const a = Math.round(numA * 100);
        const b = Math.round(numB * 100);

        const producto = a * b;
        resultado = (producto / 10000).toFixed(2).replace(".", ",");

        proceso += `${a} × ${b} = <span class="resultado-num">${producto}</span><br>`;
        proceso += "Colocamos la coma al final según los decimales";
    }

    /* ================= DIVISIÓN ================= */
    if (op === "DIVISIÓN") {

        proceso = "<strong>División paso a paso</strong><br><br>";

        let dividendo = normalizar(numA).replace(",", "");
        let divisor = Math.floor(numB);