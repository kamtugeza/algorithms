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
                
        assert.equal(list.push(10, 30), 3);
        assert.equal(list.get(1), 10);
        assert.equal(list.get(2), 30);
        assert.equal(list.length, 3);

        assert.equal(list.pop(), 30);
        assert.equal(list.get(2), undefined);
        assert.equal(list.length, 2);

        assert.equal(list.pop(), 10);
        assert.equal(list.get(1), undefined);
        assert.equal(list.length, 1);

        assert.equal(list.pop(), 5);
        assert.equal(list.get(0), undefined);
        assert.equal(list.length, 0);

        assert.equal(list.pop(), undefined);
        assert.equal(list.length, 0);
    });

    it('should unshift and shift values to a list and change the length of the list, respectively', () => {
        const list = new SinglyLinkedList();
        assert.equal(list.unshift(4), 1);
        assert.equal(list.get(0), 4);
        assert.equal(list.get(1), undefined);
        assert.equal(list.length, 1);

        assert.equal(list.push(12, 24), 3);
        assert.equal(list.get(1), 12);
        assert.equal(list.get(2), 24);
        assert.equal(list.length, 3);

        assert.equal(list.shift(), 4);
        assert.equal(list.get(0), 12);
        assert.equal(list.length, 2);

        assert.equal(list.shift(), 12);
        assert.equal(list.get(0), 24);
        assert.equal(list.length, 1);

        assert.equal(list.shift(), 24);
        assert.equal(list.get(0), undefined);
        assert.equal(list.length, 0);

        assert.equal(list.shift(), undefined);
        assert.equal(list.length, 0);
    });

    it('replace an item in a list on an index with a provided value', () => {
        const list = new SinglyLinkedList(1, 2, 3);
        assert.equal(list.set(1, 20), true);
        assert.equal(list.get(0), 1);
        assert.equal(list.get(1), 20);
        assert.equal(list.get(2), 3);

        assert.equal(list.set(0, 10), true);
        assert.equal(list.get(0), 10);
        assert.equal(list.get(1), 20);
        assert.equal(list.get(2), 3);

        assert.equal(list.set(-1, 100), false);
        assert.equal(list.get(0), 10);
        assert.equal(list.get(1), 20);
        assert.equal(list.get(2), 3);

        assert.equal(list.set(3, 40), false);
        assert.equal(list.get(0), 10);
        assert.equal(list.get(1), 20);
        assert.equal(list.get(2), 3);
        assert.equal(list.get(3), undefined);
    });

    it('insert a new value on an index and shift the reset items of a list', () => {
        const list = new SinglyLinkedList(1, 2, 3);
        assert.equal(list.insert(-1, 100), false);
        assert.equal(list.length, 3);

        assert.equal(list.insert(0, 10), true);
        assert.equal(list.get(0), 10);
        assert.equal(list.get(1), 1);
        assert.equal(list.get(2), 2);
        assert.equal(list.get(3), 3);
        assert.equal(list.length, 4);

        assert.equal(list.insert(4, 40), true);
        assert.equal(list.get(0), 10);
        assert.equal(list.get(1), 1);
        assert.equal(list.get(2), 2);
        assert.equal(list.get(3), 3);
        assert.equal(list.get(4), 40);
        assert.equal(list.length, 5);

        assert.equal(list.insert(6, 500), false);
        assert.equal(list.length, 5);

        assert.equal(list.insert(1, 100), true);
        assert.equal(list.get(0), 10);
        assert.equal(list.get(1), 100);
        assert.equal(list.get(2), 1);
        assert.equal(list.get(3), 2);
        assert.equal(list.get(4), 3);
        assert.equal(list.get(5), 40);
        assert.equal(list.length, 6);
    });

    it('remove an item of a list on an index and decrease the length of the list', () => {
        const list = new SinglyLinkedList(1, 2, 3, 4, 5);
        assert.equal(list.remove(-1), undefined);
        assert.equal(list.length, 5);

        assert.equal(list.remove(0), 1);
        assert.equal(list.get(0), 2);
        assert.equal(list.length, 4);

        assert.equal(list.remove(1), 3);
        assert.equal(list.get(1), 4);
        assert.equal(list.length, 3);

        assert.equal(list.remove(2), 5);
        assert.equal(list.get(3), undefined);
        assert.equal(list.length, 2);

        assert.equal(list.remove(2), undefined);
        assert.equal(list.length, 2);
    })
});
