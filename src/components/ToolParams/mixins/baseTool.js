import {mapActions} from "vuex";
import { debounce } from 'lodash';

export default {
    props: ['id', 'data'],
    data() {
        return {
            uid: this.id,
            form: {}
        }
    },
    watch: {
        form: {
            /*eslint-disable */
            handler: debounce(function(val, oldVal){
                this.saveData();
            }, 300),
            deep: true
        }
    },
    methods: {
        ...mapActions(["updateData"]),
        saveData() {
            this.updateData({
                id: this.uid,
                form: this.form
            });
        }
    }
}