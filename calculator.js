const btnContainerDiv = document.querySelector('.button-container');
const numberDisplyDiv = document.querySelector('.number-display');
const buttons = document.querySelectorAll("button");
console.log(buttons);

const validNumPattern = '0123456789';
const validOpPattern = '+-x/';
const equalSymbol = '=';
const changeSignStr = '+/-';

let firstOperand = '';
let secondOperand = '';
let operator = '';
let operatorBtnText = '';

function registerClickListenerToBtns(){
    for (let i = 0; i<btnContainerDiv.children.length;i++){
        const btnRow = btnContainerDiv.children[i];
        for (let j = 0; j<btnRow.children.length;j++){
            const btn = btnRow.children[j];
            btn.addEventListener('click',()=>{
                if (operatorBtnText!==''){
                    if (btn.innerText!==operatorBtnText){
                        useOriginColorForBtn();
                    }
                }
                if (validOpPattern.includes(btn.innerText)){
                    btn.classList.add('highlight-btn');
                    operatorBtnText = btn.innerText;
                }
                buildMathExp(btn);
                numberDisplyDiv.innerText=getTextToDisplay();
                
            });
        }
        
    }
}

function useOriginColorForBtn(){
    for (let i = 0; i<buttons.length;i++){
        const btn = buttons[i];
        if (btn.classList.contains('highlight-btn')){
            btn.classList.remove('highlight-btn');
        }
    }
}

function buildMathExp(btn){
    if (changeSignStr===btn.innerText){
        if (secondOperand!==''){
            secondOperand = (Number(secondOperand)*-1).toString();
            return;
        }
        firstOperand = (Number(firstOperand)*-1).toString();
    }
    else if (validNumPattern.includes(btn.innerText)){
        if (operator===''){
            firstOperand+=btn.innerText;
        }
        else if(operator!==''){
            secondOperand+=btn.innerText;
        }
    }
    else if (validOpPattern.includes(btn.innerText) || equalSymbol.includes(btn.innerText)){
        if (checkMathExpCalculatable()){
            console.log('calculated and reset');
            firstOperand = getMathExpRes();
            secondOperand = '';
            if (equalSymbol.includes(btn.innerText)){
                operator = '';
            }
        }
        if (firstOperand!=='' && validOpPattern.includes(btn.innerText)){
            operator = btn.innerText;
        }
    }
}
    

function checkMathExpCalculatable(){
   if (firstOperand!=='' && secondOperand!=='' && operator!==''){
        return true;
   } 
   return false;
}

function getMathExpRes(){
    let res = 0;
    switch(operator){
        case '+':
            res = Number(firstOperand) + Number(secondOperand);
            break;
        case '-':
            res = Number(firstOperand) - Number(secondOperand);
            break;
        case 'x':
            res = Number(firstOperand) * Number(secondOperand);
            break;
        case '/':
            res = Number(firstOperand) / Number(secondOperand);
            break;
    }
    return res;
}

function getTextToDisplay(){
    if (secondOperand!==''){
        return secondOperand;
    }
    if (firstOperand!==''){
        return firstOperand;
    }
    return '';
}

registerClickListenerToBtns();