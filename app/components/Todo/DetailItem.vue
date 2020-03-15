<template>
    <Page>
        <ActionBar title="Details" class="action-bar" />
        <StackLayout>
            <TextView v-model="todo.content" />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        name: "DetailItem",
        props: ['todo']
    }
</script>

<style scoped>
    TextView{
        font-size: 20;
    }
</style>
