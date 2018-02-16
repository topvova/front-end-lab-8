'use strict';

const getClosestToZero = (...args) => {
    return args.sort((x, y) => Math.abs(x) - Math.abs(y))[0];
};