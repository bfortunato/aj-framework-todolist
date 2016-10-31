import * as types from "./types"
import * as aj from "../aj"

import * as _ from "../libs/underscore"

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


/**
 * Creates TODO_CREATE action
 */
export const createTodo = aj.createAction(types.TODO_CREATE, data => {
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
    })
});


/**
 * Marks a todo completed
 */
export const completeTodo = aj.createAction(types.TODO_COMPLETE, data => {
    //load todo from todos list
    let todo = _.find(todos, t => t.id == data.id);
    if (todo) {
        todo.complete = data.complete;
        //dispatch action to stores
        aj.dispatch({
            type: types.TODO_COMPLETE,
            todo: todo
        })
    }

});

/**
 * Remove todo
 */
export const removeTodo = aj.createAction(types.TODO_REMOVE, data => {
    todos = _.filter(todos, todo => todo.id != data.id);

    //dispatch action to stores
    aj.dispatch({
        type: types.TODO_REMOVE,
        todos: todos
    })

});