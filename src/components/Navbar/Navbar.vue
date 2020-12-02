<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="/">Asterisk Dialplan</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item-dropdown>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>Схема</em>
                        </template>1
                        <b-dropdown-item href="#" @click="exportToJson">Экспорт в json</b-dropdown-item>
                        <b-dropdown-item href="#">Импорт из json</b-dropdown-item>
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
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    export default {
        name: "Navbar",
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
            }
        }
    }
</script>

<style scoped>
    .navbar {
        padding: 0 5px;
    }
</style>