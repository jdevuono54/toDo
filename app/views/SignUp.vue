<template>
    <Page>
        <GridLayout rows="*,*,*">
            <stack-layout row="1">
                <identity :firstname="firstname" :lastname="lastname"></identity>
            </stack-layout>
        </GridLayout>
    </Page>
</template>

<script>
    import Identity from "../components/SignUp/identity";

    export default {
        name:"SignUp",
        components: {Identity},
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
        mounted: () => {
            this.$bus.$on('firstStepComplete', (firstname,lastname) => {
                this.firstname = firstname;
                this.lastname = lastname;
                this.step = 1;
            })
        },
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
