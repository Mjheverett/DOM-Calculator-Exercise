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
        console.log("numkey", displayArr);
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
            console.log("replacing operator char", displayArr)
        } else if (currentValues.length == 0) {
            alert("Type a number first");
        } else {
            display.innerText += element.innerHTML;
            displayArr = [...displayArr, element.innerHTML];
            console.log(displayArr);
        }
    })
})

equals.addEventListener('click', function (event) {
    event.preventDefault();
    console.log("equal button displayArr", displayArr);

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
    console.log("The calcarr inside equals", calcArr);

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
        const addNums = [];
        addNums.push(calcArr[addition-1], calcArr[addition+1]);
        console.log("addnums", addNums);
        var sum = addNums.reduce(function(a, b) {return a + b;},0);
        console.log("sum", sum)
        console.log("calcArr", calcArr)
        calcArr.splice(addition-1, 3, sum);
        console.log("after addition", calcArr);
        addition = calcArr.indexOf('+');
    };

    let subtraction = calcArr.indexOf('-');
    while (subtraction !== -1) {
        calcArr.splice(subtraction-1, 3, calcArr[subtraction-1] - calcArr[subtraction+1]);
        subtraction = calcArr.indexOf('-');
    };
    
    displayArr = [];
    displayArr.push(calcArr);
    console.log("display after equals", display.innerText);
    displayArr = calcArr.toString();
    console.log("displayArr after equals", displayArr);
    console.log("calcArr after equals", calcArr);
    display.innerText = calcArr.toString();
    console.log(display.innerText);
})

clear.addEventListener('click', function (event) {
    event.preventDefault();
    display.innerText = '';
    displayArr = [];
})