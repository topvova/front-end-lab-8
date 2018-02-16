'use strict';

const isPrime = (number) => {
    if (number < 2) {
            return false;
        }
        for (let j = 2; j <= number / 2; j++) {
            if (number % j === 0) {
                return false;
            }
        }
        return true;
};