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
  const A = parseInt(aE + aD.padEnd(dec, '0'));
  const B = parseInt(bE + bD.padEnd(dec, '0'));

  const total = A + B;
  const str = total.toString().padStart(dec + 1, '0');
  const resultado = str.slice(0, -dec) + ',' + str.slice(-dec);

  document.getElementById('resultado').value = resultado;

  document.getElementById('pasos').innerHTML =
    `<strong>Suma paso a paso</strong><br><br>
     Sumamos sin tener en cuenta la coma.<br><br>
     ${A} + ${B} = ${total}<br><br>
     👉 Ponemos la coma al final: <strong>${resultado}</strong>`;
}

/* ================= RESTA ================= */
function resta(aE, aD, bE, bD) {
  const dec = Math.max(aD.length, bD.length);
  const A = parseInt(aE + aD.padEnd(dec, '0'));
  const B = parseInt(bE + bD.padEnd(dec, '0'));

  let total = A - B;
  let signo = '';
  if (total < 0) {
    total = Math.abs(total);
    signo = '-';
  }

  const str = total.toString().padStart(dec + 1, '0');
  const resultado = signo + str.slice(0, -dec) + ',' + str.slice(-dec);

  document.getElementById('resultado').value = resultado;

  document.getElementById('pasos').innerHTML =
    `<strong>Resta paso a paso</strong><br><br>
     Restamos sin tener en cuenta la coma.<br><br>
     ${A} − ${B} = ${signo}${total}<br><br>
     👉 Ponemos la coma al final: <strong>${resultado}</strong>`;
}

/* ================= MULTIPLICACIÓN ================= */
function multiplicacion(aE, aD, bE, bD) {
  const dec = aD.length + bD.length;

  const A = parseInt(aE + aD);
  const B = parseInt(bE + bD);

  const total = A * B;
  const str = total.toString().padStart(dec + 1, '0');
  const resultado = str.slice(0, -dec) + ',' + str.slice(-dec);

  document.getElementById('resultado').value = resultado;

  document.getElementById('pasos').innerHTML =
    `<strong>Multiplicación paso a paso</strong><br><br>
     Multiplicamos sin tener en cuenta la coma.<br><br>
     ${A} × ${B} = ${total}<br><br>
     👉 Ponemos la coma al final: <strong>${resultado}</strong>`;
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