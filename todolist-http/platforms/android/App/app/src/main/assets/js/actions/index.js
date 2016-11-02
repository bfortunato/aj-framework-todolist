"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.removeTodo = exports.completeTodo = exports.createTodo = undefined;

var _types = require("./types");

var types = _interopRequireWildcard(_types);

var _aj = require("../aj");

var aj = _interopRequireWildcard(_aj);

var _http = require("../aj/http");

var http = _interopRequireWildcard(_http);

var _underscore = require("../libs/underscore");

var _ = _interopRequireWildcard(_underscore);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var BASE = "http://192.168.0.44:8000/";

/**
 * Creates TODO_CREATE action
 */
var createTodo = exports.createTodo = aj.createAction(types.TODO_CREATE, function (data) {
    http.post(BASE + "todos", { text: data.text }).then(function (result) {
        aj.dispatch({
            type: types.TODO_CREATE,
            todos: JSON.parse(result)
        });
    }).catch(function (e) {
        return logger.e(e);
    });
});

/**
 * Marks a todo completed
 */
var completeTodo = exports.completeTodo = aj.createAction(types.TODO_COMPLETE, function (data) {
    http.post(BASE + "todos/" + data.id, { complete: data.complete }).then(function (result) {
        aj.dispatch({
            type: types.TODO_COMPLETE,
            todos: JSON.parse(result)
        });
    }).catch(function (e) {
        return logger.e(e);
    });
});

/**
 * Remove todo
 */
var removeTodo = exports.removeTodo = aj.createAction(types.TODO_REMOVE, function (data) {
    http.delete(BASE + "todos/" + data.id).then(function (result) {
        aj.dispatch({
            type: types.TODO_REMOVE,
            todos: JSON.parse(result)
        });
    }).catch(function (e) {
        return logger.e(e);
    });
});