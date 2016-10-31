"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.todos = undefined;

var _aj = require("../aj");

var aj = _interopRequireWildcard(_aj);

var _types = require("./types");

var types = _interopRequireWildcard(_types);

var _types2 = require("../actions/types");

var actions = _interopRequireWildcard(_types2);

var _underscore = require("../libs/underscore");

var _ = _interopRequireWildcard(_underscore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Creates the todo store
 */
var todos = exports.todos = aj.createStore(types.TODOS, function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { todos: [] };
    var action = arguments[1];


    switch (action.type) {
        case actions.TODO_CREATE:
            return _.assign(state, { todos: action.todos });

        case actions.TODO_COMPLETE:
            return _.assign(state, {
                //Update state of changed todo
                todos: _.map(state.todos, function (t) {
                    if (t.id == action.todo.id) {
                        t.complete = action.todo.complete;
                    }

                    return t;
                })
            });

        case actions.TODO_REMOVE:
            return _.assign(state, { todos: action.todos });
    }
});