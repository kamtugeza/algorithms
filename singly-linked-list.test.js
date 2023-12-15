const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const { SinglyLinkedList } = require('./singly-linked-list');

describe('SinglyLinkedList', () => {
    it('create a list with initial values', () => {
        assert.equal(new SinglyLinkedList().length, 0);
        
        const list = new SinglyLinkedList(1, 2);
        assert.equal(list.get(0), 1);
        assert.equal(list.get(1), 2);
        assert.equal(list.length, 2);
    });

    it('should push and pop values to a list and change the length of the list, respectively', () => {
        const list = new SinglyLinkedList();
        assert.equal(list.push(5), 1);
        assert.equal(list.get(0), 5);
        assert.equal(list.get(1), undefined);
        assert.equal(list.length, 1);
        
        assert.equal(list.push(15), 2);
        assert.equal(list.get(0), 5);
        assert.equal(list.get(1), 15);
        assert.equal(list.length, 2);
        
        assert.equal(list.push(10, 30), 4);
        assert.equal(list.get(2), 10);
        assert.equal(list.get(3), 30);
        assert.equal(list.length, 4);

        assert.equal(list.pop(), 30);
        assert.equal(list.get(3), undefined);
        assert.equal(list.length, 3);

        assert.equal(list.pop(), 10);
        assert.equal(list.get(2), undefined);
        assert.equal(list.length, 2);
    });
});
