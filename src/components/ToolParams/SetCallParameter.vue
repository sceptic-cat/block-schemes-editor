<template>
    <div>
        <b-form-group
                id="set-call-parameter-name-group"
                label="Название параметра:"
                label-for="set-call-parameter-name"
        >
            <b-form-input
                    id="set-call-parameter-name"
                    v-model="form.name"
            ></b-form-input>
        </b-form-group>

        <b-form-group
                id="set-call-parameter-value-group"
                label="Значение:"
                label-for="set-call-parameter-value"
        >
            <b-form-input
                    id="set-call-parameter-value"
                    v-model="form.value"
            ></b-form-input>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "SetCallParameter",
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