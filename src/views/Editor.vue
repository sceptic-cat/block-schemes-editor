<template>
    <div id="editor">
        <div id="editor-wrapper" class="row">
            <div class="col-lg-2 col-md-2">
                <div id="stencil" ref="stencil"></div>
            </div>
            <div class="col-lg-8 col-md-7">
                <div id="paper-container">
                    <div id="paper" ref="paper"></div>
                </div>
            </div>
            <div class="col-lg-2 col-md-3">
                <ParamsPanel />
            </div>
        </div>
        <b-button @click="exportJson">Экспорт в лог</b-button>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from "vuex";
    import ParamsPanel from "../components/ParamsPanel";
    import $ from 'jquery';  //Ну сорян... пока так...
    //templatesLoader импортировать прежде остальных инструментов, ибо тут грузятся шаблоны фигур для большинства инструментов
    import templatesLoader from "../tools/utils/templatesLoader";
    import helper from "../tools/utils/helper";
    import Start from "../tools/Start";
    import HangUp from "../tools/HangUp";
    import Playback from "../tools/Playback";
    import CheckCondition from "../tools/CheckCondition";

    export default {
        name: "Editor",
        components: {ParamsPanel},
        data() {
            return {
/*                tools: {
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
                },*/

            };
        },
        created() {
            this.setGraph(new this.$joint.dia.Graph({}, { cellNamespace: this.$joint.shapes }));
            this.stenchilGraph = new this.$joint.dia.Graph({}, { cellNamespace: this.$joint.shapes });
            templatesLoader.load(this.$joint);
        },
        mounted() {
            //console.log(`[${this.name}] Mounted:`, this.$refs.joint);
            //Основная рабочая область
            this.paper = new this.$joint.dia.Paper({
                el: this.$refs.paper,
                cellViewNamespace: this.$joint.shapes,
                model: this.getGraph(),
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
                'element:mouseenter': this.showRemoveBtn,
                'cell:mouseleave': (cellView) => { cellView.removeTools(); },
                'cell:pointerclick': this.onBlockClick,
/*                'all': function(evt, x, y) {
                    console.log("All events", evt, x, y);
                }*/
            });
            this.getGraph().on({
                /*'all': function(evt, x, y) {
                    console.log("All events", evt, x, y);
                },*/
                'add': function(cell) {
                    console.log('[ID]',cell.id);
                    console.log('[TYPE]', cell.attributes.type);
                }
            });

            //Панель инструментов
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

            //Загружаем базовые шаблоны фигур для построения инструментов
            this.setupTools(this.stenchilGraph);
            //Добавляем возможность перетаскивания элементов из панели инструментов на основную схему
            this.stenchil.on('cell:pointerdown', this.dragAndDrop);

           // this.$emit('init', this.getGraph());
        },
        methods: {
            ...mapActions(["setGraph"]),
            ...mapGetters(["getGraph"]),
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
            //Валидируем связи (стрелочки) между блоками
            validateConnection (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                var links = this.getGraph().getLinks();
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
            },
            dragAndDrop(cellView, e, x, y) {
                let body = $('body');
                body.append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.6;pointer-event:none; background-color:rgba(0, 0, 0, 0.0);"></div>');
                let flyGraph = new this.$joint.dia.Graph;
                new this.$joint.dia.Paper({
                    el: $('#flyPaper'),
                    model: flyGraph,
                    interactive: false
                });
                let flyShape = cellView.model.clone(),

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

                body.on('mousemove.fly', (e) => {
                    $("#flyPaper").offset({
                        left: e.pageX - offset.x,
                        top: e.pageY - offset.y
                    });
                });
                let paper = $('#paper');
                body.on('mouseup.fly', (e) => {
                    let x = e.pageX,
                        y = e.pageY,
                        target = paper.offset();

                    // Dropped over paper ?
                    if (x > target.left && x < target.left + paper.width() && y > target.top && y < target.top + paper.height()) {
                        let s = flyShape.clone();
                        s.position(x - target.left - offset.x, y - target.top - offset.y);
                        this.getGraph().addCell(s);
                        s.trigger('cell:pointerclick');
                    }
                    body.off('mousemove.fly').off('mouseup.fly');
                    flyShape.remove();
                    $('#flyPaper').remove();
                });
            },
            showRemoveBtn(elementView) {
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
            onBlockClick(cellView){
                //var isElement = cellView.model.isElement();
                //var message = (isElement ? 'Element' : 'Link') + ' removed';
                console.log('[click]', cellView);
            },
            onBlockHighlight(cellView){
                console.log('[highlight]', cellView);
            },
            exportJson(){
                console.log(this.getGraph().toJSON());
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