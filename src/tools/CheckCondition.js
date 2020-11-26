export default {
    create(joint, x, y){
        joint.shapes.devs.CheckConditionModel = joint.shapes.devs.DiamondModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.CheckConditionModel',
                attrs: {
                    '.label': {
                        text: 'Check Condition',
                        'ref-y': 35,
                    }
                }
            }, joint.shapes.devs.DiamondModel.prototype.defaults)
        });

        joint.shapes.devs.PlaybackModelView = joint.shapes.devs.DiamondModelView;

        let block = new joint.shapes.devs.CheckConditionModel({
            position: {
                x: x,
                y: y
            }
        });

/*        block.addPort({
          //  id: 'truePort',
            group: 'out',
            attrs: {
                text: {
                    text: 'true'
                }
            },
        });

        block.addPort({
           // id: 'falsePort',
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
        });*/

        return block;
    }
}