const assert = require('node:assert/strict');

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    } 
}

class SingleLinkedList {
    constructor(...initialValues) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.push(...initialValues);
    }

    push(...values) {
        for (const value of values) {
            const node = new Node(value);
            if (!this.head) this.head = node;
            if (this.tail) this.tail.next = node;
            this.tail = node;
        }
        this.length += values.length;
    }
}

const list = new SingleLinkedList();
assert.equal(list.head, null);
assert.equal(list.tail, null);
assert.equal(list.length, 0);

list.push(10);
assert.equal(list.head.value, 10);
assert.equal(list.tail.value, 10);
assert.equal(list.length, 1);

list.push(1, 43);
assert.equal(list.head.value, 10);
assert.equal(list.tail.value, 43);
assert.equal(list.length, 3);
