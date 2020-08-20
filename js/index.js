'use strict';

const display = document.getElementById('input');
const numKeys = document.querySelectorAll('.number');
const opKeys = document.querySelectorAll('.operator');

let displayArr = [];

numKeys.forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        displayArr.push(element.innerHTML);
        display.innerText += element.innerHTML;
        console.log(displayArr);
    })
})

opKeys.forEach(function (element) {
    element.addEventListener('click', function (event) {
        event.preventDefault();
        let currentValues = display.innerText;
        let lastChar = currentValues[currentValues.length - 1];
        if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "%") {
            const newString = currentValues.substring(0,currentValues.length-1) + element.innerHTML;
            display.innerText = newString;
        } else if (currentValues.length == 0) {
            alert("Type a number first");
        } else {
            displayArr.push(element.innerHTML);
            display.innerText += element.innerHTML;
        }
    })
})

equals.addEventListener('click', function (event) {
    event.preventDefault();
    let multiplication = displayArr.indexOf('*');
    let division = displayArr.indexOf('%');
    let addition = displayArr.indexOf('+');
    let subtraction = displayArr.indexOf('-');

    while (multiplication !== -1) {
        displayArr.splice(multiplication-1, 3, displayArr[multiplication-1] * displayArr[multiplication+1]);
        multiplication = displayArr.indexOf('*');
    };

    while (division !== -1) {
        displayArr.splice(division-1, 3, displayArr[division-1] / displayArr[division+1]);
        division = displayArr.indexOf('%');
    };

    // need to fix converting to integer before adding so that it does not concatenate strings
    while (addition !== -1) {
        displayArr.splice(addition-1, 3, displayArr[addition-1] + displayArr[addition+1]);
        addition = displayArr.indexOf('+');
    };

    while (subtraction !== -1) {
        displayArr.splice(subtraction-1, 3, displayArr[subtraction-1] - displayArr[subtraction+1]);
        subtraction = displayArr.indexOf('-');
    };

    display.innerText = displayArr;
})

clear.addEventListener('click', function (event) {
    event.preventDefault();
    display.innerText = '';
    displayArr = [];
})