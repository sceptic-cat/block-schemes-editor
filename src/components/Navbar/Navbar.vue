<template>
    <div>
        <Messages />
        <ParseConfirm />
        <Variables />
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">
                <img src="img/logo.png" class="d-inline-block align-top" alt="logo" width="30px">
                Asterisk Dialplan
            </b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>Схема</em>
                        </template>
                        <b-dropdown-item href="#" @click="createNew">Новая</b-dropdown-item>
                        <b-dropdown-item href="#" @click="parse" v-if="this.$route.name==='Editor'">Преобразовать в код asterisk</b-dropdown-item>
                        <b-dropdown-item href="#" @click="exportToJson" v-if="this.$route.name==='Editor'">Экспорт в json</b-dropdown-item>
                        <b-dropdown-item href="#" @click="getJsonFile">Импорт из json</b-dropdown-item>
                        <b-dropdown-item href="#" @click="exportToLog">Экспорт в лог (dev)</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown>
                        <template #button-content>
                            <em>Помощь</em>
                        </template>
                        <b-dropdown-item href="#" @click="check" v-if="this.$route.name==='Editor'">Проверить схему</b-dropdown-item>
                        <b-dropdown-item href="#" @click="showVariables">Глобальные переменные</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">

                    <!--<b-nav-item-dropdown text="Lang" right>
                        <b-dropdown-item href="#">EN</b-dropdown-item>
                        <b-dropdown-item href="#">ES</b-dropdown-item>
                        <b-dropdown-item href="#">RU</b-dropdown-item>
                        <b-dropdown-item href="#">FA</b-dropdown-item>
                    </b-nav-item-dropdown>-->

                    <!--<b-nav-item-dropdown right>
                        &lt;!&ndash; Using 'button-content' slot &ndash;&gt;
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>-->
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <div style="display: none">
            <form id="import_form" @submit.prevent="importFromJson">
                <input id="import_file" type="file" name="import_file" size="chars" accept=".json" @change="importFromJson">
            </form>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import Messages from "../Modal/Messages";
    import Variables from "../Modal/Variables";
    import modal from "../mixins/modal";
    import files from "../mixins/files";
    import ParseConfirm from "../Modal/ParseConfirm";

    export default {
        name: "Navbar",
        mixins: [ modal, files ],
        components: {
            ParseConfirm,
            Messages,
            Variables
        },
        mounted() {
            this.$root.$on('component1', () => {
                this.getJsonFile();
            })
        },
        methods: {
            ...mapGetters(["getGraph"]),
            ...mapActions(["updateMessages"]),
            /**
             * Сохраняем схему на сервере
             */
            createNew() {
                if (this.$route.name == 'Editor') {
                    // console.log('[CUR ROUT]', this.$router.currentRoute);
                    this.$router.go(this.$router.currentRoute);
                } else {
                    this.$router.push({ name: 'Editor' });
                }
            },
            async parse(){
                const valid = this.validate();

                if (!valid.result) {
                    this.showModal('Ошибка в схеме', valid.message);
                    return false;
                }
                this.$bvModal.show('modal-parse-confirm');
                //ParseConfirm.methods.show();
                //return;

            },
            check(){
                const valid = this.validate();

                if (!valid.result) {
                    this.showModal('Ошибка в схеме', valid.message);
                } else {
                    this.showModal('Проверка завершена', '<p class="text-success">Схема корректна</p>');
                }
            },
            validate(){
                //Валидируем схему
                const allElem = this.getGraph().getElements();
                let isValid = true;
                let messages = [];
                let message = '';
                allElem.forEach((elem) => {
                    if (elem.attributes.validate && typeof elem.attributes.validate == "function") {
                        let validation = elem.attributes.validate(this.getGraph());
                        if (!validation.result) {
                            isValid = false;
                            messages = messages.concat(validation.messages);
                        }
                    }
                });
                if (!isValid) {
                    message += '<p><b>Схема собрана некорректно. Устраните следующие ошибки: </b></p><ol>';
                    messages.forEach(function(elem){
                        message += '<li>' + elem + '</li>';
                    });
                    message += '</ol>';

                }

                return {
                    result: isValid,
                    message: message
                }
            },
            async save(){
                const valid = this.validate();

                if (!valid.result) {
                    this.showModal('Ошибка в схеме', valid.message);
                    return false;
                }

                let formData = new FormData();
                formData.append("scheme", JSON.stringify( this.getGraph().toJSON() ));
                formData.append("user", "test");

                try {
                    await fetch(this.$localConfig.saveServiceUrl, {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((resp) => {
                        this.showModal(resp.save ? 'Уведомление' : 'Ошибка',  resp.message);
                    });
                } catch (e) {
                    console.error(e);
                    this.showModal('Ошибка', e.name + ": " + e.message);
                }
            },
            /**
             * Сохраняем схему в json файл
             */
            exportToJson(){
                const json = JSON.stringify( this.getGraph().toJSON() );
                this.createFile('asterisk_scheme', json, 'text/json');
            },
            /**
             * Эмулируем нажатие кнопки загрузки файла на скрытой форме
             */
            getJsonFile(){
                document.getElementById('import_file').click();
            },
            /**
             * Импортируем схему из json-файла
             * @returns {Promise<void>}
             */
            async importFromJson(){
                let file = document.getElementById('import_file').files[0];
                let formData = new FormData();
                formData.append("import_file", file);
                const url = this.$localConfig.importServiceUrl;

                try {
                    await fetch(url, {
                        method: "POST",
                        body: formData,
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((resp) => {
                        localStorage.setItem('scheme', resp.data);

                        if (this.$route.name == 'Editor') {
                            this.$router.go(this.$router.currentRoute);
                        } else {
                            this.$router.push({ name: 'Editor' });
                        }
                    });
                } catch (e) {
                    console.error(e);
                    this.showModal('Ошибка', e.name + ": " + e.message);
                }

            },
            exportToLog(){
                console.log(this.getGraph().toJSON());
            },
            /**
             * Показываем модалку со списком глобальных переменных
             */
            showVariables(){
                this.$bvModal.show('modal-variables');
            }
        }
    }
</script>

<style scoped>
    .navbar {
        padding: 0 5px;
    }
</style>