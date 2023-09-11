let runningTotal = 0;
let buffer = "0";
let previousOperator;
let ENTER_KEYCODE = 13;

let Symbols = ['-','+','*','/','-','−'];
let Numbers= ['0','1','2','3','4','5','6','7','8','9'];

const inputField  = document.getElementById('inputField');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    inputField.value = buffer;
}

function returningResult(){
    if (previousOperator === null) {
        return;
    }
    flushOperation(parseInt(buffer));
    previousOperator = null;
    buffer = runningTotal.toString();
    runningTotal = 0;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningTotal = 0;
            break;
        case '=':
            returningResult();
            break
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
        case '*':
        case '/':
        case '-':
            handleMath(symbol);
            break;
    }
}
function handleMath(symbol){
    if(buffer==='0'){
        return;
    }
    const intBuffer = parseInt(buffer);
    if(runningTotal===0){
        runningTotal=intBuffer;
    }
    else{
        flushOperation(intBuffer);
    }
    previousOperator = symbol;
    buffer='0'
}
function flushOperation(intBuffer){
    if(previousOperator==='+'||previousOperator==='+'){
        runningTotal+=intBuffer;
    }else if(previousOperator==='−'||previousOperator==='-'){
        runningTotal-=intBuffer;
    }else if(previousOperator==='×'||previousOperator==='*'){
        runningTotal*=intBuffer;
    }else if(previousOperator==='÷'||previousOperator==='/'){
        runningTotal/=intBuffer;
    }
}
function handleNumber(numberString){
    if(buffer==='0'){
        buffer=numberString;
    }else{
        buffer+=numberString;
    }
}
function handClick(value){
    console.log(value.key)
    if (Symbols.includes(value.key)) {
        //value.preventDefault();
        handleSymbol(value.key);
    }else if(Numbers.includes(value.key)) {
        //value.preventDefault();
        handleNumber(value.key);
    }else if (value.key === 'Enter' || value.key === '=') {
        handleSymbol('=');
    }
    inputField.value = buffer;
}
function init(){
    document.querySelector('.buttons').
    addEventListener('click', function (event){
        buttonClick(event.target.innerText);
    })
    document.addEventListener("keypress",function (event){
        handClick(event);
    })
}
init()