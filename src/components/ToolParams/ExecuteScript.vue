<template>
    <div>
        <b-form-group id="execute-script-group" label="Тело скрипта" label-for="execute-script">
            <b-form-textarea
                    id="execute-script"
                    placeholder="Python script"
                    rows="15"
                    v-model="form.script"
            ></b-form-textarea>
            <b-form-text id="execute-script-help">
                Python-скрипт с ограничениями консольной команды "python -c" (в коде используем только двойные кавычки, не используем переносы строк).
            </b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "ExecuteScriptSilence",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    script: this.data.script
                }
            }
        }
    }
</script>

<style scoped>

</style>