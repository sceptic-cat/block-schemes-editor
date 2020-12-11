<template>
    <div>
        <b-form-group
                id="say-number-number-group"
                label="Номер:"
                label-for="say-number-number"
        >
            <b-form-input
                    id="say-number-number"
                    v-model="form.number"
                    type="number"
                    placeholder="0"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="say-number-gender-group" label="Пол:" label-for="say-number-gender">
            <b-form-select id="say-number-gender" v-model="form.gender" :options="options"></b-form-select>
            <b-form-text id="start-delay-help">
            </b-form-text>
            <b-form-text id="say-number-gender-help">Голос, которым будет воспроизводиться номер.</b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "SayNumber",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    number: this.data.number,
                    gender: this.data.gender,
                },
                options: [
                    { value: 'f', text: 'Женский' },
                    { value: 'm', text: 'Мужской' },
                    { value: 'c', text: 'Компьютерный' }
                ]
            }
        }
    }
</script>

<style scoped>

</style>