import validation from "./utils/validation";

export default {
    create(joint){
        joint.shapes.devs.HangUpModel = joint.shapes.devs.Model.extend({

            markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            //portMarkup: '<g class="port"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({

                type: 'devs.HangUpModel',
                attrs: {
                    '.body': {
                        r: 45,
                        cx: 45,
                        // stroke: 'blue',
                        fill: '#d24335'
                    },
                    '.label': {
                        text: 'Hang Up',
                        'font-size': 15,
                        'ref-y': 2,
                        'y-alignment': 'middle'
                    },
                    '.port-label': {
                        position: {
                            y: -1
                        }
                    }
                },
                realHeight: 80,
                validate: function(graph) {
                    const links = graph.getLinks();
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "in", 'target');
                    if (!linkFound) messages.push('Не указана входящая ссылка для элемента ' + this.attrs['.label'].text);
                    return {
                        result: linkFound,
                        messages: messages
                    };
                }

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.HangUpModelView = joint.shapes.devs.ModelView;

        return new joint.shapes.devs.HangUpModel({
            /*position: {
                x: x,
                y: y
            },*/
            size: {
                width: 60,
                height: 60
            },
            ports: {
                groups: {
                    'in': {
                        attrs: {
                            '.port-body': {
                                fill: '#16A085',
                                magnet: 'passive'
                            }
                        },
                        position: {
                            args: {
                                x: 30,
                                y: -31
                            }
                        },
                        label: {
                            position: {
                                args: {
                                    y: -1
                                }
                            }
                        }
                    }
                }
            },
            inPorts: ['in'],
            //outPorts: ['out']
        });

    }
}