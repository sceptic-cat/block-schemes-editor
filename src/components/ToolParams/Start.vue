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
    import baseTool from './mixins/baseTool'
    export default {
        name: "Start",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    delay: this.data.delay
                }
            }
        }
    }
</script>

<style scoped>

</style>