const assert = require('node:assert/strict');

/**
 * Performs an in-place radix sort on an array of integers. It handles both positive and negative
 * integers. This implementation sorts the array in place, meaning the original array is modified
 * rather than a new sorted array is created.
 *
 * @param {number[]} input - The array of integers to be sorted.
 * @returns {number[]} The same array sorted in ascending order.
 * 
 * @example
 * radixSort([123, -456, 789, 0, -1]); // Sorts the array in-place to [-456, -1, 0, 123, 789]
 */
function radixSort(input) {
    if (input.length < 2) return input;
    const steps = Math.max(0, ...input.map(item => Math.floor(Math.log10(Math.abs(item))) + 1));
    const position = buildPosition();
    for (let step = 0; step < steps; step++) {
        for (let i = 0; i < input.length; i++) {
            const item = input[i];
            const index = position.get(item, step);
            input.splice(i, 1);
            input.splice(index, 0, item);
            position.set(item, step, index);
        }
        position.reset();
    }
    return input;
}

const input = [];
assert.equal(radixSort(input), input);
assert.deepEqual(radixSort([2]), [2]);
assert.deepEqual(radixSort([2, 0]), [0, 2]);
assert.deepEqual(radixSort([7, 304, 43, 21]), [7, 21, 43, 304]);
assert.deepEqual(radixSort([-2, 3, 23, -19]), [-19, -2, 3, 23]);
assert.deepEqual(radixSort([123, -456, 789, 0, -1]), [-456, -1, 0, 123, 789]);

function buildPosition() {
    const offset = 9;
    const indexes = Array.from({ length: 19 }, () => -1);

    function getKey(digit, place) {
        return getDigit(digit, place) + offset;
    }

    function get(digit, place) {
        const key = getKey(digit, place);
        const index = indexes[key] >= 0 ? indexes[key] : Math.max(...indexes.slice(0, key));
        return index + 1;
    }

    function set(digit, place, index) {
        const key = getKey(digit, place);
        indexes[key] = index;
        for (let i = key + 1; i < indexes.length; i++) {
            if (indexes[i] >= 0) indexes[i] += 1;
        }
    }

    function reset() {
        indexes.fill(-1);
    }

    return { get, set, reset };
}

/**
 * Extracts a specific digit from a number.
 *
 * This function takes a number and a place value and returns the digit
 * at that place in the number. The digits are counted from right to left,
 * starting at the 0th place (the ones place). For example, in the number 12345,
 * the digit in the 0th place is 5, in the 1st place is 4, and so on.
 * 
 * @param {number} input - The number from which to extract the digit.
 * @param {number} place - The place value of the digit to extract.
 * 
 * @returns {number} The digit at the specified place in the input number.
 */
function getDigit(input, place) {
    const round = input >= 0 ? Math.floor : Math.ceil;
    return round(input / 10 ** place) % 10;
}

assert.equal(getDigit(0, -1), 0);
assert.equal(getDigit(-19, 1), -1);
assert.equal(getDigit(-1, 0), -1);
assert.equal(getDigit(0, 0), 0);
assert.equal(getDigit(1594, -2), 0);
assert.equal(getDigit(1594, -1), 0);
assert.equal(getDigit(1594, 0), 4);
assert.equal(getDigit(1594, 1), 9);
assert.equal(getDigit(1594, 2), 5);
assert.equal(getDigit(1594, 3), 1);
assert.equal(getDigit(1594, 4), 0);
