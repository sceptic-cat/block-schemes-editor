<template>
    <div>
        <p>
            <b-form-text id="start-delay-help">
                Общее количество вызовов. Будет сохранено в переменную CALL_COUNT. Можно использовать в сценарии диалплана в формате: ${CALL_COUNT}
            </b-form-text>
        </p>
    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "CountActiveCalls",
        mixins: [ baseTool ]
    }
</script>

<style scoped>

</style>