<template>
    <div>
        <b-form-group
                id="check-condition-group"
                label="Условие:"
                label-for="check-condition-condition"
        >
            <b-form-input
                    id="check-condition-condition"
                    v-model="condition"
                    required
                    placeholder="Условие"
            ></b-form-input>
            <b-form-text id="check-condition-condition-help">
                <p>Операторы сравнения</p>
                <ul>
                    <li>expr1 = expr2</li>
                    <li>expr1 != expr2</li>
                    <li>expr1 &lt; expr2</li>
                    <li>expr1 &gt; expr2</li>
                    <li>expr1 &lt;= expr2</li>
                    <li>expr1 &gt;= expr2</li>
                </ul>
            </b-form-text>
        </b-form-group>
    </div>
</template>

<script>
    export default {
        name: "CheckCondition",
        props: ['id', 'data'],
        data() {
            return {
                uid: this.id,
                condition: this.data.condition
            }
        }
    }
</script>

<style scoped>

</style>