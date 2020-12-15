import config from "@/config";

export default {
    load(joint){
        joint.shapes.devs.TransferTemplateModel = joint.shapes.devs.Model.extend({

            defaults: joint.util.deepSupplement({
                type: 'devs.TransferTemplateModel',
                originShape: 'rectangle', //кастомное свойство, дабы можно было определить родителя при наследовании
                attrs: {
                    '.body': {
                        fill: config.colours.blocks.default
                    },
                    '.label': {
                        text: 'TransferTemplate',
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
                                name: 'bottom',
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
                outPorts: ['ok', 'fail']

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.TransferTemplateModelView = joint.shapes.devs.ModelView;
    }
}