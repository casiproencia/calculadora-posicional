function calcular() {
  const aE = document.getElementById('aEntero').value || '0';
  const aD = document.getElementById('aDecimal').value;
  const bE = document.getElementById('bEntero').value || '1';

  const dividendo = aD ? `${aE}.${aD}` : aE;
  const divisor = parseInt(bE);

  realizarDivision(dividendo, divisor);
}

function realizarDivision(dividendoStr, divisor) {
  let pasos = [];
  let partes = dividendoStr.split('.');
  let entero = partes[0];
  let decimal = partes[1] || '';
  let texto = entero + decimal;

  let resto = 0;
  let cociente = '';
  let posicionComa = entero.length;

  pasos.push(`<strong>División paso a paso</strong><br><br>`);

  for (let i = 0; i < texto.length; i++) {
    let numeroActual = resto * 10 + parseInt(texto[i]);
    let resultado = Math.floor(numeroActual / divisor);
    resto = numeroActual % divisor;

    if (i === posicionComa) {
      cociente += ',';
      pasos.push(`👉 Aquí colocamos la coma en el cociente.<br><br>`);
    }

    cociente += resultado;

    pasos.push(
      `<strong>${numeroActual} ÷ ${divisor}</strong><br>
       • Cabe ${resultado}<br>
       • ${resultado} × ${divisor} = ${resultado * divisor}<br>
       • Resto: ${resto}<br><br>`
    );
  }

  document.getElementById('resultado').value = cociente;
  document.getElementById('resto').value = resto;

  pasos.push(
    `<strong>Resultado final</strong><br><br>
     ${dividendoStr.replace('.', ',')} ÷ ${divisor} = ${cociente}<br>
     Resto: ${resto}`
  );

  document.getElementById('pasos').innerHTML = pasos.join('');
}