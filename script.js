function calcular() {

    const op = document.getElementById("operacion").value;

    const rawA = document.getElementById("numA").value.trim().replace(",", ".");
    const rawB = document.getElementById("numB").value.trim().replace(",", ".");

    const numA = parseFloat(rawA);
    const numB = parseFloat(rawB);

    if (isNaN(numA) || isNaN(numB)) {
        document.getElementById("proceso").innerHTML =
            "<span class='llevada'>Introduce números válidos</span>";
        return;
    }

    let resultado = "";
    let resto = "";
    let proceso = "";

    /* ========= SUMA ========= */
    if (op === "SUMA") {
        proceso = "<strong>Suma paso a paso</strong><br><br>";
        resultado = (numA + numB).toString().replace(".", ",");
        proceso += `${rawA} + ${rawB} = <span class="resultado-num">${resultado}</span>`;
    }

    /* ========= RESTA ========= */
    if (op === "RESTA") {
        proceso = "<strong>Resta paso a paso</strong><br><br>";
        resultado = (numA - numB).toString().replace(".", ",");
        proceso += `${rawA} - ${rawB} = <span class="resultado-num">${resultado}</span>`;
    }

    /* ========= MULTIPLICACIÓN ========= */
    if (op === "MULTIPLICACIÓN") {
        proceso = "<strong>Multiplicación paso a paso</strong><br><br>";
        resultado = (numA * numB).toString().replace(".", ",");
        proceso += `${rawA} × ${rawB} = <span class="resultado-num">${resultado}</span>`;
    }

    /* ========= DIVISIÓN ========= */
    if (op === "DIVISIÓN") {
        proceso = "<strong>División paso a paso</strong><br><br>";
        resultado = (numA / numB).toString().replace(".", ",");
        resto = numA % numB;
        proceso += `${rawA} ÷ ${rawB} = <span class="resultado-num">${resultado}</span>`;
    }

    document.getElementById("resultadoFinal").innerHTML = resultado;
    document.getElementById("restoFinal").innerHTML = resto ? resto : "";
    document.getElementById("proceso").innerHTML = proceso;
}