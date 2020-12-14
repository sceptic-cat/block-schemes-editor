<template>
    <div>
<!--        <b-form-group
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
        </b-form-group>-->

        <label for="is-time-between-begin">Время с:</label>
        <b-input-group class="mb-3">
            <b-form-input
                    id="is-time-between-begin"
                    v-model="form.begin"
                    type="text"
                    placeholder="HH:mm"
                    maxlength="5"
            ></b-form-input>
            <b-input-group-append>
                <b-form-timepicker
                        v-model="form.begin"
                        button-only
                        right
                        hide-header
                        aria-controls="is-time-between-begin"
                ></b-form-timepicker>
            </b-input-group-append>
        </b-input-group>

        <label for="is-time-between-end">Время по:</label>
        <b-input-group class="mb-3">
            <b-form-input
                    id="is-time-between-end"
                    v-model="form.end"
                    type="text"
                    placeholder="HH:mm"
                    maxlength="5"
            ></b-form-input>
            <b-input-group-append>
                <b-form-timepicker
                        v-model="form.end"
                        button-only
                        right
                        aria-controls="is-time-between-end"
                ></b-form-timepicker>
            </b-input-group-append>
        </b-input-group>

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
                    ru: {
                        labelHours: 'Часы',
                        labelMinutes: 'Минуты',
                        labelSeconds: 'Секунды',
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