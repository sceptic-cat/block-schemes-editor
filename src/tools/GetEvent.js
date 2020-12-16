import validation from "./utils/validation";
import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.GetEventModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.GetEventModel',
                attrs: {
                    '.label': {
                        text: 'GetEvent',
                    },
                    '.body': {
                        fill: config.colours.blocks.sounds
                    }
                },
                size: {
                    width: 50,
                    height: 150
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
                                name: 'top',
                            },
                            label: {
                                position: {
                                    args: {
                                        y: -6
                                    }
                                }
                            }
                        },
                        'out': {
                            attrs: {
                                '.port-body': {
                                    fill: '#E74C3C'
                                }
                            },
                            position: {
                                args: {
                                    y: 6
                                }
                            },
                            /*label: {
                                position: {
                                    args: {
                                        y: 6
                                    }
                                }
                            }*/
                        }
                    }
                },
                inPorts: ['in'],
                outPorts: ['o1', 'o2',  'o3', 'o4', 'o5', 'o6',],
                data: {
                    file: '',
                    option: 'skip'
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let result = true;
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "out");
                    if (!linkFound) {
                        messages.push('Не указана исходящая ссылка для элемента ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.GetEventModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.GetEventModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}