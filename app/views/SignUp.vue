<template>
    <Page>
        <GridLayout rows="*,*,*">
            <stack-layout row="1">
                    <IdentityForm :firstname="firstname" :lastname="lastname" v-if="step === 1"></IdentityForm>
                    <MailForm :email="email" v-if="step === 2"></MailForm>
                    <GenderForm :gender="gender" v-if="step === 3"></GenderForm>
            </stack-layout>
        </GridLayout>
    </Page>
</template>

<script>
    import IdentityForm from "../components/SignUp/IdentityForm";
    import MailForm from "../components/SignUp/MailForm";
    import GenderForm from "../components/SignUp/GenderForm";

    export default {
        name:"SignUp",
        components: {MailForm, IdentityForm,GenderForm},
        data:() => {
            return{
                firstname:null,
                lastname:null,
                email:null,
                gender:["male","female"],
                selectedGender:null,
                step:1
            }
        },
        mounted: function() {
            this.$bus.$on('firstStepComplete', (firstname,lastname) => {
                this.firstname = firstname;
                this.lastname = lastname;
                this.step ++;
            })
            this.$bus.$on('secondStepComplete', (email) => {
                this.email = email;
                this.step ++;
            })
            this.$bus.$on('signUp', (gender) => {
                this.email = gender;
                this.signUp()
            })
        },
        methods:{
            signUp(){

            }
        }
    };
</script>

<style lang="scss">
    page{
        background: linear-gradient(#185abd,#3293e9);

        .btn{
            background-color: darken(#3293e9,10);
            border-radius: 5;
            color: white;
            font-family: "Raleway-Bold";
            font-weight: 800;
        }

        TextField,Label{
            text-align: center;
            font-family: "Raleway-Bold";
            color: white;
            placeholder-color: white;
        }

        Label{
            font-size: 20;
            margin-bottom: 10;
        }

        TextField{
            font-size: 15;
        }

        .btnContinue{
            background-color: darken(#3293e9,20);
            border-radius: 5;
            color: white;
            font-family: "Raleway-Bold";
            font-weight: 800;
        }
    }
</style>
