<template>
    <div>
        <b-form-group
                id="read-variable-group"
                label="Название переменной:"
                label-for="read-variable"
        >
            <b-form-input
                    id="read-variable"
                    v-model="form.variable"
                    required
            ></b-form-input>
            <b-form-text id="read-variable-help">
                <p>имя переменной, в которой будет сохранена введенная пользователем последовательность</p>
            </b-form-text>
        </b-form-group>

        <b-form-group
                id="read-filename-group"
                label="Звуковой файл:"
                label-for="read-filename"
        >
            <b-form-input
                    id="read-filename"
                    v-model="form.filename"
                    required
            ></b-form-input>
            <b-form-text id="read-filename-help">
                <p>Звуковой файл, проигрываемый пользователю до считывания последовательности.</p>
            </b-form-text>
        </b-form-group>

        <b-form-group
                id="read-maxdigits-group"
                label="Число попыток:"
                label-for="read-attempts"
        >
            <b-form-input
                    id="read-maxdigits"
                    v-model="form.maxdigits"
                    type="number"
                    maxlength="255"
            ></b-form-input>
            <b-form-text id="read-maxdigits-help">
                <p>Максимально возможное число считываемых цифр. Считывание прекращается если введено максимальное количество цифр (в этом случае от пользователя не требуется нажатия кнопки '#').
                    Значение по умолчанию: 0 - нет лимита - команда ждет, пока пользователь не нажмет кнопку '#'.</p>
            </b-form-text>
        </b-form-group>

        <b-form-group
                id="read-attempts-group"
                label="Число попыток:"
                label-for="read-attempts"
        >
            <b-form-input
                    id="read-attempts"
                    v-model="form.attempts"
                    type="number"
                    required
            ></b-form-input>
            <b-form-text id="read-attempts-help">
                <p>Если больше 1, то указывается число попыток чтения последовательности, в
                    том случае, если пользователь ничего не набрал.</p>
            </b-form-text>
        </b-form-group>

        <b-form-group
                id="read-timeout-group"
                label="Таймаут (секунды):"
                label-for="read-timeout"
        >
            <b-form-input
                    id="read-timeout"
                    v-model="form.timeout"
                    type="number"
                    maxlength="255"
            ></b-form-input>
            <b-form-text id="read-timeout-help">
                <p>Количество секунд ожидания ввода пользователя. Если значение больше нуля, то это значение будет использоваться вместо значения таймаута по умолчанию.</p>
            </b-form-text>
        </b-form-group>
        <p>Точки выхода:</p>
        <ul>
            <li><b>ok</b> - успешный пользовательский ввод.</li>
            <li><b>time</b> - (TIMEOUT) превышен лимит ожидания ввода пользователя.</li>
            <li><b>hang</b> - (HANGUP) пользователь повесил трубку при ожидании ввода.</li>
            <li><b>err</b> - (ERROR) иные ошибки при ожидании ввода.</li>
        </ul>
    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "Read",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    variable: this.data.variable,
                    filename: this.data.filename,
                    maxdigits: this.data.maxdigits,
                    attempts: this.data.attempts,
                    timeout: this.data.timeout,
                }
            }
        }
    }
</script>

<style scoped>

</style>