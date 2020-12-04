<template>
    <b-modal id="modal-message" ref="modal-message" :title="title">
        <p v-if="message">{{ message }}</p>
        <p v-else>Уведомление</p>
        <template #modal-footer>
            <div class="w-100">
                <b-button
                        variant="primary"
                        size="md"
                        class="float-right"
                        @click="handleOk"
                >
                    OK
                </b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    export default {
        name: "Messages",
        data () {
            return this.getMessages();
        },
        methods: {
            ...mapActions(["returnDefaultsForMessages"]),
            ...mapGetters(["getMessages"]),
            handleOk() {
                this.$refs['modal-message'].hide();
                this.returnDefaultsForMessages();
            }
        }
    }
</script>

<style scoped>

</style>