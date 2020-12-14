<template>
    <div>
        <b-form-group
                id="verify-regular-expression-expression-group"
                label="Выражение:"
                label-for="verify-regular-expression-expression"
        >
            <b-form-input
                    id="verify-regular-expression-expression"
                    v-model="form.expression"
            ></b-form-input>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "VerifyRegularExpression",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    expression: this.data.expression
                }
            }
        }
    }
</script>

<style scoped>

</style>