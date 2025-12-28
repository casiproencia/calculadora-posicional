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
  document.getElementById('resultado').value = '';
  document.getElementById('resto').value = '';

  if (op === 'suma') sumaPasoAPaso(A, B);
  if (op === 'resta') restaPasoAPaso(A, B);
  if (op === 'multiplicacion') multiplicacionPasoAPaso(A, B);
  if (op === 'division') divisionPasoAPaso(A, B);
}

/* ===================== SUMA ===================== */
function sumaPasoAPaso(A, B) {
  let pasos = [`<strong>Suma paso a paso</strong><br><br>`];

  let a = A.replace('.', '').split('').reverse();
  let b = B.replace('.', '').split('').reverse();
  let decA = (A.split('.')[1] || '').length;
  let decB = (B.split('.')[1] || '').length;
  let dec = Math.max(decA, decB);

  let llevar = 0;
  let resultado = [];

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    let da = parseInt(a[i] || 0);
    let db = parseInt(b[i] || 0);
    let suma = da + db + llevar;

    let cifra = suma % 10;
    llevar = Math.floor(suma / 10);

    resultado.push(cifra);

    pasos.push(
      `${da} + ${db}` +
      (llevar ? ` + 1 (llevada)` : ``) +
      ` = <span class="num">${suma}</span><br>
       Escribimos <span class="op">${cifra}</span>` +
      (llevar ? ` y llevamos <span class="op">1</span>` : ``) +
      `<br><br>`
    );
  }

  if (llevar) {
    resultado.push(llevar);
    pasos.push(`Añadimos la llevada final: <span class="op">${llevar}</span><br><br>`);
  }

  resultado = resultado.reverse();
  if (dec > 0) resultado.splice(resultado.length - dec, 0, ',');

  const res = resultado.join('');
  document.getElementById('resultado').value = res;

  pasos.push(`<strong>Resultado final</strong><br>${A} + ${B} = <span class="num">${res}</span>`);
  document.getElementById('pasos').innerHTML = pasos.join('');
}

/* ===================== RESTA ===================== */
function restaPasoAPaso(A, B) {
  let pasos = [`<strong>Resta paso a paso</strong><br><br>`];

  let a = A.replace('.', '').split('').reverse();
  let b = B.replace('.', '').split('').reverse();
  let decA = (A.split('.')[1] || '').length;
  let decB = (B.split('.')[1] || '').length;
  let dec = Math.max(decA, decB);

  let pedir = 0;
  let resultado = [];

  for (let i = 0; i < a.length; i++) {
    let da = parseInt(a[i]) - pedir;
    let db = parseInt(b[i] || 0);
    pedir = 0;

    if (da < db) {
      da += 10;
      pedir = 1;
      pasos.push(`Pedimos 1 a la cifra siguiente<br>`);
    }

    let resta = da - db;
    resultado.push(resta);

    pasos.push(
      `${da} − ${db} = <span class="num">${resta}</span><br><br>`
    );
  }

  resultado = resultado.reverse();
  if (dec > 0) resultado.splice(resultado.length - dec, 0, ',');

  const res = resultado.join('').replace(/^0+/, '');
  document.getElementById('resultado').value = res;

  pasos.push(`<strong>Resultado final</strong><br>${A} − ${B} = <span class="num">${res}</span>`);
  document.getElementById('pasos').innerHTML = pasos.join('');
}

/* ===================== MULTIPLICACIÓN ===================== */
function multiplicacionPasoAPaso(A, B) {
  let pasos = [`<strong>Multiplicación paso a paso</strong><br><br>`];

  let a = A.replace('.', '').split('').reverse();
  let b = B.replace('.', '').split('').reverse();
  let dec = (A.split('.')[1] || '').length + (B.split('.')[1] || '').length;

  let parciales = [];

  for (let i = 0; i < b.length; i++) {
    let db = parseInt(b[i]);
    let llevar = 0;
    let parcial = [];

    pasos.push(`Multiplicamos por ${db}<br>`);

    for (let j = 0; j < a.length; j++) {
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
    parciales.push(parseInt(parcial));

    pasos.push(`Resultado parcial: <span class="num">${parcial}</span><br><br>`);
  }

  let total = parciales.reduce((a, b) => a + b, 0).toString();
  if (dec > 0) total = total.slice(0, -dec) + ',' + total.slice(-dec);

  document.getElementById('resultado').value = total;
  pasos.push(`<strong>Resultado final</strong><br>${A} × ${B} = <span class="num">${total}</span>`);
  document.getElementById('pasos').innerHTML = pasos.join('');
}

/* ===================== DIVISIÓN ===================== */
function divisionPasoAPaso(A, B) {
  let pasos = [`<strong>División paso a paso</strong><br><br>`];

  let texto = A.replace('.', '');
  let dec = (A.split('.')[1] || '').length;
  let divisor = parseInt(B);
  let resto = 0;
  let cociente = '';

  for (let i = 0; i < texto.length; i++) {
    let actual = resto * 10 + parseInt(texto[i]);
    let q = Math.floor(actual / divisor);
    resto = actual % divisor;

    if (i === texto.length - dec) {
      cociente += ',';
      pasos.push(`👉 Aquí colocamos la coma en el cociente<br><br>`);
    }

    cociente += q;

    pasos.push(
      `${actual} ÷ ${divisor}<br>
       • Cabe <span class="op">${q}</span><br>
       • ${q} × ${divisor} = ${q * divisor}<br>
       • Resto: <span class="resto">${resto}</span><br><br>`
    );
  }

  document.getElementById('resultado').value = cociente;
  document.getElementById('resto').value = resto;

  pasos.push(`<strong>Resultado final</strong><br>${A} ÷ ${B} = <span class="num">${cociente}</span><br>Resto: ${resto}`);
  document.getElementById('pasos').innerHTML = pasos.join('');
}