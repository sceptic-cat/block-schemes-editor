import config from "@/config";

export default {
    load(joint){
        joint.shapes.devs.RectangleModel = joint.shapes.devs.Model.extend({

            //markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            //portMarkup: '<g class="port"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({
                type: 'devs.RectangleModel',
                originShape: 'rectangle', //кастомное свойство, дабы можно было определить родителя при наследовании
                attrs: {
                    '.body': {
                        fill: config.colours.blocks.default
                    },
                    '.label': {
                        text: 'Rectangle',
                        'font-size': 15,
                        'ref-y': 25,
                        'y-alignment': 'middle'
                    }
                },
                size: {
                    width: 100,
                    height: 50
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
                                    x: 50,
                                    y: 0
                                }
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
                                    x: 50,
                                    y: 50
                                }
                            },
                            label: {
                                position: {
                                    args: {
                                        y: 6
                                    }
                                }
                            }
                        }
                    }
                },
                inPorts: ['in'],
                outPorts: ['out']

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.RectangleModelView = joint.shapes.devs.ModelView;
    }
}