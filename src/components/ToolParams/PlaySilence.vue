<template>
    <div>
        <b-form-group id="play-silence-duration-group" label="Длительность" label-for="play-silence-duration">
            <b-form-input
                    id="play-silence-duration"
                    v-model="form.duration"
                    type="number"
                    placeholder="0"
            ></b-form-input>
            <b-form-text id="play-silence-duration-help">Время в секундах, на протяжении которого будет длиться ожидание.</b-form-text>
        </b-form-group>

    </div>
</template>

<script>
    import baseTool from './mixins/baseTool'
    export default {
        name: "PlaySilence",
        mixins: [ baseTool ],
        data() {
            return {
                form: {
                    duration: this.data.duration
                }
            }
        }
    }
</script>

<style scoped>

</style>