<template>
    <Page>
        <ListView :for="todo in this.todos" @itemTap="showTodo">
            <v-template>
                <Label :text="todo.content" />
            </v-template>
        </ListView>
    </Page>
</template>

<script>
    export default {
        name:"Todo",
        data(){
            return{
                todos:{}
            }
        },
        created(){
        },
        methods:{
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
