import * as aj from "../aj"
import * as types from "./types"
import * as actions from "../actions/types"

import * as _ from "../libs/underscore"

/**
 * Creates the todo store
 */
export const todos = aj.createStore(types.TODOS, (state = {todos: []}, action) => {

    switch (action.type) {
        case actions.TODO_CREATE:
            return _.assign(state, { todos: action.todos });

        case actions.TODO_COMPLETE:
            return _.assign(state, {
                //Update state of changed todo
                todos: _.map(state.todos, t => {
                    if (t.id == action.todo.id) {
                        t.complete = action.todo.complete
                    }

                    return t;
                })
            });

        case actions.TODO_REMOVE:
            return _.assign(state, { todos: action.todos });
    }

});