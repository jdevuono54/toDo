<template>
    <Page>
        <ActionBar title="Ma liste" class="action-bar">
            <ActionItem @tap="addTodo" text="+" android.position="actionBar" ios.position="right"/>
        </ActionBar>
        <ListView v-for="todo in todos" @itemTap="showTodo">
            <v-template>
                <Label :text="todo.content" />
            </v-template>
        </ListView>
    </Page>
</template>

<script>
    import AddItem from "../components/Todo/AddItem";

    export default {
        name:"Todo",
        computed:{
            todos: function(){
                return this.$store.state.user.user.todos
            }
        },
        methods:{
            addTodo(){
                this.$showModal(AddItem);
            },
            showTodo(){

            }
        }
    };
</script>

<style lang="scss">
    page{
        background: linear-gradient(#185abd,#3293e9);
    }
</style>
