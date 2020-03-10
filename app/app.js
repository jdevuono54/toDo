import Vue from "nativescript-vue";
import Homepage from "./views/Homepage";

Vue.prototype.$bus = new Vue()

new Vue({

    template: `
        <Frame>
            <Homepage />
        </Frame>`,

    components: {
        Homepage
    }
}).$start();
