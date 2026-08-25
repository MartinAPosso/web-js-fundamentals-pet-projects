// Indirect recursion
let n = 1;

function odd(){
    if(n <= 17){
        console.log(n+1);
        n++;
        even();
    }
    return;
}

function even(){
    if(n <= 17){
        console.log(n-1);
        n++;
        odd();
    }
}

// odd();


// Tail Recursive. Una función es tail recursive si la llamada recursiva es la última cosa hecha por la función. No hay necesidad de guardar el valor del estado anterior. Un ejemplo seria:

function imprimirNum(n){
    if(n === 0)
        return;
    else{
        console.log(n);
    }

    return imprimirNum(n-1);
}

// console.log('FUNCION TAIL RECURSIVE')
// imprimirNum(3);


// Non-tail recursive. Una función es non-tail recursive si la llamada recursiva no es la última acción que realiza la función, es decir, después del return todavía queda algo por evaluar.

function imprimirNumNonTail(n){
    if(n === 0)
        return;

    imprimirNumNonTail(n-1);
    console.log(n);
}

// console.log('FUNCION NON-TAIL RECURSIVE')
// imprimirNumNonTail(3);




const quitarEspacios = texto => texto.trim();
const aMinusculas = texto => texto.toLowerCase();
const capitalizar = texto => texto.charAt(0).toUpperCase() + texto.slice(1);

// Composición manual
function normalizarNombre(texto) {
  return capitalizar(aMinusculas(quitarEspacios(texto)));
}



let nombre = "  juan PEREZ  "

console.log(nombre)

nombre = normalizarNombre(nombre); //

console.log(nombre)