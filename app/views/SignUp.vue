<template>
    <Page>
        <GridLayout rows="*,*,*">
            <stack-layout row="1">
                <IdentityForm :firstname="firstname" :lastname="lastname" v-show="step === 1"></IdentityForm>
                <MailForm :email="email" v-show="step === 2"></MailForm>
                <GenderForm :gender="gender" v-show="step === 3 || error"></GenderForm>

                <Button text="<- Retour" @tap="step--" v-if="step > 1" class="btnReturn"/>
                <Label :text="error" v-if="error" class="error"></Label>
            </stack-layout>
        </GridLayout>
    </Page>
</template>

<script>
    import IdentityForm from "../components/SignUp/IdentityForm";
    import MailForm from "../components/SignUp/MailForm";
    import GenderForm from "../components/SignUp/GenderForm";
    import SignIn from "./SignIn";

    export default {
        name: "SignUp",
        components: {MailForm, IdentityForm, GenderForm, SignIn},
        data: () => {
            return {
                firstname: null,
                lastname: null,
                email: null,
                gender: ["male", "female"],
                selectedGender: null,
                step: 1,
                error: null
            }
        },
        beforeDestroy() {
            this.$bus.$off();
        },
        mounted: function () {
            this.$bus.$on('firstStepComplete', (firstname, lastname) => {
                this.firstname = firstname;
                this.lastname = lastname;
                this.step++;
            })
            this.$bus.$on('secondStepComplete', (email) => {
                this.email = email;
                this.step++;
            })
            this.$bus.$on('signUp', (gender) => {
                this.selectedGender = gender;
                this.signUp()
            })
        },
        methods: {
            onButtonTap() {
                console.log("Button was pressed");
            },
            signUp() {
                this.$http.post('users/signup', {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    gender: this.selectedGender
                }).then((response) => {
                    alert({
                        title: "Inscription réussie !",
                        message: "Votre mot de passe:" + response.data.password,
                        okButtonText: "Ok"
                    }).then(() => {
                        this.$navigateTo(SignIn,{clearHistory:true})
                    });
                }).catch((e) => {
                    console.log(e)
                    console.log(e.data)
                    this.error = "Erreur lors de l'inscription !";
                })
            }
        }
    };
</script>

<style lang="scss">
    page {
        background: linear-gradient(#185abd, #3293e9);

        .btn {
            background-color: darken(#3293e9, 10);
            border-radius: 5;
            color: white;
            font-family: "Raleway-Bold";
            font-weight: 800;
        }

        TextField, Label {
            text-align: center;
            font-family: "Raleway-Bold";
            color: white;
            placeholder-color: white;
        }

        Label {
            font-size: 20;
            margin-bottom: 10;
        }

        TextField {
            font-size: 15;
        }

        .btnContinue {
            background-color: darken(#3293e9, 20);
            border-radius: 5;
            color: white;
            font-family: "Raleway-Bold";
            font-weight: 800;
        }

        .btnReturn{
            border-radius: 5;
        }

        .error {
            color: red;
            font-family: "Raleway-Bold";
        }
    }
</style>
