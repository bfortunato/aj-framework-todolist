"use strict";

var _ = require("underscore");

/**
 * Todo list
 * @type {Array}
 */
let todos = [];

/**
 * Todo id counter
 * @type {number}
 */
let todoId = 0;

function getTodos() {
    return todos;
}

/**
 * Creates TODO_CREATE action
 */
function createTodo(text) {
    //add a new todo to list
    todos.push({
        id: ++todoId,
        text: text,
        complete: false
    });
}


/**
 * Marks a todo completed
 */
function completeTodo(id, complete) {
    //load todo from todos list
    let todo = _.find(todos, t => t.id == id);
    if (todo) {
        todo.complete = complete;
    }
}

/**
 * Remove todo
 */
function removeTodo(id) {
    todos = _.filter(todos, todo => todo.id != id);
}


exports.get = getTodos;
exports.create = createTodo;
exports.complete = completeTodo;
exports.remove = removeTodo;