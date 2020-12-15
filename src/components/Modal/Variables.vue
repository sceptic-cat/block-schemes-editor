<template>
    <b-modal class="text-lg-center" id="modal-variables" size="xl" ref="modal-variable" title="Список глобальных переменных">
        <b-table bordered striped :items="items" :fields="fields">
          <!--  <template #cell(create_btn)="data">
                &lt;!&ndash; `data.value` is the value after formatted by the Formatter &ndash;&gt;
                <b>{{ data.value }}</b>
            </template>-->
         </b-table>
    </b-modal>
</template>

<script>
    export default {
        name: "Variables",
        data() {
            return {
                // Note 'isActive' is left out and will not appear in the rendered table
                fields: [
                    {
                        key: 'name',
                        label: 'Имя переменной',
                        sortable: true,
                        tdClass: function (value, key, item) {
                            console.log(item.index);
                            return 'pisos';
                        }
                    },
                    {
                        key: 'description',
                        label: 'Описание',
                        sortable: false
                    }/*,
                    {
                        key: 'copy_btn',
                        label: '',
                        sortable: false,
                        formatter: 'createBtn'
                        // Variant applies to the whole column, including the header and footer
                    }*/
                ],
                items: [
                    {
                        name: '${CALLERID(dnid)}',
                        description: 'Номер вызываемого абонента'
                    },
                    {
                        name: '${CALLERID(num)}',
                        description: 'Номер звонящего'
                    },
                    {
                        name: '${CALLERID(name)}',
                        description: 'Логин звонящего'
                    },
                    {
                        name: '${UNIQUEID}',
                        description: 'Id звонка (сессии)'
                    },
                    {
                        name: '${QUEUE_MEMBER(${QUEUE_NAME},ready)}',
                        description: 'Количество операторов готовых принять вызов из очереди в данный момент,' +
                            ' где ${QUEUE_NAME} - название очерени (вписать свое название, если переменная' +
                            ' ${QUEUE_NAME} не была определена ранее в сценарии)'
                    },
                ]
            }
        },
        methods: {
           /* createBtn(value) {
                return `<button>${value}</button>`
            }*/
        }
    }
</script>

<style scoped>

</style>