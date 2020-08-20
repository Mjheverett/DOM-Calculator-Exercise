'use strict';

const display = document.getElementById('input');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.operator');

let displayArr = [];

numKeys.forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        display.innerText += element.innerHTML;
        displayArr = [...displayArr, element.innerHTML];
    })
})

opKeys.forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        // displayArr.push(display.innerHTML);
        // console.log(displayArr);
        let currentValues = display.innerText;
        let lastChar = currentValues[currentValues.length - 1];
        if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "%") {
            const newString = currentValues.substring(0,currentValues.length-1) + element.innerHTML;
            display.innerText = newString;
            displayArr[displayArr.length-1] = element.innerHTML;
        } else if (currentValues.length == 0) {
            alert("Type a number first");
        } else {
            display.innerText += element.innerHTML;
            displayArr = [...displayArr, element.innerHTML];
        }
    })
})

equals.addEventListener('click', function (event) {
    event.preventDefault();
    let numStringHolder = "";
    let calcArr = [];
    
    for (let char of displayArr) {
        const numReg = /\d/;
        if (numReg.test(char) || char === '.') {
            numStringHolder += char;
        } else {
            calcArr = [...calcArr, Number(numStringHolder), char];
            numStringHolder = "";
        }
    }

    calcArr = [...calcArr, Number(numStringHolder)];
    let multiplication = calcArr.indexOf('*');
    while (multiplication !== -1) {
        calcArr.splice(multiplication-1, 3, calcArr[multiplication-1] * calcArr[multiplication+1]);
        multiplication = calcArr.indexOf('*');
    };

    let division = calcArr.indexOf('%');
    while (division !== -1) {
        calcArr.splice(division-1, 3, calcArr[division-1] / calcArr[division+1]);
        division = calcArr.indexOf('%');
    };

    let addition = calcArr.indexOf('+');
    while (addition !== -1) {
        calcArr.splice(addition-1, 3, calcArr[addition-1] + calcArr[addition+1]);
        addition = calcArr.indexOf('+');
    };

    let subtraction = calcArr.indexOf('-');
    while (subtraction !== -1) {
        calcArr.splice(subtraction-1, 3, calcArr[subtraction-1] - calcArr[subtraction+1]);
        subtraction = calcArr.indexOf('-');
    };

    displayArr = [];
    displayArr.push(calcArr);
    displayArr = calcArr.toString();
    display.innerText = calcArr.toString();
})

clear.addEventListener('click', function (event) {
    event.preventDefault();
    display.innerText = '';
    displayArr = [];
})