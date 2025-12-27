function calcular() {
  const op = operacion.value;
  pasos.innerHTML = '';
  resultado.value = '';
  resto.value = '';

  const aE = aEntero.value || '0';
  const aD = aDecimal.value || '';
  const bE = bEntero.value || '0';
  const bD = bDecimal.value || '';

  const A = aD ? `${aE}.${aD}` : aE;
  const B = bD ? `${bE}.${bD}` : bE;

  if (op === 'suma') {
    resultado.value = (parseFloat(A) + parseFloat(B)).toFixed(
      Math.max(aD.length, bD.length)
    ).replace('.', ',');
    pasos.innerHTML = `<strong>Suma paso a paso</strong><br>
      Sumamos normalmente alineando los números.`;
  }

  if (op === 'resta') {
    resultado.value = (parseFloat(A) - parseFloat(B)).toFixed(
      Math.max(aD.length, bD.length)
    ).replace('.', ',');
    pasos.innerHTML = `<strong>Resta paso a paso</strong><br>
      Restamos normalmente alineando los números.`;
  }

  if (op === 'multiplicacion') {
    resultado.value = (parseFloat(A) * parseFloat(B)).toString().replace('.', ',');
    pasos.innerHTML = `<strong>Multiplicación paso a paso</strong><br>
      Multiplicamos como si no hubiese coma.`;
  }

  if (op === 'division') {
    let div = parseInt(bE);
    let texto = aE + aD;
    let dec = aD.length;
    let r = 0;
    let c = '';

    for (let i = 0; i < texto.length; i++) {
      let n = r * 10 + parseInt(texto[i]);
      let q = Math.floor(n / div);
      r = n % div;

      if (i === texto.length - dec) {
        c += ',';
        pasos.innerHTML += `👉 Aquí colocamos la coma<br><br>`;
      }

      c += q;
      pasos.innerHTML += `${n} ÷ ${div} → ${q}, resto ${r}<br>`;
    }

    resultado.value = c;
    resto.value = r;
  }
}