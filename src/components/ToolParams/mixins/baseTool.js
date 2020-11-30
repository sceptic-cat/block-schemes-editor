import {mapActions} from "vuex";
import _ from 'lodash';

export const baseTool = {
    data() {
        return {
            uid: this.id,
            form: {}
        }
    },
    watch: {
        form: {
            /*eslint-disable */
            handler: _.debounce(function(val, oldVal){
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