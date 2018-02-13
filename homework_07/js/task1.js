'use strict';

const number = window.prompt('Enter the natural number (0 < N <= 20):', '1');

function printPyramid(number) {
    number = Number(number) || -1;

    if (number < 0 || number > 20) {
        console.error('Incorrect data!');
        return;
    }

    let result = '';
    for (let i = 1; i <= number; i++) {

        let pad = new Array(number - i + 1).join('   ');
        let str = new Array(i + i).join('[~]');

        result += pad + str + pad + '\n';
    }

    console.log(result);
}

printPyramid(number);