<template>
    <stack-layout>
        <Label text="Quelle est genre ?" />
        <ListPicker :items="gender" v-model="selectedGender" class="lastField"/>

        <Button text="S'incrire !" @tap="next" class="btnContinue"/>
    </stack-layout>
</template>

<script>
    export default {
        name:"MailForm",
        props:["gender"],
        data: function(){
            return {
                selectedGender:"0"
            }
        },
        methods:{
            next(){
                this.$bus.$emit("signUp",this.gender[this.selectedGender])
            }
        }
    }
</script>

<style scoped>
    .lastField{
        margin-bottom: 20;
        margin: -60;
        color: white;
    }
</style>
