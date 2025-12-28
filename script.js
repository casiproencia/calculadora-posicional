<script>
const numA = document.getElementById("numA");
const numB = document.getElementById("numB");
const operacion = document.getElementById("operacion");
const resultadoEl = document.getElementById("resultado");
const restoEl = document.getElementById("resto");
const pasosEl = document.getElementById("pasos");
const btnCalcular = document.getElementById("btnCalcular");
const btnReset = document.getElementById("btnReset");

btnCalcular.onclick = calcular;
btnReset.onclick = resetear;

function n(v){ return v.replace(",", "."); }

function calcular(){
  pasosEl.innerHTML="";
  restoEl.textContent="—";

  if(!numA.value || !numB.value) return;

  const A = n(numA.value);
  const B = n(numB.value);

  if(operacion.value==="suma") sumaPaso(A,B);
  if(operacion.value==="resta") restaPaso(A,B);
  if(operacion.value==="multiplicacion") multiplicacionPaso(A,B);
  if(operacion.value==="division") divisionPaso(A,B);
}

function resetear(){
  numA.value="";
  numB.value="";
  resultadoEl.textContent="—";
  restoEl.textContent="—";
  pasosEl.innerHTML="";
}

/* ===================== */
/* === SUMA PASO A PASO === */
/* ===================== */
function sumaPaso(a,b){
  let A=a.replace(".","").replace(",","").split("").reverse();
  let B=b.replace(".","").replace(",","").split("").reverse();
  let carry=0, res=[];
  pasosEl.innerHTML="";

  for(let i=0;i<Math.max(A.length,B.length);i++){
    let x=+(A[i]||0), y=+(B[i]||0);
    let s=x+y+carry;
    let r=s%10;
    carry=Math.floor(s/10);
    res.push(r);

    pasosEl.innerHTML+=`
      <div class="paso">
        <span class="num">${x}</span>
        <span class="op"> + </span>
        <span class="num">${y}</span>
        ${carry?`<span class="llevada"> +1</span>`:""}
        <span class="op"> → </span>
        <span class="res">${r}</span>
      </div>`;
  }

  if(carry) res.push(carry);
  resultadoEl.textContent=(parseFloat(n(a))+parseFloat(n(b))).toString().replace(".",",");
}

/* ====================== */
/* === RESTA PASO A PASO === */
/* ====================== */
function restaPaso(a,b){
  let A=a.replace(".","").replace(",","").split("").reverse();
  let B=b.replace(".","").replace(",","").split("").reverse();
  let borrow=0, res=[];
  pasosEl.innerHTML="";

  for(let i=0;i<A.length;i++){
    let x=+A[i]-borrow;
    let y=+(B[i]||0);
    if(x<y){ x+=10; borrow=1; }
    else borrow=0;

    let r=x-y;
    res.push(r);

    pasosEl.innerHTML+=`
      <div class="paso">
        <span class="num">${x}</span>
        <span class="op"> − </span>
        <span class="num">${y}</span>
        ${borrow?`<span class="llevada"> prestado</span>`:""}
        <span class="op"> → </span>
        <span class="res">${r}</span>
      </div>`;
  }

  resultadoEl.textContent=(parseFloat(n(a))-parseFloat(n(b))).toString().replace(".",",");
}

/* =============================== */
/* === MULTIPLICACIÓN PASO A PASO === */
/* =============================== */
function multiplicacionPaso(a,b){
  let A=a.replace(".","").replace(",","").split("").reverse();
  let m=parseInt(b);
  let carry=0;
  pasosEl.innerHTML="";

  for(let i=0;i<A.length;i++){
    let x=+A[i];
    let p=x*m+carry;
    let r=p%10;
    carry=Math.floor(p/10);

    pasosEl.innerHTML+=`
      <div class="paso">
        <span class="num">${m}</span>
        <span class="op"> × </span>
        <span class="num">${x}</span>
        ${carry?`<span class="llevada"> +${carry}</span>`:""}
        <span class="op"> → </span>
        <span class="res">${r}</span>
      </div>`;
  }

  resultadoEl.textContent=(parseFloat(n(a))*parseFloat(n(b))).toString().replace(".",",");
}

/* ========================== */
/* === DIVISIÓN PASO A PASO === */
/* ========================== */
function divisionPaso(a,b){
  let A=a.replace(".","").replace(",","");
  let d=parseInt(b);
  let resto=0;
  let res="";
  pasosEl.innerHTML="";

  for(let i=0;i<A.length;i++){
    let n=parseInt(""+resto+A[i]);
    let q=Math.floor(n/d);
    resto=n%d;
    res+=q;

    pasosEl.innerHTML+=`
      <div class="paso">
        <span class="num">${n}</span>
        <span class="op"> ÷ </span>
        <span class="num">${d}</span>
        <span class="op"> = </span>
        <span class="res">${q}</span>
        <span class="llevada"> resto ${resto}</span>
      </div>`;
  }

  resultadoEl.textContent=(parseFloat(n(a))/parseFloat(n(b))).toString().replace(".",",");
  restoEl.textContent=resto;
}
</script>