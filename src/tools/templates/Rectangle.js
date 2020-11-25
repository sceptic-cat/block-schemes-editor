export default {
    load(joint){
        joint.shapes.devs.RectangleModel = joint.shapes.devs.Model.extend({

            //markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            //portMarkup: '<g class="port"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({
                type: 'devs.RectangleModel',
                attrs: {
                    '.body': {
                        fill: '#43914b'
                    },
                    '.label': {
                        text: 'Rectangle',
                        'font-size': 15,
                        'ref-y': 25,
                        'y-alignment': 'middle'
                    }
                },
                size: {
                    width: 80,
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
                                    x: 41,
                                    y: 0
                                }
                            },
                            label: {
                                position: {
                                    args: {
                                        y: -10
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
                                    x: 41,
                                    y: 50
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