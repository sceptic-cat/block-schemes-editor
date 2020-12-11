<template>
    <div>
        <b-form-group
                id="background-file-group"
                label="Звуковой файл:"
                label-for="background-file"
        >
            <b-form-input
                    id="background-file"
                    v-model="form.file"
                    required
                    placeholder="Абсолютный путь до файла"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="background-option-group" label="Опции:" label-for="background-option">
            <b-form-select id="background-option" v-model="form.option" :options="options"></b-form-select>
            <b-form-text id="start-delay-help">
                <p><strong>skip:</strong> Задает проигрывать звуковой файл, если только канал уже в отвеченном состоянии. Если на канале еще не установлено соединение, команда Playback сразу же закончит работу без проигрывания файла.</p>
                <p><strong>noanswer:</strong> Задает проигрывать звуковой файл, но не переводить канал в отвеченное состояние (если он еще находится в неотвеченном состоянии). Не все каналы поддерживают проигрыш сообщений без перевода канала в отвеченное состояние.</p>
            </b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "Background",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    file: this.data.file,
                    option: this.data.option,
                },
                options: [
                    { value: 'skip', text: 'skip' },
                    { value: 'noanswer', text: 'noanswer' }
                ]
            }
        }
    }
</script>

<style scoped>

</style>