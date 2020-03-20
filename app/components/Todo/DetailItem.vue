<template>
    <Page>
        <ActionBar title="Details" class="action-bar" />
        <StackLayout>
            <TextView v-model="todo.content" @textChange="updateContentTodo" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "DetailItem",
        props: ['todo'],
        methods:{
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
                        console.log("Modificatio échouée");
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
