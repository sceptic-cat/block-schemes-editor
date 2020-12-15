<template>
    <div>
        <b-form-group
                id="set-call-priority-name-group"
                label="Приоритет:"
                label-for="set-call-priority-value"
        >
            <b-form-input
                    id="set-call-priority-value"
                    v-model="form.value"
                    type="number"
                    required
                    placeholder="10"
            ></b-form-input>
            <b-form-text id="set-call-priority-value-help">
                <p> Более высокое значение означает более высокий приоритет вызова. Если переменная не установлена, все вызовы будут иметь одинаковый приоритет,
                    равный нулю.</p>
            </b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "Playback",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    value: this.data.value
                }
            }
        }
    }
</script>

<style scoped>

</style>