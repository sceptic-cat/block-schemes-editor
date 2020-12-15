<template>
    <div>
        <b-form-group
                id="transfer-number-group"
                label="Номер:"
                label-for="transfer-number"
        >
            <b-form-input
                    id="transfer-number"
                    required
                    v-model="form.number"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="transfer-music-group">
            <b-form-checkbox
                    id="transfer-music"
                    v-model="form.music"
                    switch
                    size="lg"
            >
                Музыка
            </b-form-checkbox>
            <b-form-text id="transfer-music-help">
                <p> Воспроизводить ли музыку для абонента при переводе звонка. </p>
            </b-form-text>
        </b-form-group>

        <b-form-group
                id="transfer-timeout-group"
                label="Таймаут (секунд):"
                label-for="transfer-timeout"
        >
            <b-form-input
                    id="transfer-timeout"
                    type="number"
                    v-model="form.timeout"
            ></b-form-input>
            <b-form-text id="set-call-priority-value-help">
                <p> Необязательно. Если не задан, то перевод будет совершаться неопределенно долго,
                    и закончит свое выполнение, если только по вызывающему каналу будет разорвана связь
                    или на всех вызываемых каналах будет определено состояние "занято". </p>
            </b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "Transfer",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    number: this.data.number,
                    music: this.data.music,
                    timeout: this.data.timeout,
                }
            }
        }
    }
</script>

<style scoped>

</style>