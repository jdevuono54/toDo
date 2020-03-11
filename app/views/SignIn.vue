<template>
    <Page>
        <GridLayout rows="*,*,*">
            <stack-layout row="1">
                <LoginForm></LoginForm>
            </stack-layout>
        </GridLayout>
    </Page>
</template>

<script>
    import LoginForm from "../components/SignIn/LoginForm"

    export default {
        name:"SignIn",
        components:{
            LoginForm
        }
    };
</script>

<style lang="scss">
    page{
        background: linear-gradient(#185abd,#3293e9);
    }
</style>
