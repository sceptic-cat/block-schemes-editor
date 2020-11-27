<template>
    <div>
        <component v-bind:is="component" />
        <button v-on:click="toggle">Toggle</button>
        <p>{{tool.id}}</p>
        <p>{{tool.type}}</p>
    </div>
</template>

<script>
    import Playback from "./ToolParams/Playback";
    import CheckCondition from "./ToolParams/CheckCondition";

    export default {
        name: "ParamsPanel",
        components: {
            Playback,
            CheckCondition
        },
        props: ['tool'],
        data () {
            return {
                component:"Playback"
            }
        },
        methods: {
            toggle(){
                if (this.component === "Playback") {
                    this.component = CheckCondition;
                } else {
                    this.component = Playback;
                }
            }
        }
    }
</script>

<style scoped>

</style>