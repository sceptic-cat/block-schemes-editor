<template>
    <div>
        <p>
            <b-form-text id="get-current-time-help">
                Текущее время. Будет сохранено в переменную LOCAL_TIME. Можно использовать в сценарии диалплана в формате: ${LOCAL_TIME}
            </b-form-text>
        </p>
    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "GetCurrentTime",
        mixins: [ baseTool ]
    }
</script>

<style scoped>

</style>