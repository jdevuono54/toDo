<template>
    <Page>
        <GridLayout rows="*,140">
            <Image src="~/assets/images/logo.png" row="0" height="200" width="200"/>
            <stack-layout row="1">
                <Button text="Inscription" @tap="goSignUp" class="btn"/>
                <Button text="Connexion" @tap="goSignIn" class="btn"/>
            </stack-layout>
        </GridLayout>
    </Page>
</template>

<script>
    import SignUp from "./SignUp";
    import SignIn from "./SignIn";

    export default {
        name:"Homepage",
        methods:{
            goSignUp() {
                this.$navigateTo(SignUp)
            },
            goSignIn(){
                this.$navigateTo(SignIn)
            }
        },
        components:{
            SignUp,
            SignIn
        }
    };
</script>

<style scoped lang="scss">
    @import '../../node_modules/@nativescript/theme/scss/variables/blue';

    .btn{
        background-color: darken(#3293e9,10);
        border-radius: 5;
        color: white;
        font-family: "Raleway-Bold";
        font-weight: 800;
    }
    page{
        background: linear-gradient(#185abd,#3293e9);
    }
</style>
