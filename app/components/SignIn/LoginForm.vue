<template>
    <stack-layout>
        <Label text="Connexion" />
        <TextField v-model="email" hint="Votre adresse e-mail"/>
        <TextField v-model="password" hint="Votre mot de passe" class="lastField" secure="true"/>

        <Button text="Connexion" @tap="inscription" class="btnLogin"/>
    </stack-layout>
</template>

<script>
    export default {
        name:"LoginForm",
        data:function(){
            return{
                email:null,
                password:null
            }
        },
        methods:{
            inscription(){
                this.$http.post('users/signin', {}, {
                    withCredentials:true,
                    auth: {
                        Authorization: {
                            username: this.email,
                            password: this.password
                        }
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
