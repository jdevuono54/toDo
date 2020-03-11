import Vue from "nativescript-vue";
import Homepage from "./views/Homepage";
import axios from "axios";

Vue.prototype.$bus = new Vue()


Vue.prototype.$http = axios.create({
    baseURL: 'https://api.todolist.sherpa.one'
});

new Vue({

    template: `
        <Frame>
            <Homepage />
        </Frame>`,

    components: {
        Homepage
    }
}).$start();
