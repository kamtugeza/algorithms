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

    pop() {
        if (!this.head) return undefined;
        let current = this.head;
        let newTail = this.head;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        newTail.next = null;
        this.tail = newTail;
        this.length--;
        if (this.length === 0) {
            this.head = null;
            this.tail = null;
        }
        return current;
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

assert.equal(list.pop().value, 10);
assert.equal(list.head, null);
assert.equal(list.tail, null);
assert.equal(list.length, 0);

assert.equal(list.pop(), undefined);
assert.equal(list.head, null);
assert.equal(list.tail, null);
assert.equal(list.length, 0);

list.push(20, 1, 43);
assert.equal(list.head.value, 20);
assert.equal(list.tail.value, 43);
assert.equal(list.length, 3);

assert.equal(list.pop().value, 43);
assert.equal(list.head.value, 20);
assert.equal(list.tail.value, 1);
assert.equal(list.length, 2);
