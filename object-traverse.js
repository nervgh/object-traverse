/*
 object-traverse v0.1.1
 https://github.com/nervgh/object-traverse
*/
(function(window) {
    'use strict';

    var MAX_DEPTH = 100;
    var getKeys = Object.keys;
    var isNaN = window.isNaN;
    /**
     * Returns "true" if any is object
     * @param {*} any
     * @returns {Boolean}
     */
    function isObject(any) {
        return any instanceof Object;
    }
    /**
     * Returns "true" if any is number
     * @param {*} any
     * @returns {Boolean}
     */
    function isNumber(any) {
        return typeof any === 'number' && !isNaN(any);
    }
    /**
     * Walks object recursively
     * @param {Object} object
     * @param {Function} cb
     * @param {*} ctx
     * @param {Boolean} mode
     * @param {Boolean} ignore
     * @param {Number} max
     * @returns {Object}
     */
    function walk(object, cb, ctx, mode, ignore, max) {
        var stack = [[], 0, getKeys(object).sort(), object];
        var cache = [];

        do {
            var node = stack.pop();
            var keys = stack.pop();
            var depth = stack.pop();
            var path = stack.pop();

            cache.push(node);

            while(keys[0]) {
                var key = keys.shift();
                var value = node[key];
                var way = path.concat(key);
                var strategy = cb.call(ctx, node, value, key, way, depth);

                if (strategy === true) {
                    continue;
                } else if (strategy === false) {
                    stack.length = 0;
                    break;
                } else {
                    if(max <= depth || !isObject(value)) continue;

                    if (cache.indexOf(value) !== -1) {
                        if (ignore) continue;
                        throw new Error('Circular reference');
                    }

                    if (mode) {
                        stack.unshift(way, depth + 1, getKeys(value).sort(), value);
                    } else {
                        stack.push(path, depth, keys, node);
                        stack.push(way, depth + 1, getKeys(value).sort(), value);
                        break;
                    }
                }
            }
        } while(stack[0]);

        return object;
    }
    /**
     * Walks object recursively
     * @param {Object} object
     * @param {Function} callback
     * @param {*} [context]
     * @param {Number} [mode=0]
     * @param {Boolean} [ignoreCircularReferences=false]
     * @param {Number} [maxDepth=100]
     * @returns {Object}
     */
    function traverse(object, callback, context, mode, ignoreCircularReferences, maxDepth) {
        var cb = callback;
        var ctx = context;
        var _mode = mode === 1;
        var ignore = !!ignoreCircularReferences;
        var max = isNumber(maxDepth) ? maxDepth : MAX_DEPTH;

        return walk(object, cb, ctx, _mode, ignore, max);
    }

    // export
    Object.traverse = traverse;

}(window));