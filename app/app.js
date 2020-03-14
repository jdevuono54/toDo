import Vue from "nativescript-vue";
import Homepage from "./views/Homepage";
import Todo from "./views/Todo"
import axios from "axios";
import { Couchbase } from "nativescript-couchbase-plugin";

Vue.prototype.$bus = new Vue()

Vue.prototype.$http = axios.create({
    baseURL: 'https://api.todolist.sherpa.one'
});

Vue.prototype.$dbUser = new Couchbase("user");

new Vue({

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
        if(this.$dbUser.query({}).length > 0){
            this.connected = true
        }
    }
}).$start();
