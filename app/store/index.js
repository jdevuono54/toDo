import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user:null,
        todos:[]
    },
    mutations: {
        saveUser(state, user) {
            state.user = user
        },
        addTodo(state,todo){
            if(!state.todos.todos){
                state.todos.todos = [todo]
            }
            else{
                state.todos.todos.push(todo);
            }
        },
        AddAllTodos(state,todos){
            state.todos = todos
        },
        switchTodo(state,todo){
           state.todos.todos[state.todos.todos.indexOf(todo)].done = !state.todos.todos[state.todos.todos.indexOf(todo)].done
        }
    }
})
