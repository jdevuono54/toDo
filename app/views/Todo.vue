<template>
    <Page>
        <ActionBar title="Ma liste" class="action-bar">
            <ActionItem @tap="addTodo" text="+" android.position="actionBar" ios.position="right"/>
        </ActionBar>
        <ListView v-for="todo in todos" @itemTap="showTodo">
            <v-template>
                <DockLayout stretchLastChild="false">
                    <Label :text="todo.content" dock="left" width="80%"/>
                    <Switch :checked="todo.done" dock="right" width="20%" @tap="checkTodo(todo)"/>
                </DockLayout>
            </v-template>
        </ListView>
    </Page>
</template>

<script>
    import AddItem from "../components/Todo/AddItem";
    import DetailItem from "../components/Todo/DetailItem";

    export default {
        name: "Todo",
        computed: {
            todos: function () {
                if(this.$store.state.todos !== undefined){
                    return this.$store.state.todos.todos
                }
            }
        },
        data:function(){
            return{
                selectedTodo:null
            }
        },
        created: function () {
            if (this.$root.connectivity) {
                this.$http.get('users/' + this.$store.state.user.user.uuid + "/todos", {
                        headers: {Authorization: 'Bearer ' + this.$store.state.user.token}
                    }
                ).then((response) => {
                    console.log("Récupération des todos réussie")
                    this.$store.commit("AddAllTodos", response.data)
                    if(this.$dbTodos.query({}).length === 0){
                        this.$dbTodos.createDocument(this.$store.state.todos)
                    }
                }).catch((e) => {
                    console.log("Erreur de récupération des todos", e)
                })
            }
        },
        methods: {
            addTodo() {
                this.$showModal(AddItem);
            },
            showTodo(event) {
                this.$navigateTo(DetailItem,{props : {todo : event.item}})
            },
            checkTodo(todo){
                this.$store.commit("switchTodo", todo)
                let id = this.$dbTodos.query({})[0].id;

                this.$dbTodos.updateDocument(id, this.$store.state.todos)

                if (this.$root.connectivity === true) {
                    this.$http.patch('users/' + this.$store.state.user.user.uuid + "/todos/"+todo.uuid, {
                        "done":todo.done
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
    };
</script>

<style lang="scss" scoped>
    Label{
        text-align: left;
    }
    page {
        background: linear-gradient(#185abd, #3293e9);
    }
</style>
