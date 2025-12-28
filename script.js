function calcular() {
  const op = document.getElementById("operacion").value;

  const aE = document.getElementById("aEntero").value || "0";
  const aD = document.getElementById("aDecimal").value || "";
  const bE = document.getElementById("bEntero").value || "0";
  const bD = document.getElementById("bDecimal").value || "";

  const A = normalizar(aE, aD);
  const B = normalizar(bE, bD);

  if (op === "suma") suma(A, B);
  if (op === "resta") resta(A, B);
  if (op === "multiplicacion") multiplicacion(A, B);
  if (op === "division") division(A, B);
}

function normalizar(e, d) {
  return {
    entero: e,
    decimal: d,
    totalDec: d.length
  };
}

function suma(A, B) {
  const dec = Math.max(A.totalDec, B.totalDec);
  const a = A.entero + A.decimal.padEnd(dec, "0");
  const b = B.entero + B.decimal.padEnd(dec, "0");

  let carry = 0, res = "", pasos = `<h3>Suma paso a paso</h3>`;

  for (let i = a.length - 1; i >= 0; i--) {
    const s = parseInt(a[i]) + parseInt(b[i] || 0) + carry;
    carry = Math.floor(s / 10);
    res = (s % 10) + res;

    pasos += `<div><span class="azul">${a[i]}</span> + <span class="azul">${b[i] || 0}</span> = <span class="verde">${s % 10}</span> ${carry ? `<span class="rojo">(llevo ${carry})</span>` : ""}</div>`;
  }

  if (carry) res = carry + res;

  const final = insertarComa(res, dec);
  mostrar(final, "", pasos);
}

function resta(A, B) {
  const dec = Math.max(A.totalDec, B.totalDec);
  let a = A.entero + A.decimal.padEnd(dec, "0");
  let b = B.entero + B.decimal.padEnd(dec, "0");

  let res = "", borrow = 0, pasos = `<h3>Resta paso a paso</h3>`;

  for (let i = a.length - 1; i >= 0; i--) {
    let x = parseInt(a[i]) - borrow;
    let y = parseInt(b[i] || 0);
    borrow = 0;

    if (x < y) {
      x += 10;
      borrow = 1;
      pasos += `<div class="rojo">Pedimos 1</div>`;
    }

    const r = x - y;
    res = r + res;
    pasos += `<div><span class="azul">${x}</span> - <span class="azul">${y}</span> = <span class="verde">${r}</span></div>`;
  }

  const final = insertarComa(res.replace(/^0+/, ""), dec);
  mostrar(final, "", pasos);
}

function multiplicacion(A, B) {
  const a = A.entero + A.decimal;
  const b = B.entero + B.decimal;
  const dec = A.totalDec + B.totalDec;

  let pasos = `<h3>Multiplicación paso a paso</h3>`;
  pasos += `<div><span class="azul">${a}</span> × <span class="azul">${b}</span></div>`;

  const res = (BigInt(a) * BigInt(b)).toString();
  const final = insertarComa(res, dec);

  pasos += `<div class="verde">Resultado: ${final}</div>`;
  mostrar(final, "", pasos);
}

function division(A, B) {
  const a = parseInt(A.entero + A.decimal);
  const b = parseInt(B.entero);

  let cociente = Math.floor(a / b);
  let resto = a % b;

  let pasos = `<h3>División paso a paso</h3>`;
  pasos += `<div><span class="azul">${a}</span> ÷ <span class="azul">${b}</span></div>`;
  pasos += `<div>Cociente: <span class="verde">${cociente}</span></div>`;
  pasos += `<div>