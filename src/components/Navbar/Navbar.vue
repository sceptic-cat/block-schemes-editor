<template>
    <div>
        <Messages />
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
                        <b-dropdown-item href="#" @click="exportToJson">Экспорт в json</b-dropdown-item>
                        <b-dropdown-item href="#" @click="getJsonFile">Импорт из json</b-dropdown-item>
                        <b-dropdown-item href="#" @click="testA">Тест</b-dropdown-item>
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
    import { mapGetters } from "vuex";
    import Messages from "../Modal/Messages";
    export default {
        name: "Navbar",
        components: {
            Messages
        },
        methods: {
            ...mapGetters(["getGraph"]),
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
            getJsonFile(){
                document.getElementById('import_file').click();
            },
            async importFromJson(){
                let file = document.getElementById('import_file').files[0];
                let formData = new FormData();
                formData.append("import_file", file);
                const url = 'http://localhost/dialplan/web/index.php/editor-api/get-json';

                try {
                    await fetch(url, {
                        method: "POST",
                        body: formData,
                        //mode: 'no-cors',
                        headers: {
                            "Accept": "application/json"
                        }
                    }).then((response) => {
                        return response.json();
                    }).then((resp) => {
                        console.log(resp);
                        this.getGraph().fromJSON(JSON.parse(resp.data));
                    });
                } catch (e) {
                    console.error(e);
                    this.$bvModal.show('modal-message');
                }

            },
            testA() {
                this.$bvModal.show('modal-message');
            }
        }
    }
</script>

<style scoped>
    .navbar {
        padding: 0 5px;
    }
</style>