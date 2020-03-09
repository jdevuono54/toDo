import Vue from "nativescript-vue";

import Homepage from "./views/Homepage";

new Vue({

    template: `
        <Frame>
            <Homepage />
        </Frame>`,

    components: {
        Homepage
    }
}).$start();
