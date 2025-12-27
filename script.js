function calcular() {
  const op = document.getElementById('operacion').value;

  const aE = document.getElementById('aEntero').value || '0';
  const aD = document.getElementById('aDecimal').value || '';
  const bE = document.getElementById('bEntero').value || '0';
  const bD = document.getElementById('bDecimal').value || '';

  document.getElementById('pasos').innerHTML = '';
  document.getElementById('resultado').value = '';
  document.getElementById('resto').value = '';

  if (op === 'suma') suma(aE, aD, bE, bD);
  if (op === 'resta') resta(aE, aD, bE, bD);
  if (op === 'multiplicacion') multiplicacion(aE, aD, bE, bD);
  if (op === 'division') division(aE, aD, bE);
}

/* ================= SUMA ================= */
function suma(aE, aD, bE, bD) {
  const dec = Math.max(aD.length, bD.length);
  const A = (aE + aD.padEnd(dec, '0')).split('');
  const B = (bE + bD.padEnd(dec, '0')).split('');

  let pasos = `<strong>Suma paso a paso</strong><br><br>`;
  let carry = 0;
  let resultado = [];

  for (let i = A.length - 1; i >= 0; i--) {
    let suma = parseInt(A[i]) + parseInt(B[i]) + carry;
    carry = Math.floor(suma / 10);
    resultado.unshift(suma % 10);

    pasos += `${A[i]} + ${B[i]}${carry ? ' + llevamos ' + carry : ''} = ${suma % 10}<br>`;
  }

  if (carry) resultado.unshift(carry);

  document.getElementById('resultado').value =
    resultado.join('').slice(0, -dec) + ',' + resultado.join('').slice(-dec);

  document.getElementById('pasos').innerHTML = pasos;
}

/* ================= RESTA ================= */
function resta(aE, aD, bE, bD) {
  const dec = Math.max(aD.length, bD.length);
  let A = (aE + aD.padEnd(dec, '0')).split('').map(Number);
  let B = (bE + bD.padEnd(dec, '0')).split('').map(Number);

  let pasos = `<strong>Resta paso a paso</strong><br><br>`;
  let resultado = [];

  for (let i = A.length - 1; i >= 0; i--) {
    if (A[i] < B[i]) {
      A[i] += 10;
      A[i - 1]--;
      pasos += `Pedimos 1 → ${A[i]} - ${B[i]} = ${A[i] - B[i]}<br>`;
    } else {
      pasos += `${A[i]} - ${B[i]} = ${A[i] - B[i]}<br>`;
    }
    resultado.unshift(A[i] - B[i]);
  }

  document.getElementById('resultado').value =
    resultado.join('').slice(0, -dec) + ',' + resultado.join('').slice(-dec);

  document.getElementById('pasos').innerHTML = pasos;
}

/* ================= MULTIPLICACIÓN ================= */
function multiplicacion(aE, aD, bE, bD) {
  const A = (aE + aD).split('').map(Number);
  const B = parseInt(bE + bD);
  let carry = 0;
  let resultado = [];
  let pasos = `<strong>Multiplicación paso a paso</strong><br><br>`;

  for (let i = A.length - 1; i >= 0; i--) {
    let mult = A[i] * B + carry;
    carry = Math.floor(mult / 10);
    resultado.unshift(mult % 10);

    pasos += `${A[i]} × ${B} = ${mult % 10}${carry ? ' (llevamos ' + carry + ')' : ''}<br>`;
  }

  if (carry) resultado.unshift(carry);

  const dec = aD.length + bD.length;
  document.getElementById('resultado').value =
    resultado.join('').slice(0, -dec) + ',' + resultado.join('').slice(-dec);

  document.getElementById('pasos').innerHTML = pasos;
}

/* ================= DIVISIÓN ================= */
function division(aE, aD, bE) {
  const dividendoStr = aD ? aE + '.' + aD : aE;
  const divisor = parseInt(bE);

  let partes = dividendoStr.split('.');
  let entero = partes[0];
  let decimal = partes[1] || '';
  let texto = entero + decimal;

  let resto = 0;
  let cociente = '';
  let posicionComa = entero.length;

  let pasos = `<strong>División paso a paso</strong><br><br>`;

  for (let i = 0; i < texto.length; i++) {
    let actual = resto * 10 + parseInt(texto[i]);
    let q = Math.floor(actual / divisor);
    resto = actual % divisor;

    if (i === posicionComa) {
      cociente += ',';
      pasos += `👉 Aquí colocamos la coma en el cociente<br><br>`;
    }

    cociente += q;
    pasos += `${actual} ÷ ${divisor} = ${q} (resto ${resto})<br><br>`;
  }

  document.getElementById('resultado').value = cociente;
  document.getElementById('resto').value = resto;
  document.getElementById('pasos').innerHTML = pasos;
}