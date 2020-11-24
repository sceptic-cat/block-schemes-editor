<template>
  <div class="editor">
    <div class="row">
      <div class="col-md-2">
        <joint-paper :id="tools.id_" :background="tools.background" :grid-size="tools.gridSize" :draw-grid="tools.drawGrid" @init="setupTools" />
      </div>
      <div class="col-md-10">
        <joint-paper :id="schema.id_" :background="schema.background" :grid-size="schema.gridSize" :draw-grid="schema.drawGrid" @init="setupSchema" />
      </div>
    </div>
  </div>
</template>

<script>
import JointPaper from '@/components/Joint/JointPaper';

export default {
  name: 'Editor',
  components: {
    JointPaper
  },
  data() {
    return {
      tools: {
        id_: 'tools',
        background: {
          color: 'darkseagreen'
        },
     //   gridSize: 10,
        width: 200,
     //   height: 600
/*        drawGrid: {
          name: 'mesh',
          args: {
            color: 'darkgray'
          }
        }*/
      },
      schema: {
        id_: 'schema',
        background: {
          color: 'darkseagreen'
        },
        gridSize: 15,
        drawGrid: {
          name: 'mesh',
          args: {
            color: 'lightgray'
          }
        }
      },
    };
  },
  methods: {
    setupTools(graph){
      console.log('Tools loaded', graph);
      const rect = new this.$joint.shapes.standard.Rectangle();
      rect.position(10, 10);
      rect.resize(100, 40);
      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: 'Hello',
          fill: 'white'
        }
      });
      rect.addTo(graph);
      const rect2 = rect.clone();
      rect2.translate(0, 50);
      rect2.attr('label/text', 'World!');
      rect2.addTo(graph);
    },
    setupSchema(graph) {
      const rect = new this.$joint.shapes.standard.Rectangle();
      rect.position(100, 30);
      rect.resize(100, 40);
      rect.attr({
        body: {
          fill: 'blue'
        },
        label: {
          text: 'Hello',
          fill: 'white'
        }
      });
      rect.addTo(graph);
      const rect2 = rect.clone();
      rect2.translate(300, 0);
      rect2.attr('label/text', 'World!');
      rect2.addTo(graph);
      const link = new this.$joint.shapes.standard.Link();
      link.source(rect);
      link.target(rect2);
      link.addTo(graph);
    }
  }
}
</script>
