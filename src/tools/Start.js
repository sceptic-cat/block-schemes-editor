import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.StartModel = joint.shapes.devs.CircleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.StartModel',
                attrs: {
                    '.body': {
                        fill: '#2ECC71'
                    },
                    '.label': {
                        text: 'START',
                    }
                },
                data: {
                    delay: 0
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "out");
                    if (!linkFound) messages.push('Не указана исходящая ссылка для элемента ' + this.attrs['.label'].text);
                    return {
                        result: linkFound,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.CircleModel.prototype.defaults)
        });

        joint.shapes.devs.StartModelView = joint.shapes.devs.CircleModelView;

        return new joint.shapes.devs.StartModel({
            position: {
                x: x,
                y: y
            },
            ports: {
                groups: {
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C'
                            }
                        },
                        position: {
                            args: {
                                x: 30,
                                y: 30
                            }
                        },
                        label: {
                            position: {
                                args: {
                                    y: 0
                                }
                            }
                        }
                    }
                }
            },
            outPorts: ['out']
        });

    }
}