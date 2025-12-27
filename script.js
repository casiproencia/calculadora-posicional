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

/* ===== RESTA POSICIONAL CORRECTA ===== */
function resta(A, B) {
  let pasos = `<strong>Resta paso a paso</strong><br><br>`;

  // Alinear decimales
  let aPartes = A.split('.');
  let bPartes = B.split('.');

  let decA = aPartes[1] || '';
  let decB = bPartes[1] || '';
  let maxDec = Math.max(decA.length, decB.length);

  decA = decA.padEnd(maxDec, '0');
  decB = decB.padEnd(maxDec, '0');

  let aNum = (aPartes[0] + decA).split('').reverse();
  let bNum = (bPartes[0] + decB).split('').reverse();

  let pedir = 0;
  let res = [];

  for (let i = 0; i < aNum.length; i++) {
    let da = parseInt(aNum[i]) - pedir;
    let db = parseInt(bNum[i] || 0);
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

  if (maxDec > 0) {
    res.splice(res.length - maxDec, 0, ',');
  }

  const resultado = res.join('').replace(/^0+/, '');
  document.getElementById('resultado').value = resultado;
  document.getElementById('pasos').innerHTML = pasos;
}

/* ===== SUMA POSICIONAL CORRECTA ===== */
function suma(A, B) {
  let pasos = `<strong>Suma paso a paso</strong><br><br>`;

  let aPartes = A.split('.');
  let bPartes = B.split('.');

  let decA = aPartes[1] || '';
  let decB = bPartes[1] || '';
  let maxDec = Math.max(decA.length, decB.length);

  decA = decA.padEnd(maxDec, '0');
  decB = decB.padEnd(maxDec, '0');

  let aNum = (aPartes[0] + decA).split('').reverse();
  let bNum = (bPartes[0] + decB).split('').reverse();

  let llevar = 0;
  let res = [];

  for (let i = 0; i < Math.max(aNum.length, bNum.length); i++) {
    let da = parseInt(aNum[i] || 0);
    let db = parseInt(bNum[i] || 0);
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
  if (maxDec > 0) {
    res.splice(res.length - maxDec, 0, ',');
  }

  const resultado = res.join('');
  document.getElementById('resultado').value = resultado;
  document.getElementById('pasos').innerHTML = pasos;
}

/* ===== MULTIPLICACIÓN Y DIVISIÓN ===== */
/* (las que ya tenías funcionan bien y no se tocan) */