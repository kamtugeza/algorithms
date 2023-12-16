class Node {
    value = null;
    next = null;

    constructor(value) {
        this.value = value;
    }
}

class SinglyLinkedList {
    #head = null;
    #tail = null;
    #length = 0;

    constructor(...initialValues) {
        if (initialValues.length > 0) this.push(...initialValues);
    }

    #getNode(index) {
        if (index < 0 || index >= this.#length) return null;
        let position = 0;
        let current = this.#head;
        while (current.next && position !== index) {
            current = current.next;
            position++;
        }
        return current;
    }

    get(index) {
        return this.#getNode(index)?.value;
    }

    insert(index, value) {
        if (index < 0 || index > this.#length) return false;
        if (index === 0) return this.#length < this.unshift(value);
        if (index === this.#length) return this.#length < this.push(value);
        const parent = this.#getNode(index - 1);
        const node = new Node(value);
        node.next = parent.next;
        parent.next = node;
        this.#length++;
        return true;
    }

    get length() {
        return this.#length;
    }

    pop() {
        if (!this.#head) return undefined;
        let current = this.#head;
        let newTail = this.#head;
        while (current.next) {
            newTail = current;
            current = current.next;
        }
        newTail.next = null;
        this.#tail = newTail;
        this.#length--;
        if (this.length === 0) {
            this.#head = null;
            this.#tail = null;
        }
        return current?.value;
    }

    push(...values) {
        for (const value of values) {
            const node = new Node(value);
            if (!this.#head) this.#head = node;
            if (this.#tail) this.#tail.next = node;
            this.#tail = node;
        }
        this.#length += values.length;
        return this.#length;
    }

    remove(index) {
        if (index < 0 || index >= this.#length) return undefined;
        if (index === 0) return this.shift();
        const tailIndex = this.#length - 1;
        if (index === tailIndex) return this.pop();
        const parent = this.#getNode(index - 1);
        const target = parent.next;
        parent.next = target.next;
        this.#length--;
        return target.value;
    }
    
    set(index, value) {
        const node = this.#getNode(index);
        if (node) {
            node.value = value;
            return true;
        }
        return false;
    }

    shift() {
        if (!this.#head) return undefined;
        const oldHead = this.#head;
        this.#head = oldHead.next;
        if (!this.#head) this.#tail = null;
        this.#length--;
        return oldHead?.value;
    }

    unshift(...values) {
        for (const value of values) {
            const node = new Node(value);
            node.next = this.#head;
            this.#head = node;
            if (!this.#tail) this.#tail = node;
        }
        this.#length += values.length;
        return this.#length;
    }

    static of(...initialValues) {
        return new SinglyLinkedList(...initialValues);
    }
}

module.exports = { SinglyLinkedList };
