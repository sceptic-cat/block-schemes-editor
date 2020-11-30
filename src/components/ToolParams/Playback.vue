<template>
    <div>
        <b-form-group
                id="playback-file-group"
                label="Звуковой файл:"
                label-for="playback-file"
        >
            <b-form-input
                    id="playback-file"
                    v-model="file"
                    required
                    placeholder="Абсолютный путь до файла"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="playback-option-group" label="Опции:" label-for="playback-option">
            <b-form-select id="playback-option" v-model="option" :options="options"></b-form-select>
            <b-form-text id="start-delay-help">
                <p><strong>skip:</strong> Задает проигрывать звуковой файл, если только канал уже в отвеченном состоянии. Если на канале еще не установлено соединение, команда Playback сразу же закончит работу без проигрывания файла.</p>
                <p><strong>noanswer:</strong> Задает проигрывать звуковой файл, но не переводить канал в отвеченное состояние (если он еще находится в неотвеченном состоянии). Не все каналы поддерживают проигрыш сообщений без перевода канала в отвеченное состояние.</p>
            </b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    export default {
        name: "Playback",
        props: ['id', 'data'],
        data() {
            return {
                uid: this.id,
                file: this.data.file,
                option: this.data.option,
                options: [
                    { value: 'skip', text: 'skip' },
                    { value: 'noanswer', text: 'noanswer' }
                ]
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()
                alert(JSON.stringify(this.form))
            },
            onReset(evt) {
                evt.preventDefault()
                // Reset our form values
                this.form.email = ''
                this.form.name = ''
                this.form.food = null
                this.form.checked = []
                // Trick to reset/clear native browser form validation state
                this.show = false
                this.$nextTick(() => {
                    this.show = true
                })
            }
        }
    }
</script>

<style scoped>

</style>