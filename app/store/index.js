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
            state.todos.todos.push(todo);
        },
        AddAllTodos(state,todos){
            state.todos = todos
        }
    }
})
