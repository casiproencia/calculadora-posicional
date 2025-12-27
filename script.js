function calcular() {
  const op = document.getElementById('operacion').value;
  if (!op) return;

  const aE = document.getElementById('aEntero').value || '0';
  const aD = document.getElementById('aDecimal').value;
  const bE = document.getElementById('bEntero').value || '0';
  const bD = document.getElementById('bDecimal').value;

  const A = parseFloat(aD ? `${aE}.${aD}` : aE);
  const B = parseFloat(bD ? `${bE}.${bD}` : bE);

  document.getElementById('pasos').innerHTML = '';
  document.getElementById('resto').value = '';

  if (op === 'division') divisionPasoAPaso(A, B);
  if (op === 'suma') simpleOperacion(A, B, '+');
  if (op === 'resta') simpleOperacion(A, B, '-');
  if (op === 'multiplicacion') simpleOperacion(A, B, '×');
}

function simpleOperacion(A, B, simbolo) {
  let resultado;
  if (simbolo === '+') resultado = A + B;
  if (simbolo === '-') resultado = A - B;
  if (simbolo === '×') resultado = A * B;

  document.getElementById('resultado').value = resultado.toFixed(2);

  document.getElementById('pasos').innerHTML = `
    <strong>Operación paso a paso</strong><br><br>
    <span class="num">${A}</span> <span class="op">${simbolo}</span> <span class="num">${B}</span><br><br>
    Resultado: <span class="num">${resultado.toFixed(2)}</span>
  `;
}

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
    `<strong>Resultado final</strong><br><br>
     ${dividendo} ÷ ${divisor} = <span class="num">${cociente}</span><br>
     Resto: <span class="resto">${resto}</span>`
  );

  document.getElementById('pasos').innerHTML = pasos.join('');
}