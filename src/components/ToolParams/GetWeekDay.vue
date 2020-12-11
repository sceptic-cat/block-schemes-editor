<template>
    <div>
        <p>
            <b-form-text id="get-week-day-help">
                Номер месяца. Будет сохранен в переменную WEEK_DAY. Можно использовать в сценарии диалплана в формате: ${WEEK_DAY}
            </b-form-text>
        </p>
    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "GetWeekDay",
        mixins: [ baseTool ]
    }
</script>

<style scoped>

</style>