<script>
/* =======================
   REFERENCIAS DOM
======================= */
const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");
const btnCalcular = document.getElementById("btnCalcular");
const btnReset = document.getElementById("btnReset");

/* =======================
   EVENTOS
======================= */
btnCalcular.onclick = calcular;
btnReset.onclick = resetear;

/* =======================
   UTILIDADES
======================= */
function normalizar(v){
  return v.replace(",", ".");
}

function limpiar(){
  pasosEl.innerHTML = "";
  restoEl.textContent = "—";
}

function paso(html){
  pasosEl.innerHTML += `<div class="paso">${html}</div>`;
}

/* =======================
   CONTROL PRINCIPAL
======================= */
function calcular(){
  limpiar();

  if(!numA.value || !numB.value){
    pasosEl.textContent = "Introduce ambos números.";
    return;
  }

  const A = parseFloat(normalizar(numA.value));
  const B = parseFloat(normalizar(numB.value));

  if(isNaN(A) || isNaN(B)){
    pasosEl.textContent = "Datos no válidos.";
    return;
  }

  if(operacion.value === "suma") suma(A,B);
  if(operacion.value === "resta") resta(A,B);
  if(operacion.value === "multiplicacion") multiplicacion(A,B);
  if(operacion.value === "division") division(A,B);
}

function resetear(){
  numA.value = "";
  numB.value = "";
  resultadoEl.textContent = "—";
  restoEl.textContent = "—";
  pasosEl.innerHTML = "";
}

/* =======================
   SUMA
======================= */
function suma(A,B){
  const r = A + B;
  resultadoEl.textContent = r.toString().replace(".",",");

  paso(`<span class="num">${A}</span> <span class="op">+</span> <span class="num">${B}</span> <span class="op">=</span> <span class="res">${r}</span>`);
}

/* =======================
   RESTA
======================= */
function resta(A,B){
  const r = A - B;
  resultadoEl.textContent = r.toString().replace(".",",");

  paso(`<span class="num">${A}</span> <span class="op">−</span> <span class="num">${B}</span> <span class="op">=</span> <span class="res">${r}</span>`);
}

/* =======================
   MULTIPLICACIÓN
======================= */
function multiplicacion(A,B){
  const r = A * B;
  resultadoEl.textContent = r.toString().replace(".",",");

  paso(`<span class="num">${A}</span> <span class="op">×</span> <span class="num">${B}</span> <span class="op">=</span> <span class="res">${r}</span>`);
}

/* =======================
   DIVISIÓN
======================= */
function division(A,B){
  if(B === 0){
    pasosEl.textContent = "No se puede dividir entre 0.";
    return;
  }

  const r = A / B;
  const resto = A % B;

  resultadoEl.textContent = r.toString().replace(".",",");
  restoEl.textContent = resto.toString().replace(".",",");

  paso(`<span class="num">${A}</span> <span class="op">÷</span> <span class="num">${B}</span> <span class="op">=</span> <span class="res">${r}</span>`);
  paso(`<span class="llevada">Resto: ${resto}</span>`);
}
</script>