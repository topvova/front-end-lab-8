'use strict';

let times = 0;
let triangle = {};

do {
    let input = +prompt('Enter triangle ' + (times + 1) + ' side length:', '0');
    if (isNaN(input)) {
        alert('Enter a number, please');
        continue;
    }
    triangle['s' + (times + 1)] = Math.abs(input);
    times++;
} while (times < 3);

console.log('Type of triangle is ' + getTriangleType(triangle['s1'], triangle['s2'], triangle['s3']) +
    ' and square is ' + getTriangleSquare(triangle['s1'], triangle['s2'], triangle['s3']));

function getTriangleSquare(s1, s2, s3) {
    const p = (s1 + s2 + s3) / 2;
    return Math.sqrt(p * (p - s1) * (p - s2) * (p - s3)).toPrecision(3);
}

function getTriangleType(s1, s2, s3) {
    let message = '';
    if (s1 === Math.hypot(s2, s3)) {
        message = 'Right triangle';
    } else if (s1 === s2 && s2 === s3) {
        message = 'Equilateral triangle';
    } else if (s1 === s2 || s1 === s3 || s2 === s3) {
        message = 'Isosceles triangle';
    } else if (s1 !== s2 && s2 !== s3 && s3 !== s1) {
        message = 'Scalene triangle';
    } else {
        message = 'Incorrect data';
    }
    return message;
}

