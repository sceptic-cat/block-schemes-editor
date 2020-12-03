<template>
    <b-modal id="modal-message" title="Уведомление">
        <p v-if="message">{{ message }}</p>
        <p v-else>Уведомление</p>
    </b-modal>
</template>

<script>
    export default {
        name: "Messages",
        props: ['message']
    }
</script>

<style scoped>

</style>