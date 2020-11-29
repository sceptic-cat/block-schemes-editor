<template>
    <div>
        <div v-if="currentTool">
            <component v-bind:is="currentTool" />
<!--            <button v-on:click="toggle">Toggle</button>
            <p>{{tool.id}}</p>
            <p>{{currentTool}}</p>-->
        </div>
        <div v-else>
            <p>Component not loaded</p>
        </div>
    </div>
</template>

<script>
    import Playback from "./ToolParams/Playback";
    import CheckCondition from "./ToolParams/CheckCondition";
    import Start from "./ToolParams/Start";

    export default {
        name: "ParamsPanel",
        components: {
            Playback,
            CheckCondition,
            Start
        },
        computed: {
            //Получаем название модуля для подгрузки
            currentTool: function() {
                let componentName = '';
                if (this.tool.type) {
                    componentName = this.tool.type.substr(5);
                    componentName = componentName.substr(0,  componentName.length - 5);
                    if (!(componentName in this.$options.components)) {
                        console.warn('Компонент с именем ' + componentName + ' не найдет в списке. ' +
                            'Проверьте, что он был подключен или имеет верный формат имени');
                        componentName = '';
                    }
                }
                return componentName;
            }
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