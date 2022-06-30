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
const clearBtn = 'AC';

const exp = [];

let operatorBtnText = '';

function NumObj(digit){
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
    if (clearBtn == btn.innerText){
        exp.length = 0;
    }
    else if (dotSymbol === btn.innerText){
        addDotToCurNum();
    }   
    else if (percentSymbol === btn.innerText){
        divideCurNumByOneHundred();
    }
    else if (changeSignStr === btn.innerText){
        changeSignOfCurNum();
    }
    else if (equalSymbol === btn.innerText){
        if (exp.length === 3){
            operate();
        }
    }
    else if (validNumPattern.includes(btn.innerText)){
        const numObj = new NumObj(btn.innerText);
        if (exp.length === 0){
            exp.push(numObj);
            console.log(exp);
            return;
        }
        const lastObj = exp[exp.length-1];
        if (lastObj instanceof NumObj){
            if (lastObj.digit.length<12){
                lastObj.digit+=btn.innerText;
            }
            
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

function addDotToCurNum(){
    if (exp.length === 3){
        if (!exp[2].digit.includes(dotSymbol)){
            exp[2].digit+=dotSymbol;
        }
    }

    else if (exp.length<=2){
        if (exp.length === 0){
            exp.push(new NumObj('0'));
            exp[0].digit+=dotSymbol;
            return;
        }
        if (!exp[0].digit.includes(dotSymbol)){
            exp[0].digit+=dotSymbol;
        }
    }
}

function divideCurNumByOneHundred(){
    if (exp.length <= 2){
        exp[0].digit = getRoundedNum((Number(exp[0].digit)/100)).toString();
    }
    else if (exp.length === 3){
        exp[2].digit = getRoundedNum((Number(exp[2].digit)/100)).toString();
    }
}

function changeSignOfCurNum(){
    if (exp.length <= 2){
        exp[0].digit = getRoundedNum((Number(exp[0].digit)*-1)).toString();
    }
    else if (exp.length === 3){
        exp[2].digit = getRoundedNum((Number(exp[2].digit)*-1)).toString();
    }
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
    
    exp[0].digit = getRoundedNum(res);
    exp.pop();
    exp.pop();
}

function getRoundedNum(num){
    let roundedNum = num;
    if (roundedNum >= 1000000000){
        roundedNum = roundedNum.toExponential();
    }
    else{
        if (roundedNum - parseInt(roundedNum) === 0){
            roundedNum = roundedNum.toString();
        }
        else{
            roundedNum = roundedNum.toFixed(2);
        }
    }

    return roundedNum;
}

function getDisplayText(){
    if (exp.length === 0){
        return '0';
    }
    if (exp.length <= 2){
        return exp[0].digit;
    }
    return exp[2].digit;
}


registerClickListenerToBtns();