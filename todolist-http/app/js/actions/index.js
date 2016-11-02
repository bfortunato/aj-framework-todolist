import * as types from "./types"
import * as aj from "../aj"
import * as http from "../aj/http"
import * as _ from "../libs/underscore"

const BASE = "http://192.168.0.44:8000/";

/**
 * Creates TODO_CREATE action
 */
export const createTodo = aj.createAction(types.TODO_CREATE, data => {
    http.post(BASE + "todos", {text: data.text})
        .then(result => {
            aj.dispatch({
                type: types.TODO_CREATE,
                todos: JSON.parse(result)
            })
        })
        .catch(e => logger.e(e));
});


/**
 * Marks a todo completed
 */
export const completeTodo = aj.createAction(types.TODO_COMPLETE, data => {
    http.post(BASE + "todos/" + data.id, {complete: data.complete})
        .then(result => {
            aj.dispatch({
                type: types.TODO_COMPLETE,
                todos: JSON.parse(result)
            })
        })
        .catch(e => logger.e(e));
});

/**
 * Remove todo
 */
export const removeTodo = aj.createAction(types.TODO_REMOVE, data => {
    http.delete(BASE + "todos/" + data.id)
        .then(result => {
            aj.dispatch({
                type: types.TODO_REMOVE,
                todos: JSON.parse(result)
            })
        })
        .catch(e => logger.e(e));
});