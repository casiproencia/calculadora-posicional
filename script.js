function calcular() {
  const op = document.getElementById('operacion').value;
  if (!op) return;

  const aE = document.getElementById('aEntero').value || '0';
  const aD = document.getElementById('aDecimal').value || '';
  const bE = document.getElementById('bEntero').value || '0';
  const bD = document.getElementById('bDecimal').value || '';

  const A = aD ? `${aE}.${aD}` : aE;
  const B = bD ? `${bE}.${bD}` : bE;

  document.getElementById('resultado').value = '';
  document.getElementById('resto').value = '';
  document.getElementById('pasos').innerHTML = '';

  if (op === 'suma') suma(A, B);
  if (op === 'resta') resta(A, B);
  if (op === 'multiplicacion') multiplicacion(A, B);
  if (op === 'division') division(A, B);
}

/* ===== SUMA ===== */
function suma(A, B) {
  let pasos = `<strong>Suma paso a paso</strong><br><br>`;
  let a = A.replace('.', '').split('').reverse();
  let b = B.replace('.', '').split('').reverse();
  let dec = Math.max((A.split('.')[1] || '').length, (B.split('.')[1] || '').length);

  let llevar = 0;
  let res = [];

  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    let da = parseInt(a[i] || 0);
    let db = parseInt(b[i] || 0);
    let ant = llevar;
    let suma = da + db + llevar;
    let cifra = suma % 10;
    llevar = Math.floor(suma / 10);
    res.push(cifra);

    pasos += `${da} + ${db}`;
    if (ant) pasos += ` + <span class="llevada">(${ant})</span>`;
    pasos += ` = <span class="num">${suma}</span><br>`;
    pasos += `Escribimos <span class="num">${cifra}</span>`;
    if (llevar) pasos += ` y llevamos <span class="llevada">${llevar}</span>`;
    pasos += `<br><br>`;
  }

  if (llevar) res.push(llevar);

  res = res.reverse();
  if (dec > 0) {
    res.splice(res.length - dec, 0, ',');
    pasos += `👉 Aquí colocamos la coma en el resultado<br><br>`;
  }

  const r = res.join('');
  document.getElementById('resultado').value = r;
  document.getElementById('pasos').innerHTML = pasos;
}

/* ===== RESTA ===== */
function resta(A, B) {
  let pasos = `<strong>Resta paso a paso</strong><br><br>`;
  let a = A.replace('.', '').split('').reverse();
  let b = B.replace('.', '').split('').reverse();
  let dec = Math.max((A.split('.')[1] || '').length, (B.split('.')[1] || '').length);

  let pedir = 0;
  let res = [];

  for (let i = 0; i < a.length; i++) {
    let da = parseInt(a[i]) - pedir;
    let db = parseInt(b[i] || 0);
    pedir = 0;

    if (da < db) {
      da += 10;
      pedir = 1;
      pasos += `<span class="pedido">Pedimos 1</span><br>`;
    }

    let r = da - db;
    res.push(r);
    pasos += `${da} − ${db} = <span class="num">${r}</span><br><br>`;
  }

  res = res.reverse();
  if (dec > 0) {
    res.splice(res.length - dec, 0, ',');
    pasos += `👉 Aquí colocamos la coma en el resultado<br><br>`;
  }

  const r = res.join('').replace(/^0+/, '');
  document.getElementById('resultado').value = r;
  document.getElementById('pasos').innerHTML = pasos;
}

/* ===== MULTIPLICACIÓN ===== */
function multiplicacion(A, B) {
  let pasos = `<strong>Multiplicación paso a paso</strong><br><br>`;
  let a = A.replace('.', '').split('').reverse();
  let b = B.replace('.', '').split('').reverse();
  let dec = (A.split('.')[1] || '').length + (B.split('.')[1] || '').length;

  let parciales = [];

  for (let i = 0; i < b.length; i++) {
    let db = parseInt(b[i]);
    let llevar = 0;
    let parcial = [];

    pasos += `Multiplicamos por ${db}<br>`;

    for (let j = 0; j < a.length; j++) {
      let da = parseInt(a[j]);
      let base = da * db;
      let total = base + llevar;
      let cifra = total % 10;
      let ant = llevar;
      llevar = Math.floor(total / 10);
      parcial.push(cifra);

      pasos += `${da} × ${db} = ${base}`;
      if (ant) pasos += ` + <span class="llevada">(${ant})</span>`;
      pasos += ` = <span class="num">${total}</span><br>`;
      pasos += `Escribimos <span class="num">${cifra}</span>`;
      if (llevar) pasos += ` y llevamos <span class="llevada">${llevar}</span>`;
      pasos += `<br><br>`;
    }

    if (llevar) parcial.push(llevar);

    let p = parcial.reverse().join('') + '0'.repeat(i);
    parciales.push(parseInt(p));
    pasos += `Resultado parcial: <span class="num">${p}</span><br><br>`;
  }

  let total = parciales.reduce((x, y) => x + y, 0).toString();
  if (dec > 0) {
    total = total.slice(0, -dec) + ',' + total.slice(-dec);
    pasos += `👉 Aquí colocamos la coma en el resultado final<br><br>`;
  }

  document.getElementById('resultado').value = total;
  document.getElementById('pasos').innerHTML = pasos;
}

/* ===== DIVISIÓN ===== */
function division(A, B) {
  let pasos = `<strong>División paso a paso</strong><br><br>`;
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
      pasos += `👉 Aquí colocamos la coma en el cociente<br><br>`;
    }

    cociente += q;
    pasos += `${actual} ÷ ${divisor}<br>`;
    pasos += `Cabe <span class="op">${q}</span><br>`;
    pasos += `${q} × ${divisor} = ${q * divisor}<br>`;
    pasos += `Resto: <span class="resto">${resto}</span><br><br>`;
  }

  document.getElementById('resultado').value = cociente;
  document.getElementById('resto').value = resto;
  document.getElementById('pasos').innerHTML = pasos;
}