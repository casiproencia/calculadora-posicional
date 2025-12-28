function calcular() {

    const op = document.getElementById("operacion").value;

    const aE = document.getElementById("aEntera").value || "0";
    const aD = document.getElementById("aDecimal").value || "";
    const bE = document.getElementById("bEntera").value || "0";
    const bD = document.getElementById("bDecimal").value || "";

    const A = parseFloat(aE + "." + aD);
    const B = parseFloat(bE + "." + bD);

    let proceso = "";
    let resultado = "";
    let resto = "";

    if (op === "DIVISIÓN") {

        let dividendo = aE + aD;
        let divisor = parseInt(bE);
        let cociente = "";
        let restoActual = 0;
        let comaPuesta = false;

        proceso += "División paso a paso\n\n";

        for (let i = 0; i < dividendo.length; i++) {

            let cifra = parseInt(dividendo[i]);
            let numero = restoActual * 10 + cifra;

            if (!comaPuesta && i >= aE.length) {
                proceso += "👉 Aquí ya colocamos la coma en el cociente.\n\n";
                cociente += ",";
                comaPuesta = true;
            }

            let cabe = Math.floor(numero / divisor);
            let producto = cabe * divisor;
            restoActual = numero - producto;

            proceso += `${String.fromCharCode(97 + i)}) ${numero} ÷ ${divisor}\n`;
            proceso += `• Cabe ${cabe}\n`;
            proceso += `• ${cabe} × ${divisor} = ${producto}\n`;
            proceso += `• Resto: ${restoActual}\n\n`;

            cociente += cabe;
        }

        resultado = cociente;
        resto = restoActual;
    }

    document.getElementById("resultadoFinal").innerText = resultado;
    document.getElementById("restoFinal").innerText = resto;
    document.getElementById("proceso").innerText = proceso;
}