<template>
  <div id="app">
    <component :is="layout">
      <router-view/>
    </component>
  </div>
</template>

<script>
  import MainLayout from "./views/layouts/MainLayout";

  export default {
    computed:{
      layout() {
        return (this.$route.meta.layout || 'main') + '-layout'
      }
    },
    components: {
      MainLayout
    }
  }
</script>

<style>
/*
  #nav {
    padding: 30px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }*/
</style>
