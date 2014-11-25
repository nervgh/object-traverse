


describe('Object.traverse() must be defined', function() {
    it('Object.traverse to be defined', function() {
        expect(Object.traverse).toBeDefined();
    });
});



describe('By default callback context is Window', function() {
    var object = {
        foo: {}
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        stack.push(this);
    });

    it('Callback context is undefined', function() {
        expect(stack.pop()).toBe(window);
    });
});




describe('Custom callback context', function() {
    var object = {
        foo: {}
    };
    var stack = [];
    var context = {};

    Object.traverse(object, function(node, value, key, path, depth) {
        stack.push(this);
    }, context);

    it('Callback context is {}', function() {
        expect(stack.pop()).toBe(context);
    });
});



describe('By default tree traverse method is vertical', function() {
    var push = Array.prototype.push;
    var object = {
        foo: {
            bar: {
                number: 1
            },
            string: 'walker'
        }
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        push.apply(stack, arguments);
    });

    it('foo [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object);
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe('foo');
        expect(stack.shift().join('.')).toBe('foo');
        expect(stack.shift()).toBe(0);
    });
    it('foo.bar [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe(object.foo.bar);
        expect(stack.shift()).toBe('bar');
        expect(stack.shift().join('.')).toBe('foo.bar');
        expect(stack.shift()).toBe(1);
    });
    it('foo.bar.number [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo.bar);
        expect(stack.shift()).toBe(object.foo.bar.number);
        expect(stack.shift()).toBe('number');
        expect(stack.shift().join('.')).toBe('foo.bar.number');
        expect(stack.shift()).toBe(2);
    });
    it('foo.string [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe(object.foo.string);
        expect(stack.shift()).toBe('string');
        expect(stack.shift().join('.')).toBe('foo.string');
        expect(stack.shift()).toBe(1);
    });
});



describe('Tree traverse method is vertical (mode=0)', function() {
    var push = Array.prototype.push;
    var object = {
        foo: {
            bar: {
                number: 1
            },
            string: 'walker'
        }
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        push.apply(stack, arguments);
    }, null, 0);

    it('foo [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object);
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe('foo');
        expect(stack.shift().join('.')).toBe('foo');
        expect(stack.shift()).toBe(0);
    });
    it('foo.bar [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe(object.foo.bar);
        expect(stack.shift()).toBe('bar');
        expect(stack.shift().join('.')).toBe('foo.bar');
        expect(stack.shift()).toBe(1);
    });
    it('foo.bar.number [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo.bar);
        expect(stack.shift()).toBe(object.foo.bar.number);
        expect(stack.shift()).toBe('number');
        expect(stack.shift().join('.')).toBe('foo.bar.number');
        expect(stack.shift()).toBe(2);
    });
    it('foo.string [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe(object.foo.string);
        expect(stack.shift()).toBe('string');
        expect(stack.shift().join('.')).toBe('foo.string');
        expect(stack.shift()).toBe(1);
    });
});



describe('Tree traverse method is horizontal (mode=1)', function() {
    var push = Array.prototype.push;
    var object = {
        foo: {
            bar: {
                number: 1
            },
            string: 'walker'
        }
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        push.apply(stack, arguments);
    }, null, 1);

    it('foo [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object);
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe('foo');
        expect(stack.shift().join('.')).toBe('foo');
        expect(stack.shift()).toBe(0);
    });
    it('foo.bar [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe(object.foo.bar);
        expect(stack.shift()).toBe('bar');
        expect(stack.shift().join('.')).toBe('foo.bar');
        expect(stack.shift()).toBe(1);
    });
    it('foo.string [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo);
        expect(stack.shift()).toBe(object.foo.string);
        expect(stack.shift()).toBe('string');
        expect(stack.shift().join('.')).toBe('foo.string');
        expect(stack.shift()).toBe(1);
    });
    it('foo.bar.number [node, value, key, path, depth]', function() {
        expect(stack.shift()).toBe(object.foo.bar);
        expect(stack.shift()).toBe(object.foo.bar.number);
        expect(stack.shift()).toBe('number');
        expect(stack.shift().join('.')).toBe('foo.bar.number');
        expect(stack.shift()).toBe(2);
    });
});



describe('Prevent step into next node', function() {
    var object = {
        foo: {
            bar: {
                number: 1
            },
            string: 'walker'
        }
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        stack.push(true);
        return true;
    });

    it('stack length is 1', function() {
        expect(stack.length).toEqual(1);
    });
});



describe('Breaking loop', function() {
    var object = {
        foo: {
            bar: {
                number: 1
            },
            string: 'walker'
        }
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        stack.push(true);
        if (value === 1) return false;
    });

    it('stack length is 3', function() {
        expect(stack.length).toEqual(3);
    });
});



describe('Circular references (exception)', function() {
    var object = {
        foo: {
            bar: undefined,
            number: 1
        }
    };
    object.foo.bar = object;
    var stack = [];

    try {
        Object.traverse(object, function(node, value, key, path, depth) {
            stack.push(true);
        });
    } catch (e) {
        var error = e;
    }

    it('if detected circular reference then will throw an exception', function() {
        expect(stack.length).toEqual(2);
        expect(error instanceof Error).toBe(true);
    });
});



describe('Circular references (ignore)', function() {
    var object = {
        foo: {
            bar: undefined,
            number: 1
        }
    };
    object.foo.bar = object;
    var stack = [];

    try {
        Object.traverse(object, function(node, value, key, path, depth) {
            stack.push(true);
        }, null, 0, true);
    } catch (e) {
        var error = e;
    }

    it('ignoreCircularReferences=true', function() {
        expect(stack.length).toEqual(3);
        expect(error instanceof Error).toBe(false);
    });
});



describe('Max depth', function() {
    var object = {
        foo: {
            bar: {
                number: 1
            },
            string: 'walker'
        }
    };
    var stack = [];

    Object.traverse(object, function(node, value, key, path, depth) {
        stack.push(true);
    }, null, null, null, 1);

    it('maxDepth=1', function() {
        expect(stack.length).toEqual(3);
    });
});



describe('Object.traverse() returns same object', function() {
    var object = {};

    it('Return same object', function() {
        expect(Object.traverse(object, function() {})).toBe(object);
    });
});