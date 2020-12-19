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

        <b-form-group
                id="queue-music-group"
                label="Музыка при ожидании:"
                label-for="queue-music"
        >
            <b-form-input
                    id="queue-music"
                    v-model="form.music"
            ></b-form-input>
            <b-form-text id="queue-music-help">
                <p>Необязательно. Используемый класс музыки при удержании (допустимые варианты прописаны в конфигурационном файле musiconhold). Если не указывать, будет использована музыка по умолчанию.</p>
            </b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "Queue",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    name: this.data.name,
                    music: this.data.music
                }
            }
        }
    }
</script>

<style scoped>

</style>