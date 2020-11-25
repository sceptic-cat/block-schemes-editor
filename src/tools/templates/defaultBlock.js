export default {
    create(joint, x, y){
        return new joint.shapes.devs.Model({
            position: { x: x, y: y },
            size: { width: 90, height: 90 },
            inPorts: ['in1'],
            outPorts: ['out'],
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
                                x: 45,
                                y: 0
                            }
                        }
                    },
                    'out': {
                        attrs: {
                            '.port-body': {
                                fill: '#E74C3C'
                            }
                        }
                    }
                }
            },
            attrs: {
                '.label': { text: 'Model', 'ref-x': .5, 'ref-y': .2 },
                rect: { fill: '#2ECC71' }
            }
        });
    }
}