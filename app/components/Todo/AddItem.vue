<template>
    <stack-layout>
        <TextField v-model="itemVal" hint="Contenu" class="champs"/>
        <Button text="Ajouter" @tap="addItem" class="champs" :isEnabled="itemVal != null"/>
    </stack-layout>
</template>

<script>
    import todo from "../models/todo";
    export default {
        name: "AddItem",
        data: function () {
            return {
                itemVal:null
            }
        },
        methods:{
            addItem(){
                this.$store.commit("addTodo",new todo(this.itemVal,false))
                this.$dbUser.updateDocument(this.$store.state.user.id, this.$store.state.user)
                this.$modal.close();
            }
        }
    }
</script>

<style scoped>
    .champs{
        width: 50%;
        margin: 10%;
    }
</style>
