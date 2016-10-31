"use strict"

import { todos as TodosStore } from "stores"
import { createTodo, completeTodo, removeTodo } from "actions"

define("components", (module, exports) => {

    class Todo extends React.Component {

        onToggleComplete(e) {
            completeTodo({id: this.props.data.id, complete: e.target.checked});
        }

        onRemove() {
            removeTodo({id: this.props.data.id})
        }

        render() {
            let todo = this.props.data;
            let textClass = todo.complete ? "complete" : "";
            let itemClass = todo.complete ? "list-group-item list-group-item-success lead" : "list-group-item lead";
            return (
                <li className={itemClass}>
                    <div className="row">
                        <div className="col-md-1">
                            <input type="checkbox" onChange={this.onToggleComplete.bind(this)} selected={todo.complete} />
                        </div>
                        <div className="col-md-11">
                            <span className={textClass}>{todo.text}</span>
                            <a href="javascript:;" className="pull-right" onClick={this.onRemove.bind(this)}><i className="glyphicon glyphicon-remove" /></a>
                        </div>
                    </div>
                </li>
            )
        }
    }


    class TodoForm extends React.Component {

        constructor(props) {
            super(props)

            this.state = {text: ""};
        }

        onChange(e) {
            this.setState({text: e.target.value})
        }

        save() {
            createTodo({text: this.state.text})
            this.setState({text: ""})
        }

        render() {
            console.log("render")

            return (
                <form action="javascript:;" onSubmit={this.save.bind(this)}>
                    <input
                        type="text"
                        placeholder="What you have to do?"
                        className="form-control"
                        value={this.state.text}
                        onChange={this.onChange.bind(this)} />
                </form>
            )
        }
    }


    class App extends React.Component {
        constructor(props) {
            super(props)

            this.state = {todos: []}
        }

        componentDidMount() {
            TodosStore.subscribe(this, state => {
                this.setState(state)
            })
        }

        componentWillUnmount() {
            TodosStore.unsubscribe(this)
        }

        render() {
            let row = 0;
            let todos = this.state.todos.map(todo => <Todo key={++row} data={todo} />);

            return (
                <div className="container-fluid">
                    <h1 className="text-center">Todo List</h1>

                    <div className="col-md-offset-3 col-md-6">
                        <ul className="list-group">
                            <li className="list-group-item active lead">
                                Things to do
                            </li>
                            {(() => { if (!this.state.todos || this.state.todos.length == 0) {
                                return (<li className="list-group-item lead">No thinks to do</li>)
                            } else {
                                return todos;
                            }})()}
                        </ul>

                        <TodoForm />
                    </div>


                </div>
            )
        }
    }

    exports.App = App;

});