<template>
    <div class="main-layout">
        <nav>
            <Navbar />
        </nav>
        <main class="app-content container-fluid">
            <div class="app-page">
                <router-view />
            </div>
        </main>
    </div>
</template>

<script>
    import Navbar from "../../components/Navbar/Navbar";

    export default {
        name: "MainLayout",
        components: {
            Navbar
        }
    }
</script>

<style scoped>
    .app-content {
        padding: 5px;
    }
</style>