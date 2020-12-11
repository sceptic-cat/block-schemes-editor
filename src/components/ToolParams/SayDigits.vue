<template>
    <div>
        <b-form-group
                id="say-digits-number-group"
                label="Номер:"
                label-for="say-digits-number"
        >
            <b-form-input
                    id="say-digits-number"
                    v-model="form.number"
                    type="number"
                    placeholder="0"
            ></b-form-input>
        </b-form-group>
    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "SayDigits",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    number: this.data.number
                }
            }
        }
    }
</script>

<style scoped>

</style>