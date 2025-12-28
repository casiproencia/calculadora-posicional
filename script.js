function realizarDivision(dividendo, divisor) {
  let pasos = [];
  let texto = dividendo.toString().replace('.', '');
  let decimales = (dividendo.toString().split('.')[1] || '').length;

  let resto = 0;
  let cociente = '';

  pasos.push(`<strong>División paso a paso</strong><br><br>`);

  for (let i = 0; i < texto.length; i++) {
    let numeroActual = resto * 10 + parseInt(texto[i]);
    let resultado = Math.floor(numeroActual / divisor);
    resto = numeroActual % divisor;

    if (i === texto.length - decimales) {
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

  pasos.push(`<strong>Resultado final</strong><br><br>
    ${dividendo} ÷ ${divisor} = ${cociente}<br>
    Resto: ${resto}
  `);

  document.getElementById('pasos').innerHTML = pasos.join('');
}