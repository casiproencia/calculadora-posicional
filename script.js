function calcular() {
  const op = document.getElementById('operacion').value;
  if (!op) return;

  const aE = document.getElementById('aEntero').value || '0';
  const aD = document.getElementById('aDecimal').value || '';
  const bE = document.getElementById('bEntero').value || '0';
  const bD = document.getElementById('bDecimal').value || '';

  const A = aD ? `${aE}.${aD}` : aE;
  const B = bD ? `${bE}.${bD}` : bE;

  document.getElementById('pasos').innerHTML = '';
  document.getElementById('resto').value = '';

  if (op === 'suma') sumaPasoAPaso(A, B);
  if (op === 'resta') restaPasoAPaso(A, B);
  if (op === 'multiplicacion') multiplicacionPasoAPaso(A, B);
  if (op === 'division') divisionPasoAPaso(parseFloat(A), parseFloat(B));
}

/* ===================== SUMA ===================== */

function sumaPasoAPaso(A, B) {
  let pasos = [`<strong>Suma paso a paso</strong><br><br>`];

  let a = A.split('').reverse();
  let b = B.split('').reverse();
  let max = Math.max(a.length, b.length);
  let llevar = 0;
  let resultado = [];

  for (let i = 0; i < max; i++) {
    let da = parseInt(a[i] || 0);
    let db = parseInt(b[i] || 0);

    if (a[i] === '.' || b[i] === '.') {
      resultado.push(',');
      pasos.push(`Colocamos la coma en el resultado<br><br>`);
      continue;
    }

    let suma = da + db + llevar;
    let cifra = suma % 10;
    llevar = Math.floor(suma / 10);
    resultado.push(cifra);

    pasos.push(
      `${da} + ${db}` +
      (llevar ? ` + llevamos 1` : ``) +
      ` = <span class="num">${suma}</span><br>
       Escribimos <span class="op">${cifra}</span>` +
      (llevar ? ` y llevamos <span class="op">1</span>` : ``) +
      `<br><br>`
    );
  }

  if (llevar) {
    resultado.push(llevar);
    pasos.push(`Sumamos la llevada final: <span class="op">${llevar}</span><br><br>`);
  }

  let res = resultado.reverse().join('');
  document.getElementById('resultado').value = res;

  pasos.push(`<strong>Resultado final</strong><br>${A} + ${B} = <span class="num">${res}</span>`);

  document.getElementById('pasos').innerHTML = pasos.join('');
}

/* ===================== RESTA ===================== */

function restaPasoAPaso(A, B) {
  let pasos = [`<strong>Resta paso a paso</strong><br><br>`];

  let a = A.split('').reverse();
  let b = B.split('').reverse();
  let resultado = [];
  let pedir = 0;

  for (let i = 0; i < a.length; i++) {
    if (a[i] === '.' || b[i] === '.') {
      resultado.push(',');
      pasos.push(`Colocamos la coma en el resultado<br><br>`);
      continue;
    }

    let da = parseInt(a[i] || 0) - pedir;
    let db = parseInt(b[i] || 0);
    pedir = 0;

    if (da < db) {
      da += 10;
      pedir = 1;
      pasos.push(`Pedimos 1 a la siguiente cifra<br>`);
    }

    let resta = da - db;
    resultado.push(resta);

    pasos.push(
      `${da} − ${db} = <span class="num">${resta}</span><br><br>`
    );
  }

  let res = resultado.reverse().join('').replace(/^0+/, '');
  document.getElementById('resultado').value = res;

  pasos.push(`<strong>Resultado final</strong><br>${A} − ${B} = <span class="num">${res}</span>`);

  document.getElementById('pasos').innerHTML = pasos.join('');
}

/* ===================== MULTIPLICACIÓN ===================== */

function multiplicacionPasoAPaso(A, B) {
  let pasos = [`<strong>Multiplicación paso a paso</strong><br><br>`];

  let a = A.split('').reverse();
  let b = B.split('').reverse();
  let resultadosParciales = [];

  for (let i = 0; i < b.length; i++) {
    if (b[i] === '.') continue;

    let db = parseInt(b[i]);
    let llevar = 0;
    let parcial = [];

    pasos.push(`Multiplicamos por ${db}<br>`);

    for (let j = 0; j < a.length; j++) {
      if (a[j] === '.') continue;

      let da = parseInt(a[j]);
      let mult = da * db + llevar;
      let cifra = mult % 10;
      llevar = Math.floor(mult / 10);
      parcial.push(cifra);

      pasos.push(
        `${da} × ${db} = ${da * db}` +
        (llevar ? ` + llevamos ${llevar}` : ``) +
        `<br>`
      );
    }

    if (llevar) parcial.push(llevar);
    parcial = parcial.reverse().join('') + '0'.repeat(i);
    resultadosParciales.push(parseInt(parcial));

    pasos.push(`Resultado parcial: <span class="num">${parcial}</span><br><br>`);
  }

  let total = resultadosParciales.reduce((a, b) => a + b, 0);
  document.getElementById('resultado').value = total.toFixed(2);

  pasos.push(`<strong>Resultado final</strong><br>${A} × ${B} = <span class="num">${total}</span>`);

  document.getElementById('pasos').innerHTML = pasos.join('');
}

/* ===================== DIVISIÓN ===================== */

function divisionPasoAPaso(dividendo, divisor) {
  let pasos = [];
  let texto = dividendo.toString().replace('.', '');
  let decimales = (dividendo.toString().split('.')[1] || '').length;

  let resto = 0;
  let cociente = '';

  pasos.push(`<strong>División paso a paso</strong><br><br>`);

  for (let i = 0; i < texto.length; i++) {
    let actual = resto * 10 + parseInt(texto[i]);
    let res = Math.floor(actual / divisor);
    resto = actual % divisor;

    if (i === texto.length - decimales) {
      cociente += ',';
      pasos.push(`👉 Aquí colocamos la coma en el cociente.<br><br>`);
    }

    cociente += res;

    pasos.push(
      `<span class="num">${actual}</span> ÷ <span class="num">${divisor}</span><br>
       • Cabe <span class="op">${res}</span><br>
       • ${res} × ${divisor} = <span class="num">${res * divisor}</span><br>
       • Resto: <span class="resto">${resto}</span><br><br>`
    );
  }

  document.getElementById('resultado').value = cociente;
  document.getElementById('resto').value = resto;

  pasos.push(
    `<strong>Resultado final</strong><br>
     ${dividendo} ÷ ${divisor} = <span class="num">${cociente}</span><br>
     Resto: <span class="resto">${resto}</span>`
  );

  document.getElementById('pasos').innerHTML = pasos.join('');
}