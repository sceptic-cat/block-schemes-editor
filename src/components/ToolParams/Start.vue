<template>
    <div>
        <b-form-group id="start-delay-group" label="Задержка" label-for="start-delay">
            <b-form-input
                    id="start-delay"
                    v-model="form.delay"
                    type="number"
                    placeholder="0"
            ></b-form-input>
            <b-form-text id="start-delay-help">Время в миллисекундах, между ответом и переходом к выполнению последующих шагов диалплана.</b-form-text>
        </b-form-group>
        <b-btn @click="saveData">Сохранить</b-btn>
    </div>
</template>

<script>
    import { mapActions } from "vuex";
    import _ from 'lodash';

    export default {
        name: "Start",
        props: ['id', 'data'],
        data() {
            return {
                uid: this.id,
                form: {
                    delay: this.data.delay
                }

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
</script>

<style scoped>

</style>