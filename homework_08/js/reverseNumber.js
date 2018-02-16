'use strict';

const reverseNumber = (number) => {
    const str = String(number);
    const rev = str.split('').reverse();
    return number < 0 ? -parseInt(rev.join('')) : parseInt(rev.join(''));
};