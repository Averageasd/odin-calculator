const btnContainerDiv = document.querySelector('.button-container');
const numberDisplyDiv = document.querySelector('.number-display');
const buttons = document.querySelectorAll("button");
console.log(buttons);

const validNumPattern = '0123456789';
const validOpPattern = '+-x/';
const equalSymbol = '=';
const changeSignStr = '+/-';
const percentSymbol = '%';
const dotSymbol = '.';

const exp = [];

let operatorBtnText = '';

function NumObj(digit){
    this.sign = '';
    this.digit = digit;
}

function OperatorObj(op){
    this.op = op;
}

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
                numberDisplyDiv.innerText = getDisplayText();

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
    if (validNumPattern.includes(btn.innerText)){
        const numObj = new NumObj(btn.innerText);
        if (exp.length === 0){
            exp.push(numObj);
            console.log(exp);
            return;
        }
        const lastObj = exp[exp.length-1];
        if (lastObj instanceof NumObj){
            lastObj.digit+=btn.innerText;
            exp[exp.length-1] = lastObj;
        }
        else{
            exp.push(numObj);
        }
    }

    else if (validOpPattern.includes(btn.innerText)){
        if (exp.length>=1){
            const operatorObj = new OperatorObj(btn.innerText);
            if (exp.length === 1){
                exp.push(operatorObj);
                console.log(exp);
                return;
            }
            if (exp.length === 2){
                exp[1] = operatorObj;
                console.log(exp);
                return;
            }
            operate();
            exp.push(operatorObj);
        }
    }

    console.log(exp);
}

function operate(){
    let n1 = Number(exp[0].digit);
    let n2 = Number(exp[2].digit);
    let res = 0;
    let operator = exp[1].op;
    switch(operator){
        case '+':
            res = (n1+n2);
            break;
        case '-':
            res = (n1-n2);
            break;
        case '/':
            res = (n1/n2);
            break;
        case 'x':
            res = (n1*n2);
            break;
    }
    if (res > 1000000000){
        res = res.toExponential();
    }
    res = res.toFixed(2);
    exp[0].digit = res;
    exp.pop();
    exp.pop();
}

function getDisplayText(){
    return '0';
}


registerClickListenerToBtns();