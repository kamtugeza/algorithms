const assert = require('node:assert/strict');

function quickSort(input) {
    if (input.length < 1) return input;
    const target = input[0];
    const lessVals = [];
    const greaterVals = [];
    for (let i = 1; i < input.length; i++) {
        const item = input[i];
        if (item <= target) lessVals.push(item);
        else greaterVals.push(item);
    }
    return [...quickSort(lessVals), target, ...quickSort(greaterVals)];
}

assert.deepEqual(quickSort([]), []);
assert.deepEqual(quickSort([1]), [1]);
assert.deepEqual(quickSort([2, 1]), [1, 2]);
assert.deepEqual(quickSort([3, 2, 34, 1, 14]), [1, 2, 3, 14, 34]);
assert.deepEqual(quickSort([74, 98, 88, 12, 93, 31, 63, 33, 89]), [12, 31, 33, 63, 74, 88, 89, 93, 98]);
