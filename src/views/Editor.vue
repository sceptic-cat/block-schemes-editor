<template>
    <div id="editor">
        <div id="editor-wrapper" class="row">
            <div class="col-lg-2 col-md-3">
                <div id="stencil" ref="stencil"></div>
            </div>
            <div class="col-lg-10 col-md-9">
                <div id="paper-container">
                    <div id="paper" ref="paper"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import $ from 'jquery';  //Ну сорян... пока так...
    //Импортировать в первую очередь, ибо тут грузятся шаблоны фигур для большинства инструментов
    import templatesLoader from "../tools/utils/templatesLoader";
    import helper from "../tools/utils/helper";
    import Start from "../tools/Start";
    import HangUp from "../tools/HangUp";
    import Playback from "../tools/Playback";
    import CheckCondition from "../tools/CheckCondition";


    export default {
        name: "Editor",
        data() {
            return {
                tools: {
                    id_: 'tools',
                    background: {
                        color: 'darkseagreen'
                    },
                    width: 200
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
        created() {
            this.graph = new this.$joint.dia.Graph({}, { cellNamespace: this.$joint.shapes });
            this.stenchilGraph = new this.$joint.dia.Graph({}, { cellNamespace: this.$joint.shapes });
            templatesLoader.load(this.$joint);
        },
        mounted() {
            //console.log(`[${this.name}] Mounted:`, this.$refs.joint);
            this.paper = new this.$joint.dia.Paper({
                el: this.$refs.paper,
                cellViewNamespace: this.$joint.shapes,
                model: this.graph,
                width: 5000,
                height: 8000,
                gridSize: 15,
                markAvailable: true,
                interactive: true,
                clickThreshold: 5,
                drawGrid: {
                    name: 'mesh',
                    args: {
                        color: 'lightgray'
                    }
                },
                background: {
                    color: 'darkseagreen'
                },
                defaultLink: new this.$joint.dia.Link({
                    attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }}
                }),
                validateConnection: this.validateConnection
            });

            this.paper.on({
                'element:mouseenter': (elementView) => {
                    var model = elementView.model;
                    //показываем кнопку удаления элемента
                    elementView.addTools(new this.$joint.dia.ToolsView({
                        tools: [
                            new this.$joint.elementTools.Remove({
                                useModelGeometry: true,
                                y: '0%',
                                x: '100%',
                                offset: helper.getCloseBtnPosition(model.attributes.type)
                            })
                        ]
                    }));
                },
                'cell:mouseleave': (cellView) => {
                    cellView.removeTools();
                },
            });

            this.stenchil = new this.$joint.dia.Paper({
                el: this.$refs.stencil,
                cellViewNamespace: this.$joint.shapes,
                model: this.stenchilGraph,
                width: 200,
                height: window.screen.height - 200,
                interactive: false,
                markAvailable: true,
                background: {
                    color: 'darkseagreen'
                },
                defaultLink: new this.$joint.dia.Link({
                    attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' }}
                })
            });

            this.setupTools(this.stenchilGraph);

            //Добавляем возможность перетаскивания элементов из панели инструментов на основную схему
            this.stenchil.on('cell:pointerdown', (cellView, e, x, y) => {
                $('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.6;pointer-event:none; background-color:rgba(0, 0, 0, 0.0);"></div>');
                var flyGraph = new this.$joint.dia.Graph;
                    new this.$joint.dia.Paper({
                        el: $('#flyPaper'),
                        model: flyGraph,
                        interactive: false
                    });
                var flyShape = cellView.model.clone(),

                    pos = cellView.model.position(),
                    offset = {
                        x: x - pos.x,
                        y: y - pos.y
                    };
                //flyShape.ports = cellView.model._portElementsCache.clone();

                flyShape.position(0, 0);
                flyGraph.addCell(flyShape);
                $("#flyPaper").offset({
                    left: e.pageX - offset.x,
                    top: e.pageY - offset.y
                });
                var body = $('body');
                body.on('mousemove.fly', (e) => {
                    $("#flyPaper").offset({
                        left: e.pageX - offset.x,
                        top: e.pageY - offset.y
                    });
                });
                var paper = $('#paper');
                body.on('mouseup.fly', (e) => {
                    var x = e.pageX,
                        y = e.pageY,
                        target = paper.offset();

                    // Dropped over paper ?
                    if (x > target.left && x < target.left + paper.width() && y > target.top && y < target.top + paper.height()) {
                        var s = flyShape.clone();
                        s.position(x - target.left - offset.x, y - target.top - offset.y);
                        this.graph.addCell(s);
                    }
                    body.off('mousemove.fly').off('mouseup.fly');
                    flyShape.remove();
                    $('#flyPaper').remove();
                });
            });

           // this.$emit('init', this.graph);
        },
        methods: {
            //Подгружаем инструменты в
            setupTools(graph){
               // console.log('Tools loaded', graph);
                const startBlock = Start.create(this.$joint, 70, 50);
                const playbackBlock = Playback.create(this.$joint, 59, 120);
                const checkConditionBlock = CheckCondition.create(this.$joint, 35, 210);
                const hangUpBlock = HangUp.create(this.$joint, 70, 350);


                graph.addCells([
                    startBlock,
                    playbackBlock,
                    checkConditionBlock,
                    hangUpBlock
                ]);
            },
            validateConnection (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                var links = this.graph.getLinks();
                for (var i = 0; i < links.length; i++) {
                    if(linkView == links[i].findView(this.paper)) //Skip the wire the user is drawing
                        continue;

                    if ( (( cellViewT.model.id  == links[i].get('source').id ) && ( magnetT.getAttribute('port') == links[i].get('source').port)) ||
                        (( cellViewT.model.id  == links[i].get('target').id ) && ( magnetT.getAttribute('port') == links[i].get('target').port)) ){
                        return false;
                    }
                }
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Prevent linking from output ports to input ports within one element.
                if (cellViewS === cellViewT) return false;
                // Prevent linking to input ports.
                return magnetT && magnetT.getAttribute('port-group') === 'in';
            }
        }
    }
</script>

<style scoped>
    #editor-wrapper {
        margin-left: 0;
        margin-right: 0;
    }

    #paper-container {
        overflow: scroll;
        width: 97%;
        height: 90vh;
        border: 2px solid #000000;
        background: #6dff7f;
    }

    #stencil {
        background: #8bb0ff;
        width: 300px;
    }
</style>