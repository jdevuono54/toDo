<template>
    <Page>
        <ActionBar title="Ma liste" class="action-bar">
            <ActionItem @tap="addTodo" text="+" android.position="actionBar" ios.position="right"/>
        </ActionBar>
        <ListView v-for="todo in todos" @itemTap="showTodo">
            <v-template>
                <Label :text="todo.content"/>
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
                return this.$store.state.todos.todos
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
                console.log(this.$dbTodos.query({}))
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
