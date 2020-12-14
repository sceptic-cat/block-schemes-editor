<template>
    <div id="param-panel">
        <div v-if="currentTool">
            <component v-bind:is="currentTool" :id="tool.id" :data="tool.data" />
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
    import PlaySilence from "./ToolParams/PlaySilence";
    import SayDigits from "./ToolParams/SayDigits";
    import SayNumber from "./ToolParams/SayNumber";
    import Background from "./ToolParams/Background";
    import CheckCondition from "./ToolParams/CheckCondition";
    import Start from "./ToolParams/Start";
    import CountActiveCalls from "./ToolParams/CountActiveCalls";
    import ExecuteScript from "./ToolParams/ExecuteScript";
    import GetCurrentTime from "./ToolParams/GetCurrentTime";
    import GetMonthDay from "./ToolParams/GetMonthDay";
    import GetWeekDay from "./ToolParams/GetWeekDay";
    import IsTimeBetween from "./ToolParams/IsTimeBetween";
    import SetTimeout from "./ToolParams/SetTimeout";
    import SetVariableValue from "./ToolParams/SetVariableValue";
    import VerifyRegularExpression from "./ToolParams/VerifyRegularExpression";

    export default {
        name: "ParamsPanel",
        components: {
            Background,
            Playback,
            CheckCondition,
            PlaySilence,
            SayDigits,
            SayNumber,
            Start,
            CountActiveCalls,
            ExecuteScript,
            GetCurrentTime,
            GetMonthDay,
            GetWeekDay,
            IsTimeBetween,
            SetTimeout,
            SetVariableValue,
            VerifyRegularExpression
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
        props: ['tool']
    }
</script>

<style scoped>
    #param-panel {
        padding-left: 5px;
    }
</style>