<template>
    <Page>
        <ActionBar title="Details" class="action-bar" />
        <StackLayout>
            <TextView v-model="todo.content" @textChange="updateContentTodo" />
            <Button text="Suppriner" @tap="deleteTodo" :isEnabled="this.$root.connectivity === true" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "DetailItem",
        props: ['todo'],
        methods:{
            deleteTodo(){
                if (this.$root.connectivity === true) {
                    this.$http.delete('users/' + this.$store.state.user.user.uuid + "/todos/"+this.todo.uuid, {
                            headers: {Authorization: 'Bearer ' + this.$store.state.user.token}
                        }
                    ).then((response) => {
                        let id = this.$dbTodos.query({})[0].id;
                        this.$store.commit("deleteTodo", this.todo)
                        this.$dbTodos.updateDocument(id, this.$store.state.todos)
                        this.$navigateBack();
                        console.log("Suppresion de la todo réussie")
                    }).catch((e) => {
                        console.log("Suppresion échouée");
                    })
                }
            },
            updateContentTodo(){
                if (this.$root.connectivity === true) {
                    this.$http.patch('users/' + this.$store.state.user.user.uuid + "/todos/"+this.todo.uuid, {
                            "content":this.todo.content
                        },{
                            headers: {Authorization: 'Bearer ' + this.$store.state.user.token}
                        }
                    ).then((response) => {
                        console.log("Modification de la todo réussie")
                    }).catch((e) => {
                        console.log("Modification échouée");
                    })
                }
            }
        }
    }
</script>

<style scoped>
    TextView{
        font-size: 20;
    }
</style>
