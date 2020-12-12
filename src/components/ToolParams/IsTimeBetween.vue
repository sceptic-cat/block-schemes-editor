<template>
    <div>
        <b-form-group
                id="is-time-between-begin-group"
                label="Начало:"
                label-for="is-time-between-begin"
        >
            <b-form-timepicker
                    id="is-time-between-begin"
                    v-model="form.begin"
                    button-only
                    right
            ></b-form-timepicker>
        </b-form-group>

        <b-form-group
                id="is-time-between-end-group"
                label="Конец:"
                label-for="is-time-between-end"
        >
            <b-form-timepicker
                    id="is-time-between-end"
                    v-model="form.end"
                    button-only
                    right
            ></b-form-timepicker>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "IsTimeBetween",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    begin: this.data.begin,
                    end: this.data.end
                },
                value: '',
                context: null,
                locale: 'ru-RU',
                locales: [
                    { value: 'en-US', text: 'English US (en-US)' },
                    { value: 'ru-RU', text: 'Русский (ru-RU)' },
                ],
                labels: {
                    de: {
                        labelHours: 'Часы',
                        labelMinutes: 'Минуты',
                        labelSeconds: 'Секунды',
                        labelIncrement: 'Erhöhen',
                        labelDecrement: 'Verringern',
                        labelSelected: 'Ausgewählte Zeit',
                        labelNoTimeSelected: 'Keine Zeit ausgewählt'
                    },
                }
            }
        },
        methods: {
            onContext(ctx) {
                this.context = ctx
            }
        }
    }
</script>

<style scoped>

</style>