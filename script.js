const operacionSelect = document.getElementById('operacion');
const numAInput = document.getElementById('numA');
const numBInput = document.getElementById('numB');
const btnCalcular = document.getElementById('btnCalcular');
const btnReset = document.getElementById('btnReset');

const resultadoEl = document.getElementById('resultado');
const restoEl = document.getElementById('resto');
const pasosEl = document.getElementById('pasos');

btnCalcular.addEventListener('click', calcular);
btnReset.addEventListener('click', reiniciar);

function reiniciar() {
    numAInput.value = '';
    numBInput.value = '';
    resultadoEl.textContent = '—';
    restoEl.textContent = '—';
    pasosEl.innerHTML = '';
}

function normalizar(n) {
    return n.replace(/\./g, '').replace(',', '.');
}

/* =======================
   SUMA (NO TOCAR)
======================= */
function sumaPosicional(aStr, bStr) {
    const pasos = [];

    const a = aStr.split(',');
    const b = bStr.split(',');

    const decA = a[1] ? a[1].length : 0;
    const decB = b[1] ? b[1].length : 0;
    const maxDec = Math.max(decA, decB);

    const entA = a[0];
    const entB = b[0];

    const decPartA = (a[1] || '').padEnd(maxDec, '0');
    const decPartB = (b[1] || '').padEnd(maxDec, '0');

    const totalA = entA + decPartA;
    const totalB = entB + decPartB;

    let carry = 0;
    let resultado = '';

    for (let i = totalA.length - 1; i >= 0; i--) {
        const da = parseInt(totalA[i] || 0);
        const db = parseInt(totalB[i] || 0);
        const suma = da + db + carry;
        const cifra = suma % 10;
        carry = Math.floor(suma / 10);

        pasos.push(
            `<div class="paso">
                ${da} + ${db} = 
                <span class="resultado-num">${suma}</span>
                → cifra <span class="resultado-num">${cifra}</span>
            </div>`
        );

        resultado = cifra + resultado;
    }

    if (carry) resultado = carry + resultado;

    if (maxDec > 0) {
        resultado =
            resultado.slice(0, resultado.length - maxDec) +
            ',' +
            resultado.slice(resultado.length - maxDec);
    }

    return { resultado, pasos: pasos.reverse().join('') };
}

/* =======================
   RESTA (NO TOCAR)
======================= */
function restaDirecta(aStr, bStr) {
    const a = parseFloat(normalizar(aStr));
    const b = parseFloat(normalizar(bStr));
    return {
        resultado: (a - b).toFixed(2).replace('.', ','),
        pasos: 'Resta directa con decimales alineados.'
    };
}

/* =======================
   MULTIPLICACIÓN (CORREGIDA)
======================= */
function calcularMultiplicacion(aStr, bStr) {
    const pasos = [];

    const decA = aStr.includes(',') ? aStr.split(',')[1].length : 0;
    const decB = bStr.includes(',') ? bStr.split(',')[1].length : 0;
    const totalDec = decA + decB;

    const a = aStr.replace(',', '');
    const b = bStr.replace(',', '');

    let carry = 0;
    let resultado = '';

    const aRev = a.split('').reverse();
    const bNum = parseInt(b, 10);

    aRev.forEach(dig => {
        const n = parseInt(dig, 10);
        const mult = n * bNum + carry;
        const cifra = mult % 10;
        carry = Math.floor(mult / 10);

        pasos.push(
            `<div class="paso">
                ${n} × ${bNum} + 
                <span class="llevada">${mult - n * bNum}</span>
                = <span class="resultado-num">${mult}</span>
                → cifra <span class="resultado-num">${cifra}</span>
            </div>`
        );

        resultado = cifra + resultado;
    });

    if (carry > 0) {
        pasos.push(`<div class="llevada">Llevada final: ${carry}</div>`);
        resultado = carry + resultado;
    }

    if (totalDec > 0) {
        const pos = resultado.length - totalDec;
        resultado = resultado.slice(0, pos) + ',' + resultado.slice(pos);
    }

    return { resultado, pasos: pasos.join('') };
}

/* =======================
   DIVISIÓN (CORREGIDA)
======================= */
function calcularDivision(aStr, bStr) {
    const pasos = [];

    const decA = aStr.includes(',') ? aStr.split(',')[1].length : 0;

    const a = aStr.replace(',', '');
    const divisor = parseInt(bStr.replace(',', ''), 10);

    let resto = 0;
    let cociente = '';

    for (let i = 0; i < a.length; i++) {
        const actual = resto * 10 + parseInt(a[i], 10);
        const cifra = Math.floor(actual / divisor);
        resto = actual % divisor;

        pasos.push(
            `<div class="paso">
                ${actual} ÷ ${divisor} =
                <span class="resultado-num">${cifra}</span><br>
                <span class="llevada">Resto: ${resto}</span>
            </div>`
        );

        cociente += cifra;
    }

    if (decA > 0) {
        const pos = cociente.length - decA;
        cociente = cociente.slice(0, pos) + ',' + cociente.slice(pos);
    }

    return {
        resultado: cociente.replace(/^0+(?=\d)/, ''),
        resto,
        pasos: pasos.join('')
    };
}

/* =======================
   CONTROL PRINCIPAL
======================= */
function calcular() {
    const op = operacionSelect.value;
    const a = numAInput.value.trim();
    const b = numBInput.value.trim();

    if (!a || !b) return;

    resultadoEl.textContent = '—';
    restoEl.textContent = '—';
    pasosEl.innerHTML = '';

    switch (op) {
        case 'suma': {
            const r = sumaPosicional(a, b);
            resultadoEl.textContent = r.resultado;
            pasosEl.innerHTML = r.pasos;
            break;
        }
        case 'resta': {
            const r = restaDirecta(a, b);
            resultadoEl.textContent = r.resultado;
            pasosEl.textContent = r.pasos;
            break;
        }
        case 'multiplicacion': {
            const r = calcularMultiplicacion(a, b);
            resultadoEl.textContent = r.resultado;
            pasosEl.innerHTML = r.pasos;
            break;
        }
        case 'division': {
            const r = calcularDivision(a, b);
            resultadoEl.textContent = r.resultado;
            restoEl.textContent = r.resto;
            pasosEl.innerHTML = r.pasos;
            break;
        }
    }
}