const assert = require('node:assert/strict');

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const midIdx = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, midIdx));
    const right = mergeSort(arr.slice(midIdx));
    return merge(left, right);
}

function merge(left, right) {
    let leftIdx = 0;
    let rightIdx = 0;
    let result = []
    while (leftIdx < left.length && rightIdx < right.length) {
        const leftItem = left[leftIdx];
        const rightItem = right[rightIdx];
        if (leftItem > rightItem) {
            result.push(rightItem);
            rightIdx++;
        } else {
            result.push(leftItem);
            leftIdx++;
        }
    };
    const isRight = left.length === leftIdx;
    const restArr = isRight ? right : left;
    const restIdx = isRight ? rightIdx : leftIdx;
    const restItems = restIdx - restArr.length;
    if (restItems < 0) result.push(...restArr.slice(restItems));
    return result;
}

assert.deepEqual(mergeSort([-3, 1, 2, -2, 0, 3, -1]), [-3, -2, -1, 0, 1, 2, 3]);
assert.deepEqual(mergeSort([1,100,2,4,5]), [1,2,4,5,100]);