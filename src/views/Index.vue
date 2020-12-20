<template>
  <div>
    <div class="container">
      <div>
        <b-card
                overlay
                img-src="https://picsum.photos/900/250/?image=35"
                img-alt="Новая схема"
                title="Новая схема"
                sub-title="Начните разработку новой схемы диалплана отсюда."
        >
          <b-button href="#" @click="goToEditor" class="btn-success">Новая схема</b-button>
        </b-card>

        <b-card
                overlay
                img-src="https://picsum.photos/900/250/?image=33"
                img-alt="Импорт схемы"
                title="Импорт схемы"
                sub-title="Импорт ранее созданной в редакторе схемы из json файла"
        >
          <b-button href="#" @click="c2method" class="btn-success">Импорт схемы</b-button>
        </b-card>
      </div>

      <div>

      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "Index",
    methods: {
      goToEditor(){
        this.$router.push({ name: 'Editor' });
      },
      c2method: function(){
        this.$root.$emit('component1') //like this
      },
    }
  }
</script>

<style scoped>
  .card {
    margin-top: 5px;
  }
</style>