import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.HangUpModel = joint.shapes.devs.CircleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.HangUpModel',
                attrs: {
                    '.body': {
                        fill: '#d24335'
                    },
                    '.label': {
                        text: 'Hang Up',
                    },
                    '.port-label': {
                        position: {
                            y: -1
                        }
                    }
                },
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

            }, joint.shapes.devs.CircleModel.prototype.defaults)
        });

        joint.shapes.devs.HangUpModelView = joint.shapes.devs.CircleModelView;

        return new joint.shapes.devs.HangUpModel({
            position: {
                x: x,
                y: y
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
            inPorts: ['in']
        });

    }
}