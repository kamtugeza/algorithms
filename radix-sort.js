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
    for (let step = 0; step < steps; step++) sortByPlace(input, step);
    return input;
}

const input = [];
assert.equal(radixSort(input), input);
assert.deepEqual(radixSort([2]), [2]);
assert.deepEqual(radixSort([2, 0]), [0, 2]);
assert.deepEqual(radixSort([7, 304, 43, 21]), [7, 21, 43, 304]);
assert.deepEqual(radixSort([-2, 3, 23, -19]), [-19, -2, 3, 23]);
assert.deepEqual(radixSort([123, -456, 789, 0, -1]), [-456, -1, 0, 123, 789]);

/**
 * Sorts an array of integers in-place based on a specific digit place. It rearranges
 * the input array elements according to the digit at the specified place value.
 *
 * @param {number[]} input - The array of integers to be sorted.
 * @param {number} place - The digit place to sort by (e.g., 0 for units place, 1 for tens place, etc.).
 * @returns {number[]} The input array sorted in-place based on the specified digit place.
 * 
 * @example
 * sortByPlace([123, 456, 789, 1], 0); // Might rearrange array to [1, 123, 456, 789]
 * sortByPlace([123, 456, 789, 1], 1); // Might rearrange array to [1, 123, 789, 456]
 */
function sortByPlace(input, place) {
    const position = buildPosition(place);
    for (let i = 0; i < input.length; i++) {
        const item = input[i];
        const index = position.get(item);
        input.splice(i, 1);
        input.splice(index, 0, item);
        position.set(item, index);
    }
    return input;
}

assert.equal(sortByPlace(input, 0), input);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 0), [21, 43, 304, 7]);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 1), [7, 304, 21, 43]);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 2), [7, 43, 21, 304]);
assert.deepEqual(sortByPlace([7, 304, 43, 21], 3), [7, 304, 43, 21]);
assert.deepEqual(sortByPlace([-2, 3, 23, -19], 0), [-19, -2, 3, 23]);
assert.deepEqual(sortByPlace([7, 304, 43, 21, 7], 0), [21, 43, 304, 7, 7]);

function buildPosition(place) {
    const offset = 9;
    const indexes = Array.from({ length: 19 }, () => -1);

    function getKey(digit) {
        return getDigit(digit, place) + offset;
    }

    function get(digit) {
        const key = getKey(digit, place);
        const index = indexes[key] >= 0 ? indexes[key] : Math.max(...indexes.slice(0, key));
        return index + 1;
    }

    function set(digit, index) {
        const key = getKey(digit, place);
        indexes[key] = index;
        for (let i = key + 1; i < indexes.length; i++) {
            if (indexes[i] >= 0) indexes[i] += 1;
        }
    }

    return { get, set };
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
