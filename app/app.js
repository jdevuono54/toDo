import Vue from "nativescript-vue";
import Homepage from "./views/Homepage";
import Todo from "./views/Todo"
import axios from "axios";
import { Couchbase } from "nativescript-couchbase-plugin";
import store from './store';
import * as connectivityModule from "tns-core-modules/connectivity";

Vue.prototype.$bus = new Vue()

Vue.prototype.$http = axios.create({
    baseURL: 'https://api.todolist.sherpa.one'
});

Vue.prototype.$dbUser = new Couchbase("user");
Vue.prototype.$dbTodos = new Couchbase("todos");

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
            connected:false,
            connectivity: null
        }
    },
    methods:{
      alertUpdateConnexion(msg){
          alert({
              title: "Connexion",
              message: msg,
              okButtonText: "Ok"
          })
      }
    },
    created:function () {
        connectivityModule.startMonitoring((newConnectionType) => {
            if(newConnectionType === 0){
                console.log("Lost connexion");
                this.alertUpdateConnexion("Connexion perdue")
                this.connectivity = false;
            }
            else{
                console.log("Connected to internet");
                this.alertUpdateConnexion("Vous êtes connecté à internet")
                this.connectivity = true;
            }
        });

        this.$store.commit("saveUser",this.$dbUser.query({})[0])
        this.$store.commit("AddAllTodos",this.$dbTodos.query({})[0])

        if(this.$store.state.user != null){
            this.connected = true
        }
    }
}).$start();
