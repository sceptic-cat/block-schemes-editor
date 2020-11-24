<template>
    <div id="id_" ref="joint"></div>
</template>

<script>
    export default {
        name: 'JointPaper',
        props: {
            id_: {
                type: String,
                default: ""
            },
            width: {
                type: [String, Number],
                default: 1000
            },
            height: {
                type: [String, Number],
                default: 800
            },
            gridSize: {
                type: Number,
                default: 1
            },
            drawGrid: {
                type: [Object, Boolean],
                default: false
            },
            background: {
                type: [Object, Boolean],
                default: false
            },
            readonly: {
                type: Boolean,
                default: false
            }
        },
        created() {
            this.name = this.$options.name;
            console.log(`[${this.name}] Created`);
            this.graph = new this.$joint.dia.Graph({ }, { cellNamespace: this.$joint.shapes });
        },
        mounted() {
            console.log(`[${this.name}] Mounted:`, this.$refs.joint);
            let paper = new this.$joint.dia.Paper({
                el: this.$refs.joint,
                cellViewNamespace: this.$joint.shapes,
                model: this.graph,
                width: this.width,
                height: this.height,
                gridSize: this.gridSize,
                drawGrid: {
                    name: 'mesh',
                        args: {
                        color: 'lightgray'
                    }
                },
                background: {
                    color: 'darkseagreen'
                },
                interactive: !this.readonly
            });
            /*  eslint-disable */
            paper.on('cell:pointerdown', function(cellView, e, x, y) {
                console.log('YeeeeeeaaaaaH!!!!');
            });
/*
            this.paper.on('cell:pointerdown', function(cellView, e, x, y) {
                console.log('YeeeeeeaaaaaH!!!!');
            });*/
            /*eslint-enable */
            this.$emit('init', this.graph);
        }
    };
</script>

<style scoped>
</style>