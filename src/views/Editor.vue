<template>
    <div id="editor">
        <div class="container-fluid d-flex h-100">
            <div class="white h-100 flex-fixed-width-item">
                <div id="stencil-container">
                    <div id="stencil" ref="stencil"></div>
                </div>
            </div>
            <div class="flex-item-65 blue h-100">
                <div id="paper-container">
                    <div id="paper" ref="paper"></div>
                </div>
            </div>
            <div class="flex-item-15 blue h-100">
                <ParamsPanel :tool="currentTool" />
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
                currentTool: {
                    id: '',
                    type: ''
                }
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
                width: 8000,
                height: 8000,
                gridSize: 14,
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
                validateConnection: this.validateConnection,
                allowLink: this.allowLink
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
/*                'all': function(evt, x, y) {
                    console.log("All events", evt, x, y);
                },*/
                'add': (cell) => {
                    if (cell.attributes.type !== 'link') {
                        this.currentTool = {
                            id: cell.id,
                            type: cell.attributes.type,
                            data: cell.attributes.data
                        }
                    }
                }
            });

            //Панель инструментов
            this.stenchil = new this.$joint.dia.Paper({
                el: this.$refs.stencil,
                cellViewNamespace: this.$joint.shapes,
                model: this.stenchilGraph,
                width: 141,
                height: 8000,
                interactive: false,
                markAvailable: true,
                gridSize: 10,
                drawGrid: {
                    name: 'mesh',
                    args: {
                        color: 'blue'
                    }
                },
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
                const cells = [
                    Start.create(this.$joint),
                    Playback.create(this.$joint),
                    Playback.create(this.$joint),
                    CheckCondition.create(this.$joint),
                    Playback.create(this.$joint),
                    Start.create(this.$joint),
                    Playback.create(this.$joint),
                    CheckCondition.create(this.$joint),
                    CheckCondition.create(this.$joint),
                    HangUp.create(this.$joint),
                    Playback.create(this.$joint),
                    Start.create(this.$joint),
                    CheckCondition.create(this.$joint),
                    HangUp.create(this.$joint),
                    CheckCondition.create(this.$joint),
                    // HangUp.create(this.$joint/*, 40, 350*/),
                ];

                let y = -30; //Поправка на первый элемент
                let prev = null;
                cells.forEach((cell) => {
                    let inPortOffset = cell.attributes.inPorts.length > 0 ? 10 : 0;
                    let prevOutPortOffset = prev && prev.outPorts.length > 0 ? 10 : 0;
                    let marginTop = 10;

                    let offset = cell.attributes.size.height + prevOutPortOffset + inPortOffset + marginTop;
                    y += offset;

                    //console.log(cell.attributes.type, offset, y);
                    if (prev) {
                        //TODO:: handle with problem elements and rid from this crutches
                        //Костыли, потребовавшиеся из-за того, что мы повернули базовые элементы модели
                        if ( cell.attributes.originShape == 'circle' && prev.originShape != 'circle' ) {
                            y+= 20;
                        }
                        if (prev.originShape == 'circle' && cell.attributes.originShape != 'circle') {
                            y -= 20;
                        }

                        if ( cell.attributes.originShape == 'diamond' && prev.originShape != 'diamond' ) {
                            y-= 20;
                        }
                        if (prev.originShape == 'diamond' && cell.attributes.originShape != 'diamond') {
                            y += 20;
                        }
                    }

                    prev = cell.attributes;
                    cell.position(
                        Math.ceil((this.stenchil.options.width - cell.attributes.size.width) / 2 ),
                        y
                     )
                });

                graph.addCells(cells);
            },
            //Валидируем связи (стрелочки) между блоками
            /*eslint-disable */
            validateConnection (cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                // Prevent linking from input ports.
                if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
                // Prevent linking from output ports to input ports within one element.
                if (cellViewS === cellViewT) return false;
                // Prevent linking to input ports.
                return magnetT && magnetT.getAttribute('port-group') === 'in';
            },
            allowLink (linkView, paper) {
                const source = linkView.model.attributes.source;
                //const target = linkView.model.attributes.target;
                let linkCnt = 0;
                paper.model.attributes.cells.models.forEach((cell) => {
                    //Запрещаем делать несколько стрелок из одного out порта
                    if (cell.attributes.type === 'link' &&
                        cell.attributes.source.id === source.id &&
                        cell.attributes.source.port === source.port
                    ) {
                        linkCnt++;
                    }
                });
                if (linkCnt > 1) return false;
                //Запрещаем делать ссылки без цели
                if (!linkView.targetView) return false;
                return true;
            },
            /*eslint-enable */
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
                if (cellView.model.attributes.type !== 'link') {
                    this.currentTool = {
                        id: cellView.model.id,
                        type: cellView.model.attributes.type,
                        data: cellView.model.attributes.data
                    }
                }
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
    #editor {
        padding-top: 5px;
    }

    .flex-fixed-width-item {
        flex: 0 0 165px;
    }

    .flex-item-15 {
        flex: 1 0 15%;
    }

    .flex-item-65 {
        flex: 1 0 65%;
    }

    #paper-container {
        overflow: scroll;
        width: 69vw;
        height: 90vh;
        border: 1px solid #000000;
        background: #6dff7f;
    }

    #stencil {
        border: 1px solid #000000;
        width: 160px;
    }

    #stencil-container {
        overflow-y: scroll;
        width: 160px;
        height: 90vh;
    }
</style>