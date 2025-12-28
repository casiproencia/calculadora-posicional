function normalizar(valor) {
    return parseFloat(valor.replace(",", "."));
}

function calcular() {
    const op = document.getElementById("operacion").value;
    const aTxt = document.getElementById("numA").value.trim();
    const bTxt = document.getElementById("numB").value.trim();

    if (!aTxt || !bTxt) return;

    const A = normalizar(aTxt);
    const B = normalizar(bTxt);

    let resultado = "—";
    let resto = "—";
    let proceso = "";

    if (op === "SUMA") {
        resultado = (A + B).toFixed(2).replace(".", ",");
        proceso = "Suma directa alineando decimales.";
    }

    if (op === "RESTA") {
        resultado = (A - B).toFixed(2).replace(".", ",");
        proceso = "Resta directa alineando decimales.";
    }

    if (op === "MULTIPLICACION") {
        resultado = (A * B).toFixed(2).replace(".", ",");
        proceso = "Multiplicación directa.";
    }

    if (op === "DIVISION") {
        resultado = (A / B).toFixed(2).replace(".", ",");
        resto = Math.round(A % B).toString();
        proceso = "División con colocación correcta de la coma.";
    }

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("resto").innerText = resto;
    document.getElementById("proceso").innerText = proceso;
}

function resetear() {
    document.getElementById("numA").value = "";
    document.getElementById("numB").value = "";
    document.getElementById("resultado").innerText = "—";
    document.getElementById("resto").innerText = "—";
    document.getElementById("proceso").innerText = "—";
}