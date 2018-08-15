import { gql } from 'apollo-boost';

const getTodo = gql`
    query($hostId: ID) {
        todo(hostId: $hostId) {
            id
            title
            closable
        }
    }
`;

const addTodo = gql`
    mutation($title: String, $hostId: String) {
        addTodo(title: $title, hostId: $hostId) {
            id
        }
    }
`;

const updateClosable = gql`
    mutation($id: ID, $closable: Boolean) {
        updateClosable(id: $id, closable: $closable) {
            id
        }
    }
`;

const updateTodo = gql`
    mutation($id: ID, $title: String, $hostId: ID, $closable: Boolean) {
        updateTodo(title: $title, closable: $closable) {
            id
        }
    }
`;

const removeTodo = gql`
    mutation($id: ID) {
        removeTodo(id: $id) {
            hostId
        }
    } 
`;

export {
    getTodo,
    addTodo,
    updateTodo,
    removeTodo,
    updateClosable
};