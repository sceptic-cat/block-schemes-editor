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

        <b-form-group
                id="verify-regular-expression-value-group"
                label="Значение:"
                label-for="verify-regular-expression-value"
        >
            <b-form-input
                    id="verify-regular-expression-value"
                    v-model="form.value"
            ></b-form-input>
            <b-form-text id="queue-name-help">
                <p>Значение, которое проверяем на регулярное выражение. Может быть переменной или выражение, например: ${CALLERID(num)}</p>
            </b-form-text>
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
                    expression: this.data.expression,
                    value: this.data.value
                }
            }
        }
    }
</script>

<style scoped>

</style>