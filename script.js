function normalizar(n) {
    return n.replace(",", ".");
}

function calcular() {
    const op = document.getElementById("operacion").value;
    let a = normalizar(document.getElementById("numA").value.trim());
    let b = normalizar(document.getElementById("numB").value.trim());

    if (a === "" || b === "") return;

    const A = parseFloat(a);
    const B = parseFloat(b);

    let resultado = "";
    let resto = "—";
    let proceso = "";

    /* ========= SUMA ========= */
    if (op === "SUMA") {
        resultado = (A + B).toFixed(2).replace(".", ",");
        proceso = `<div class="paso">Suma directa alineando decimales.</div>`;
    }

    /* ========= RESTA ========= */
    if (op === "RESTA") {
        resultado = (A - B).toFixed(2).replace(".", ",");
        proceso = `<div class="paso">Resta directa con decimales alineados.</div>`;
    }

    /* ========= MULTIPLICACIÓN ========= */
    if (op === "MULTIPLICACIÓN") {
        resultado = (A * B).toFixed(2).replace(".", ",");
        proceso = `<div class="paso">Multiplicación posicional correcta.</div>`;
    }

    /* ========= DIVISIÓN ========= */
    if (op === "DIVISIÓN") {
        resultado = (A / B).toFixed(2).replace(".", ",");
        resto = (A % B).toFixed(0);
        proceso = `<div class="paso">División con colocación correcta de la coma.</div>`;
    }

    document.getElementById("resultado").innerText = resultado;
    document.getElementById("resto").innerText = resto;
    document.getElementById("proceso").innerHTML = proceso;
}

function resetear() {
    document.getElementById("numA").value = "";
    document.getElementById("numB").value = "";
    document.getElementById("resultado").innerText = "—";
    document.getElementById("resto").innerText = "—";
    document.getElementById("proceso").innerText = "—";
}