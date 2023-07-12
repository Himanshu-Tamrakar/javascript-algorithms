

function Node(item, next = null) {
    this.item = item;
    this.next = next;
}

function Stack_Link_List(stack = null) {
    this.N = 0;
    this.first = null;
    this.last = null;

    if (stack && stack.first) {
        this.first = new Node(stack.first.item, stack.first.next);
        let x;
        for (x = this.first; x.next; x = x.next) {
            x.next = new Node(x.next.item, x.next.next);
            
        }

        this.last = x;

        this.N = stack.size();
        
    }


}

// recursive copy
function copy(x) {
    if (!x) {
        return null;
    }

    const node = new Node(x.item);

    node.next = copy(x.next);


    return node;
}

Stack_Link_List.prototype.push = function(item) {
    if (!this.N) {
        this.first = new Node(item, null);
        this.last = this.first;
    } else {
        let oldFirst = this.first;
        this.first = new Node(item, oldFirst);
        oldFirst = null;
    }

    this.N++;
}

Stack_Link_List.prototype.pop = function() {
    if (!this.N) {
        throw new Error('Stack is empty');
    }
    const val = this.first.item;

    if (this.N === 1) {
        this.first = this.last = null;
    } else {
        this.first = this.first.next;
    }

    this.N--;
    return val;
}

Stack_Link_List.prototype.size = function() {
    return this.N;
}

Stack_Link_List.prototype.isEmpty = function() {
    if(!this.N) {
        return true;
    }

    return false;
}

Stack_Link_List.prototype[Symbol.iterator] = function() {
    let f = this.first;
    let n = this.N;
    return {
        next: () => {
            if (f) {
                const res = { value: f.item, done: false };
                f = f.next;
                return res;
            } else {
                return {value: null, done: true}
            }
        },
        return: (n) => {
            return { value: n, done: true};
        } 
    }
}



export { Stack_Link_List };