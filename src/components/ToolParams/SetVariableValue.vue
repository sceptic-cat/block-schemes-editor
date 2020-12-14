<template>
    <div>
        <b-form-group
                id="set-variable-value-name-group"
                label="Название переменной:"
                label-for="set-variable-value-name"
        >
            <b-form-input
                    id="set-variable-value-name"
                    v-model="form.name"
            ></b-form-input>
        </b-form-group>

        <b-form-group
                id="set-variable-value-value-group"
                label="Значение:"
                label-for="set-variable-value-value"
        >
            <b-form-input
                    id="set-variable-value-value"
                    v-model="form.value"
            ></b-form-input>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "SetVariableValue",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    name: this.data.name,
                    value: this.data.value
                }
            }
        }
    }
</script>

<style scoped>

</style>