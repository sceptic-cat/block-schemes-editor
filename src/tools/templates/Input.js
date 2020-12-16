import config from "@/config";

export default {
    load(joint){
        joint.shapes.devs.InputModel = joint.shapes.devs.Model.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.InputModel',
                originShape: 'input', //кастомное свойство, дабы можно было определить родителя при наследовании
                attrs: {
                    '.label': {
                        text: 'Input',
                        'font-size': 15,
                        'ref-y': 120,
                        'y-alignment': 'middle'
                    },
                    '.body': {
                        fill: config.colours.blocks.input
                    }
                },
                size: {
                    width: 80,
                    height: 250
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
                            /*          position: {
                                          position: {
                                              name: 'bottom',
                                          },
                                      },*/
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
                inPorts: ['in'],
                outPorts: ['1', '2',  '3', '4', '5', '6', '7', '8', '9', '0', 'L', '*', '#', '!']
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.InputModelView = joint.shapes.devs.ModelView;
    }
}