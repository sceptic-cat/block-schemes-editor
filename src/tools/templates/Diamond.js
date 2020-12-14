import config from "@/config";

export default {
    load(joint){
        joint.shapes.devs.DiamondModel = joint.shapes.devs.Model.extend({

            markup: '<g class="rotatable"><g class="scalable"><path class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
           // portMarkup: '<g class="port"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({
                type: 'devs.DiamondModel',
                originShape: 'diamond', //кастомное свойство, дабы можно было определить родителя при наследовании
                attrs: {
                    '.body': {
                        d: 'M 30 0 L 60 30 30 60 0 30 z',
                        fill: config.colours.blocks.default
                    },
                    '.label': {
                        text: 'Diamond',
                        'font-size': 15,
                        'ref-y': 25,
                        'y-alignment': 'middle'
                    }
                },
                size: {
                    width: 140,
                    height: 70
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
                                    x: 70,
                                    y: 0
                                }
                            },
                            label: {
                                position: {
                                    args: {
                                        y: 0
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
/*                                args: {
                                    x: 0,
                                    y: 34
                                }*/
                            },
                            label: {
                                position: {
                                    args: {
                                        x: -15,
                                        y: 14
                                    }
                                }
                            }
                        },
                        /*items: [
                            {
                                id: 'truePort',
                                group: 'out',
                                attrs: {
                                    '.port-body': {
                                        fill: '#2ECC71'
                                    },
                                    text: {
                                        text: 'true'
                                    }
                                },
                                position: {
                                    name: 'bottom',
                                    args: {
                                        x: 0,
                                        y: 34
                                    }
                                },
                                label: {
                                    position: {
                                        args: {
                                            x: -20,
                                            y: -20
                                        }
                                    }
                                }
                            },{
                                id: 'falsePort',
                                group: 'out',
                                args: { y: 34, x: 130 },
                                attrs: {
                                    '.port-body': {
                                        fill: '#E74C3C'
                                    },
                                    text: {
                                        text: 'false'
                                    }
                                },
                                label: {
                                    position: {
                                        args: {
                                            x: -8,
                                            y: -20
                                        }
                                    }
                                }
                            }
                        ]*/


                    }
                },
                inPorts: ['in'],
                outPorts: ['true', 'false'],
/*                outPorts: [


                ]*/

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.DiamondModelView = joint.shapes.devs.ModelView;

/*        let m1 = new joint.shapes.devs.DiamondModel({
            position: {
                x: 30,
                y: 400
            }
        });
        m1.addPort({
            group: 'out',
            args: { y: 34, x: 130 },
            attrs: {
                '.port-body': {
                    fill: '#cc2d42'
                }
            } });
        return m1;*/
    }
}