<template>
    <stack-layout>
        <Label text="Connexion" />
        <TextField v-model="email" hint="Votre adresse e-mail"/>
        <TextField v-model="password" hint="Votre mot de passe" class="lastField" secure="true"/>

        <Button text="Connexion" @tap="inscription" class="btnLogin" :isEnabled="email != null && password != null"/>
    </stack-layout>
</template>

<script>
    import * as btoa from "btoa";
    import  {encode,decode} from "base-64"
    import * as utf8 from "utf8"

    export default {
        name:"LoginForm",
        data:function(){
            return{
                email:null,
                password:null
            }
        },
        mounted:function(){
            if(!global.btoa){
                global.btoa=encode ;
            }
        },
        methods:{
            inscription(){
                this.$http.post('users/signin', {}, {
                    withCredentials:true,
                    auth: {
                            username: utf8.encode(this.email),
                            password: utf8.encode(this.password)
                    }}
                ).then((response) => {
                    console.log("ok",response)
                }).catch((e) => {
                    console.log("erreur",e)
                })
            }
        }
    }
</script>

<style scoped lang="scss">
    .lastField{
        margin-bottom: 20;
    }
    .btnLogin {
        background-color: darken(#3293e9, 20);
        border-radius: 5;
        color: white;
        font-family: "Raleway-Bold";
        font-weight: 800;
    }
</style>
