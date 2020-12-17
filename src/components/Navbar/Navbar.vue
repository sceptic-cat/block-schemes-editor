<template>
    <div>
        <Messages />
        <Variables />
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">Asterisk Dialplan</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>Схема</em>
                        </template>
                        <b-dropdown-item to="/editor" :key="$route.fullPath">Новая</b-dropdown-item>
                        <b-dropdown-item href="#" @click="save">Сохранить</b-dropdown-item>
                        <b-dropdown-item href="#" @click="exportToJson">Экспорт в json</b-dropdown-item>
                        <b-dropdown-item href="#" @click="getJsonFile">Импорт из json</b-dropdown-item>
                        <b-dropdown-item href="#" @click="exportToLog">Экспорт в лог</b-dropdown-item>
                    </b-nav-item-dropdown>
                    <b-nav-item-dropdown>
                        <template #button-content>
                            <em>Помощь</em>
                        </template>
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

                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>User</em>
                        </template>
                        <b-dropdown-item href="#">Profile</b-dropdown-item>
                        <b-dropdown-item href="#">Sign Out</b-dropdown-item>
                    </b-nav-item-dropdown>
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

    export default {
        name: "Navbar",
        components: {
            Messages,
            Variables
        },
        methods: {
            ...mapGetters(["getGraph", "getScheme"]),
            ...mapActions(["updateMessages", "setScheme"]),
            /**
             * Сохраняем схему на сервере
             */
            async save(){
                //Валидируем схему
                const allElem = this.getGraph().getElements();
                let isValid = true;
                let messages = [];
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
                    let message = '<p><b>Схема собрана некорректно. Устраните следующие ошибки: </b></p><ol>';
                    messages.forEach(function(elem){
                        message += '<li>' + elem + '</li>';
                    });
                    message += '</ol>';
                    this.updateMessages({
                        title: 'Ошибка в схеме',
                        message: message
                    });
                    this.$bvModal.show('modal-message');
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
                        this.updateMessages({
                            title: resp.save ? 'Уведомление' : 'Ошибка',
                            message: resp.message
                        });
                        this.$bvModal.show('modal-message');
                    });
                } catch (e) {
                    console.error(e);
                    this.updateMessages({
                        title: 'Ошибка',
                        message: e.name + ": " + e.message
                    });
                    this.$bvModal.show('modal-message');
                }
            },
            /**
             * Сохраняем схему в json файл
             */
            exportToJson(){
                const json = JSON.stringify( this.getGraph().toJSON() );
                const file = new Blob([json], {type: 'text/json'});
                if (window.navigator.msSaveOrOpenBlob) // IE10+
                    window.navigator.msSaveOrOpenBlob(file, 'asterisk_scheme.json');
                else { // Others
                    let a = document.createElement("a"),
                        url = URL.createObjectURL(file);
                    a.href = url;
                    a.download = 'asterisk_scheme.json';
                    document.body.appendChild(a);
                    a.click();
                    setTimeout(function() {
                        document.body.removeChild(a);
                        window.URL.revokeObjectURL(url);
                    }, 0);
                }
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
                        console.log(resp);
                        this.setScheme(resp.data);

                        this.$router.push({ name: 'Editor' });
                       // this.getGraph().fromJSON(JSON.parse(resp.data));
                    });
                } catch (e) {
                    console.error(e);
                    this.$bvModal.show('modal-message');
                    this.updateMessages({
                        title: 'Ошибка',
                        message: e.name + ": " + e.message
                    })
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