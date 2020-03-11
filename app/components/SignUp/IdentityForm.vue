<template>
    <stack-layout>
        <Label text="Qui êtes-vous ?" />
        <TextField v-model="firstname" hint="Votre prénom"/>
        <TextField v-model="lastname" hint="Votre nom" class="lastField"/>

        <Button text="Continuer" @tap="next" class="btnContinue" :isEnabled="firstname != null && lastname != null"/>
    </stack-layout>
</template>

<script>
    export default {
        name:"IdentityForm",
        props:["firstname","lastname"],
        methods:{
            next(){
                this.$bus.$emit("firstStepComplete",this.firstname,this.lastname)
            }
        }
    }
</script>

<style scoped>
    .lastField{
        margin-bottom: 20;
    }
</style>
