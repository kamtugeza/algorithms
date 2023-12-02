const assert = require('node:assert/strict');

/**
 * Performs radix sort on an array of integers. Radix sort is a non-comparative integer sorting
 * algorithm that sorts data by processing the individual digits. This implementation handles both
 * positive and negative integers.
 * 
 * @param {number[]} input - The array of integers to be sorted.
 * @returns {number[]} A new array sorted in ascending order.
 */
function radixSort(input) {
    if (input.length < 2) return input;
    let result = input;
    const steps = Math.max(0, ...input.map(item => Math.floor(Math.log10(Math.abs(item))) + 1));
    for (let step = 0; step < steps; step++) result = sortByPlace(result, step);
    return result;
}

assert.deepEqual(radixSort([]), []);
assert.deepEqual(radixSort([2]), [2]);
assert.deepEqual(radixSort([2, 0]), [0, 2]);
assert.deepEqual(radixSort([7, 304, 43, 21]), [7, 21, 43, 304]);
assert.deepEqual(radixSort([-2, 3, 23, -19]), [-19, -2, 3, 23]);

/**
 * Sorts an array of numbers based on a specific digit place.
 * 
 * @param {number[]} input - The array of numbers to be sorted.
 * @param {number} place - The digit place to sort by (e.g., 0 for units place, 1 for tens place, etc.).
 * @returns {number[]} A new array sorted based on the specified digit place.
 */
function sortByPlace(input, place) {
    const result = Array.from({ length: 19 }, () => []);
    for (const item of input) {
        const index = 10 + getDigit(item, place);
        result[index].push(item);
    }
    return result.flat();
}

assert.deepEqual(sortByPlace([], 0), []);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 0), [21, 43, 304, 7]);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 1), [7, 304, 21, 43]);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 2), [7, 43, 21, 304]);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 3), [7, 304, 43, 21]);
assert.deepEqual(sortByPlace([-2, 3, 23, -19], 0), [-19, -2, 3, 23]);


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
 *                             0 corresponds to the ones place, 1 corresponds to the tens place, etc.
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
