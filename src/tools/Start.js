export default {
    create(joint, x, y){
        joint.shapes.devs.StartModel = joint.shapes.devs.Model.extend({

            markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',
            //portMarkup: '<g class="port"><rect class="port-body"/><text class="port-label"/></g>',

            defaults: joint.util.deepSupplement({

                type: 'devs.StartModel',
                attrs: {
                    '.body': {
                        r: 45,
                        cx: 45,
                        fill: '#2ECC71'
                    },
                    '.label': {
                        text: 'START',
                        'font-size': 15,
                        'ref-y': 2,
                        'y-alignment': 'middle'
                    }
                },
                data: {
                    delay: 0
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let linkFound = false;
                    links.forEach(elem => {
                        if (elem.attributes.source.id == this.id && elem.attributes.source.port == "out") {
                            linkFound = true;
                        }
                    });
                    if (!linkFound) alert('Не указана исходящая ссылка для элемента Start');
                    return linkFound;
                    //console.log('pppppppp', this);
                    //console.log('lnk', links);
                }

            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.StartModelView = joint.shapes.devs.ModelView;

        return new joint.shapes.devs.StartModel({
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
                        }
                    }
                }
            },
          //  inPorts: ['in'],
            outPorts: ['out']
        });

    },
    validate(el, graph){
            console.log('[validate]', el, graph);
    }
}