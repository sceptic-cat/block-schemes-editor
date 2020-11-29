<template>
    <div>
        <b-form-group id="start-delay-group" label="Задержка" label-for="start-delay">
            <b-form-input
                    id="start-delay"
                    v-model="delay"
                    type="number"
                    placeholder="0"
            ></b-form-input>
            <b-form-text id="start-delay-help">Время в миллисекундах, между ответом и переходом к выполнению последующих шагов диалплана.</b-form-text>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "Start",
        data() {
            return {
                delay: null
            }
        }
    }
</script>

<style scoped>

</style>