import React, {Component} from 'react';
import { graphql, compose } from 'react-apollo';
import {
    getTodo,
    addTodo,
    updateTodo,
    removeTodo,
    updateClosable
} from '../queries/todo';
import host from '../host';

class Todo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            updateTitle: ''
        }
    }

    removeTodoItem = (id) => {
        this.props.removeTodo({
            variables: {
                id
            },
            refetchQueries: [
                {
                    query: getTodo,
                    variables: {
                        hostId: host()
                    }
                }
            ]
        })
    }

    updateCloseItem = (id, closable) => {
        this.props.updateClosable({
            variables: {
                id,
                closable
            },
            refetchQueries: [
                {
                    query: getTodo,
                    variables: {
                        hostId: host()
                    }
                }
            ]
        })
    }

    showTodoList = () => {
        const { getTodo } = this.props;
        if(getTodo.loading ) {
            return(
                <li className={`loader`}></li>
            );
        } else {
            if (getTodo.todo.length) {
                return getTodo.todo.map((item, key) => {
                    return (
                        <li 
                            key={key} 
                            data-id={item.id} 
                            onClick={() => this.updateCloseItem(item.id, !item.closable)} 
                            className={ item.closable ? 'checked' : '' } >
                            {item.title} 
                            <span 
                                onClick={() => this.removeTodoItem(item.id)}
                                className="close"
                            >×</span>
                        </li>
                    );
                });
            } else {
                return(
                    <li>No Data Available</li>
                );
            }
            
        }
    }

    addTodoList = () => {
        const { title } = this.state;
        this.props.addTodo({
            variables: {
                title,
                hostId: host()
            },
            refetchQueries: [
                {
                    query: getTodo,
                    variables: {
                        hostId: host()
                    }
                }
            ]
        })

        this.setState({ title: '' })
    }

    render() {
        return (
            <div className="container">
                <div id="myDIV" className="header">
                    <h2 style={{margin: '5px' }}>My To Do List</h2>
                    <input onChange={e => this.setState({ title: e.target.value })} type="text" id="myInput" placeholder="Title..." />
                    <span className="addBtn" onClick={this.addTodoList}>Add</span>
                </div>
                <ul id="myUL">
                    {
                        this.showTodoList()
                    }
                </ul>
            </div>
        );
    }
}

export default compose(
    graphql(getTodo, {
        name: 'getTodo',
        options: () => {
            return {
                variables: {
                    hostId: host()
                }
            }
        }
    }),
    graphql(addTodo, { name: 'addTodo' }),
    graphql(updateTodo, { name: 'updateTodo' }),
    graphql(updateClosable, { name: 'updateClosable' }),
    graphql(removeTodo, { name: 'removeTodo' })
)(Todo);