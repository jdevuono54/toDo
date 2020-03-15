import Vue from "nativescript-vue";
import Homepage from "./views/Homepage";
import Todo from "./views/Todo"
import axios from "axios";
import { Couchbase } from "nativescript-couchbase-plugin";
import store from './store';

Vue.prototype.$bus = new Vue()

Vue.prototype.$http = axios.create({
    baseURL: 'https://api.todolist.sherpa.one'
});

Vue.prototype.$dbUser = new Couchbase("user");

Vue.prototype.$dbUse = "ok"

new Vue({
    store,
    template: `
        <Frame>
            <Homepage v-if="!connected"/>
            <Todo v-else/>
        </Frame>`,

    components: {
        Homepage,
        Todo
    },
    data(){
        return{
            connected:false
        }
    },
    created:function () {
        this.$store.commit("saveUser",this.$dbUser.query({})[0])
        if(this.$store.state.user != null){
            this.connected = true
        }
    }
}).$start();
