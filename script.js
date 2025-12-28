function calcular() {

    const op = document.getElementById("operacion").value;
    const rawA = document.getElementById("numA").value.trim().replace(",", ".");
    const rawB = document.getElementById("numB").value.trim().replace(",", ".");

    const numA = Number(rawA);
    const numB = Number(rawB);

    const resultadoEl = document.getElementById("resultadoFinal");
    const restoEl = document.getElementById("restoFinal");
    const procesoEl = document.getElementById("proceso");

    resultadoEl.textContent = "—";
    restoEl.textContent = "—";
    procesoEl.innerHTML = "";

    if (isNaN(numA) || isNaN(numB)) {
        procesoEl.textContent = "Introduce números válidos";
        return;
    }

    let resultado;
    let resto = "";

    if (op === "SUMA") {
        resultado = numA + numB;
        procesoEl.innerHTML =
            `<strong>Suma paso a paso</strong><br>
             ${numA} + ${numB} = ${resultado}`;
    }

    if (op === "RESTA") {
        resultado = numA - numB;
        procesoEl.innerHTML =
            `<strong>Resta paso a paso</strong><br>
             ${numA} - ${numB} = ${resultado}`;
    }

    if (op === "MULTIPLICACIÓN") {
        resultado = numA * numB;
        procesoEl.innerHTML =
            `<strong>Multiplicación paso a paso</strong><br>
             ${numA} × ${numB} = ${resultado}`;
    }

    if (op === "DIVISIÓN") {
        resultado = numA / numB;
        resultado = Number(resultado.toFixed(3));   // LIMITE CLARO

        if (Number.isInteger(numA) && Number.isInteger(numB)) {
            resto = numA % numB;
        }

        procesoEl.innerHTML =
            `<strong>División paso a paso</strong><br>
             ${numA} ÷ ${numB} = ${resultado}`;
    }

    resultadoEl.textContent = resultado.toString().replace(".", ",");
    restoEl.textContent = resto !== "" ? resto : "—";
}