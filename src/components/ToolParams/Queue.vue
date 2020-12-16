<template>
    <div>
        <b-form-group
                id="queue-name-group"
                label="Название очереди:"
                label-for="queue-name"
        >
            <b-form-input
                    id="queue-name"
                    v-model="form.name"
                    required
                    placeholder="QUEUE_NAME"
            ></b-form-input>
            <b-form-text id="queue-name-help">
                <p>Допускается использование переменных, предопределенных ранее. Например ${QUEUE_NAME}</p>
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
                    name: this.data.name
                }
            }
        }
    }
</script>

<style scoped>

</style>