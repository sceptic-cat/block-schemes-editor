<template>
    <div>
        <b-form-group
                id="external-transfer-number-group"
                label="Номер:"
                label-for="external-transfer-number"
        >
            <b-form-input
                    id="external-transfer-number"
                    required
                    v-model="form.number"
            ></b-form-input>
        </b-form-group>

        <b-form-group
                id="external-transfer-gate-group"
                label="Шлюз:"
                label-for="external-transfer-gate"
        >
            <b-form-input
                    id="external-transfer-gate"
                    required
                    v-model="form.gate"
            ></b-form-input>
        </b-form-group>

        <b-form-group id="external-transfer-music-group">
            <b-form-checkbox
                    id="external-transfer-music"
                    v-model="form.music"
                    switch
                    size="lg"
            >
                Музыка
            </b-form-checkbox>
            <b-form-text id="external-transfer-music-help">
                <p> Воспроизводить ли музыку для абонента при переводе звонка. </p>
            </b-form-text>
        </b-form-group>

        <b-form-group
                id="external-transfer-timeout-group"
                label="Таймаут (секунд):"
                label-for="external-transfer-timeout"
        >
            <b-form-input
                    id="external-transfer-timeout"
                    type="number"
                    v-model="form.timeout"
            ></b-form-input>
            <b-form-text id="external-transfer-timeout-help">
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
        name: "ExternalTransfer",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    number: this.data.number,
                    gate: this.data.gate,
                    music: this.data.music,
                    timeout: this.data.timeout,
                }
            }
        }
    }
</script>

<style scoped>

</style>