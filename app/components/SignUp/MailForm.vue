<template>
    <stack-layout>
        <Label text="Quelle est votre adresse e-mail ?" />
        <TextField v-model="email" hint="Votre adresse e-mail" class="lastField"/>

        <Button text="Continuer" @tap="next" class="btnContinue" :isEnabled="email != null"/>

        <Label :text="error" v-if="error" class="error"></Label>
    </stack-layout>
</template>

<script>
    export default {
        name:"MailForm",
        props:["email"],
        data(){
            return{
                error:null,
                regexMail: new RegExp("^[^\\W][a-zA-Z0-9_]+(\\.[a-zA-Z0-9_]+)*\\@[a-zA-Z0-9_]+(\\.[a-zA-Z0-9_]+)*\\.[a-zA-Z]{2,4}$")
            }
        },
        methods:{
            next(){
                if(this.regexMail.test(this.email)){
                    this.$bus.$emit("secondStepComplete",this.email)
                }
                else{
                    this.error = "E-mail invalide !";
                }
            }
        }
    }
</script>

<style scoped>
    .lastField{
        margin-bottom: 20;
    }
</style>
