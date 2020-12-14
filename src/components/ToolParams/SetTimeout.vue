<template>
    <div>
        <b-form-group
                id="set-timeout-group"
                label="Длительность (миллисекунды):"
                label-for="set-timeout-time"
        >
            <b-form-input
                    id="set-timeout-time"
                    v-model="form.time"
                    type="number"
                    placeholder="0"
            ></b-form-input>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "SetTimeout",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    time: this.data.time
                }
            }
        }
    }
</script>

<style scoped>

</style>