<template>
    <div>
        <p>
            <b-form-text id="get-month-day-help">
                Номер месяца. Будет сохранен в переменную MONTH_DAY. Можно использовать в сценарии диалплана в формате: ${MONTH_DAY}
            </b-form-text>
        </p>
    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "GetMonthDay",
        mixins: [ baseTool ]
    }
</script>

<style scoped>

</style>