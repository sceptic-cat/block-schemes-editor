export default {
    create(joint, x, y){
        joint.shapes.devs.Start2Model = joint.shapes.devs.StartModel.extend({

           // markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            //portMarkup: '<g class="port"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({

                type: 'devs.Start2Model',
                attrs: {
                    '.body': {
                        r: 45,
                        cx: 45,
                        // stroke: 'blue',
         //               fill: '#d24335'
                    },
                    '.label': {
              //          text: 'Hang up',
                        'font-size': 15,
                        'ref-y': 2,
                        'y-alignment': 'middle'
                    },
                    '.port-label': {
                        position: {
                            y: -1
                        }
                        // 'ref-x': 1,

                    }/*,
                    '.port-body': {
                        width: 10,
                        height: 10,
                        x: -5,
                        //stroke: 'gray',
                        fill: '#E74C3C',
                        magnet: 'active'
                    }*/
                }

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.Start2ModelView = joint.shapes.devs.ModelView;

        return new joint.shapes.devs.Start2Model({
            position: {
                x: x,
                y: y
            },
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