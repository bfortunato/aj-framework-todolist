"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeTodo = exports.completeTodo = exports.createTodo = undefined;

var _types = require("./types");

var types = _interopRequireWildcard(_types);

var _aj = require("../aj");

var aj = _interopRequireWildcard(_aj);

var _underscore = require("../libs/underscore");

var _ = _interopRequireWildcard(_underscore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Todo list
 * @type {Array}
 */
var todos = [];

/**
 * Todo id counter
 * @type {number}
 */
var todoId = 0;

/**
 * Creates TODO_CREATE action
 */
var createTodo = exports.createTodo = aj.createAction(types.TODO_CREATE, function (data) {
    //add a new todo to list
    todos.push({
        id: ++todoId,
        text: data.text,
        complete: false
    });

    //dispatch action to stores
    aj.dispatch({
        type: types.TODO_CREATE,
        todos: todos
    });
});

/**
 * Marks a todo completed
 */
var completeTodo = exports.completeTodo = aj.createAction(types.TODO_COMPLETE, function (data) {
    //load todo from todos list
    var todo = _.find(todos, function (t) {
        return t.id == data.id;
    });
    if (todo) {
        todo.complete = data.complete;
        //dispatch action to stores
        aj.dispatch({
            type: types.TODO_COMPLETE,
            todo: todo
        });
    }
});

/**
 * Remove todo
 */
var removeTodo = exports.removeTodo = aj.createAction(types.TODO_REMOVE, function (data) {
    todos = _.filter(todos, function (todo) {
        return todo.id != data.id;
    });

    //dispatch action to stores
    aj.dispatch({
        type: types.TODO_REMOVE,
        todos: todos
    });
});