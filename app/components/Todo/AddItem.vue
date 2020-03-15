<template>
    <stack-layout>
        <TextField class="champs" hint="Contenu" v-model="itemVal"/>
        <Button :isEnabled="itemVal != null" @tap="addItem" class="champs" text="Ajouter"/>
        <Button @tap="closeModal" text="Annuler"/>
    </stack-layout>
</template>

<script>
    import todo from "../models/todo";
    import * as utf8 from "utf8";
    import Todo from "../../views/Todo";

    export default {
        name: "AddItem",
        data: function () {
            return {
                itemVal: null
            }
        },
        methods: {
            addItem() {
                this.$store.commit("addTodo", new todo(this.itemVal, false))
                this.$dbUser.updateDocument(this.$store.state.user.id, this.$store.state.user)
                if (this.$root.connectivity === true) {
                    this.addOnline()
                }
                this.$modal.close();
            },
            closeModal(){
                this.$modal.close();
            },
            addOnline() {
                let uuid = this.$store.state.user.user.uuid;
                this.$http.post('users/' + uuid + "/todos", {
                        "content": this.itemVal
                    }, {
                        headers: {Authorization: 'Bearer ' + this.$store.state.user.token}
                    }
                ).then((response) => {
                    console.log("Sauvegarde de la todo")
                }).catch((e) => {
                    console.log("Erreur lors de la sauvegarde la todo")
                })
            }
        }
    }
</script>

<style scoped>
    .champs {
        width: 50%;
        margin: 10%;
    }
</style>
