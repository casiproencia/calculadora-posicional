function normalizar(n) {
  return n.replace(',', '.');
}

function calcular() {
  const op = document.getElementById('operacion').value;
  const A = normalizar(document.getElementById('a').value);
  const B = normalizar(document.getElementById('b').value);

  const pasos = document.getElementById('pasos');
  pasos.innerHTML = '';

  document.getElementById('resultado').value = '';
  document.getElementById('resto').value = '';

  if (!op || A === '' || B === '') return;

  if (op === 'suma') suma(A, B);
  if (op === 'resta') resta(A, B);
  if (op === 'multiplicacion') multiplicacion(A, B);
  if (op === 'division') division(A, B);
}

/* ===== SUMA ===== */
function suma(A, B) {
  const r = (parseFloat(A) + parseFloat(B)).toString().replace('.', ',');
  document.getElementById('resultado').value = r;

  document.getElementById('pasos').innerHTML =
    `Sumamos los números sin tener en cuenta la coma.<br><br>
     👉 Ponemos la coma en este lugar: <span class="num">${r}</span>`;
}

/* ===== RESTA ===== */
function resta(A, B) {
  const r = (parseFloat(A) - parseFloat(B)).toString().replace('.', ',');
  document.getElementById('resultado').value = r;

  document.getElementById('pasos').innerHTML =
    `Restamos los números alineando las cifras.<br><br>
     👉 Ponemos la coma en este lugar: <span class="num">${r}</span>`;
}

/* ===== MULTIPLICACIÓN ===== */
function multiplicacion(A, B) {
  const r = (parseFloat(A) * parseFloat(B)).toString().replace('.', ',');
  document.getElementById('resultado').value = r;

  document.getElementById('pasos').innerHTML =
    `Multiplicamos como si no hubiera coma.<br>
     Contamos los decimales de ambos números.<br><br>
     👉 Ponemos la coma en este lugar: <span class="num">${r}</span>`;
}

/* ===== DIVISIÓN ===== */
function division(A, B) {
  const divisor = parseFloat(B);
  if (divisor === 0) {
    document.getElementById('pasos').innerText = 'No se puede dividir entre 0';
    return;
  }

  const cociente = (parseFloat(A) / divisor).toString().replace('.', ',');
  document.getElementById('resultado').value = cociente;

  document.getElementById('pasos').innerHTML =
    `Dividimos normalmente.<br>
     Cuando se acaban las cifras del dividendo, colocamos la coma.<br><br>
     👉 Aquí colocamos la coma en el cociente: <span class="num">${cociente}</span>`;
}