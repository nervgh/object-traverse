# Object.traverse()

## About
Traverses the tree (javascript object) recursively and calls function for each node key

## Required
ES5 Object.keys(), Array.prototype.indexOf()

## Syntax
```js
Object.traverse(object /*{Object|Array}*/, callback, [context, [mode=0, [ignoreCircularReferences=false, [maxDepth=100]]]]);

Object.traverse(tree, function(node, value, key, path, depth) {
    // node is current node
    // value is node[key] value
    // key is key of node
    // path is path to node
    // depth is current depth
});
```

## Tree traverse methods
By default method cross of tree is vertical `mode=0`:
```js
var object = {
    foo: {
        bar: {
            number: 1,
            string: 'walker',
            array: [
                undefined,
                NaN
            ],
            date: new Date()
        }
    }
};

Object.traverse(object, function(node, value, key, path, depth) {
    console.log(path.join('.'));
});

// foo    Object {bar: Object}
// foo.bar    Object {number: 1, string: "walker", array: Array[2], date: Sat Nov 22 2014 14:05:45 GMT+0300 (Московское время (зима))}
// foo.bar.array    [undefined, NaN]
// foo.bar.array.0    undefined
// foo.bar.array.1    NaN
// foo.bar.date    Sat Nov 22 2014 14:05:45 GMT+0300 (Московское время (зима))
// foo.bar.number    1
// foo.bar.string    walker
```
You can change it on horizontal by passing the `mode=1`:
```js
var object = {
    foo: {
        bar: {
            number: 1,
            string: 'walker',
            array: [
                undefined,
                NaN
            ],
            date: new Date()
        }
    }
};

Object.traverse(object, function(node, value, key, path, depth) {
    console.log(path.join('.'));
}, null, 1);

// foo    Object {bar: Object}
// foo.bar    Object {number: 1, string: "walker", array: Array[2], date: Sat Nov 22 2014 14:17:52 GMT+0300 (Московское время (зима))}
// foo.bar.array    [undefined, NaN]
// foo.bar.date    Sat Nov 22 2014 14:17:52 GMT+0300 (Московское время (зима))
// foo.bar.number    1
// foo.bar.string    walker
// foo.bar.array.0    undefined
// foo.bar.array.1    NaN
```

## Prevent step into next node
```js
Object.traverse(object, function(node, value, key, path, depth) {
    // If "value" is {Object|Array}, then "return true" will prevent step into this object
    return true;
});
```

## Breaking loop
```js
Object.traverse(object, function(node, value, key, path, depth) {
    return false;
});
```

## Circular references
By default, if detected circular reference then will throw an exception:
```js
var object = {
    foo: {
        bar: undefined,
        number: 1
    }
};
object.foo.bar = object;

Object.traverse(object, function(node, value, key, path, depth) {
    console.log(path.join('.'));
});

// foo Object    {bar: Object, number: 1}
// foo.bar    Object {foo: Object}
// Uncaught Error: Circular reference
```
You can change this behaviour by passing `ignoreCircularReferences=true`:
```js
var object = {
    foo: {
        bar: undefined,
        number: 1
    }
};
object.foo.bar = object;

Object.traverse(object, function(node, value, key, path, depth) {
    console.log(path.join('.'));
}, null, 0, true);

// foo    Object {bar: Object, number: 1}
// foo.bar    Object {foo: Object}
// foo.number    1
```

## Max depth
By default `maxDepth`is `100`. Minimum depth is `0`. Each like cycle:
```js
var object = {
    foo: {
        bar: undefined,
        number: 1
    }
};

Object.traverse(object, function(node, value, key, path, depth) {
    console.log(path.join('.'), value);
}, null, 0, false, 0);

// foo    Object {bar: Object, number: 1}
```