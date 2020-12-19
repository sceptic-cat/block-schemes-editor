import {mapActions} from "vuex";

export default {
    methods: {
        ...mapActions(["updateMessages"]),
        showModal(title, message) {
            this.updateMessages({
                title: title,
                message: message
            });
            this.$bvModal.show('modal-message');
        }
    }
}