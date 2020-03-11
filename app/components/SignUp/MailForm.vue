<template>
    <stack-layout>
        <Label text="Quelle est votre adresse e-mail ?" />
        <TextField v-model="email" hint="Votre adresse e-mail" class="lastField"/>

        <Button text="Continuer" @tap="next" class="btnContinue" :isEnabled="email != null"/>
    </stack-layout>
</template>

<script>
    export default {
        name:"MailForm",
        props:["email"],
        methods:{
            next(){
                this.$bus.$emit("secondStepComplete",this.email)
            }
        }
    }
</script>

<style scoped>
    .lastField{
        margin-bottom: 20;
    }
</style>
