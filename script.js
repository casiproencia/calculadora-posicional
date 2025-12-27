let operacion = 'DIVISIÓN';

function setOperacion(op) {
  operacion = op;
  document.getElementById('operacionActual').innerText = op;
}

function calcular() {
  const aE = document.getElementById('aEntero').value || 0;
  const aD = document.getElementById('aDecimal').value || 0;
  const bE = document.getElementById('bEntero').value || 0;
  const bD = document.getElementById('bDecimal').value || 0;

  const a = parseFloat(aE + '.' + aD);
  const b = parseFloat(bE + '.' + bD);

  if (operacion !== 'DIVISIÓN') {
    alert('Por ahora el proceso detallado está implementado solo para división');
    return;
  }

  realizarDivision(a, b);
}

function realizarDivision(dividendo, divisor) {
  let pasos = [];
  let resto = dividendo;
  let cociente = Math.floor(dividendo / divisor);

  pasos.push(`Dividimos ${dividendo} entre ${divisor}`);
  pasos.push(`El divisor cabe ${cociente} veces en la parte entera`);

  let r = dividendo - (cociente * divisor);
  pasos.push(`Multiplicamos ${cociente} × ${divisor} = ${cociente * divisor}`);
  pasos.push(`Restamos y queda un resto de ${r}`);

  document.getElementById('resultado').value = cociente;
  document.getElementById('resto').value = r;

  document.getElementById('pasos').innerHTML = pasos
    .map(p => `<p>${p}</p>`)
    .join('');

  construirRejilla(dividendo);
}

function construirRejilla(numero) {
  const rejilla = document.getElementById('rejilla');
  rejilla.innerHTML = '';

  numero.toString().split('').forEach(n => {
    const celda = document.createElement('div');
    celda.innerText = n;
    rejilla.appendChild(celda);
  });
}