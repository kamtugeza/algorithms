const assert = require('node:assert/strict');

/**
 * Performs an in-place quicksort on the given array.
 * This function mutates the original array by sorting its elements.
 * 
 * @param {number[]} arr - The array to be sorted.
 * @param {number} [startIdx=0] - The starting index for the sort operation, default is 0.
 * @param {number} [endIdx=arr.length - 1] - The ending index for the sort operation, default is the last index of the array.
 * @returns {void} Does not return a value; the array is sorted in place.
 *
 * @example
 * let myArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
 * quickSortMutation(myArray);
 * console.log(myArray); // Output: [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9]
 */
function quickSort(arr, startIdx = 0, endIdx = arr.length - 1) {
    if (arr.length <= 1) return arr;
    let targetIdx = startIdx;
    for (let i = startIdx + 1; i <= endIdx; i++) {
        if (arr[i] > arr[targetIdx]) continue;
        move(arr, i, targetIdx);
        targetIdx++;
    }
    const isNested = (endIdx - startIdx) >= 2;
    if (!isNested) return arr;
    quickSort(arr, startIdx, targetIdx - 1);
    quickSort(arr, targetIdx + 1, endIdx);
    return arr;
}

assert.deepEqual(quickSort([]), []);
assert.deepEqual(quickSort([1]), [1]);
assert.deepEqual(quickSort([2, 1]), [1, 2]);
assert.deepEqual(quickSort([2, 3, 1]), [1, 2, 3]);
assert.deepEqual(quickSort([3, 2, 34, 1, 14]), [1, 2, 3, 14, 34]);
assert.deepEqual(quickSort([74, 98, 88, 12, 93, 31, 63, 33, 89]), [12, 31, 33, 63, 74, 88, 89, 93, 98]);

/**
 * Moves an item in the array from one position to another. This method mutates the original array.
 *
 * @param {number[]} arr - The array to be modified.
 * @param {number} fromIdx - The index of the item to move. Must be within the bounds of the array.
 * @param {number} toIdx - The new index for the item. Must be within the bounds of the array.
 * @returns {number[]} The original array with the item moved to the new position.
 * 
 * @example
 * let myArray = [1, 2, 3, 4, 5];
 * move(myArray, 0, 3);
 * console.log(myArray); // Output: [2, 3, 4, 1, 5]
 */
function move(arr, fromIdx, toIdx) {
    const isUnique = fromIdx !== toIdx;
    const isFromIdxValid = fromIdx >= 0 && fromIdx < arr.length;
    const isToIdxValid = toIdx >= 0 && toIdx < arr.length;
    const isValidInput = isUnique && isFromIdxValid && isToIdxValid;
    if (!isValidInput) return arr;
    const [ item ] = arr.splice(fromIdx, 1);
    arr.splice(toIdx, 0, item);
    return arr;
}

assert.deepEqual(move([1, 2, 3], 1, 0), [2, 1, 3]);
assert.deepEqual(move([1, 2, 3], 2, 0), [3, 1, 2]);
assert.deepEqual(move([1, 2, 3], 0, 0), [1, 2, 3]);
assert.deepEqual(move([1, 2, 3], 4, 0), [1, 2, 3]);
assert.deepEqual(move([1, 2, 3], -2, 0), [1, 2, 3]);
assert.deepEqual(move([1, 2, 3], 1, 4), [1, 2, 3]);
assert.deepEqual(move([1, 2, 3], 2, -3), [1, 2, 3]);
