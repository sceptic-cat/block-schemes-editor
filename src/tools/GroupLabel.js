export default {
    create(joint, text, x = 0, y = 0){
        /*joint.shapes.devs.GroupLabelModel = joint.shapes.basic.Rect.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.GroupLabelModel',
                attrs: {
                    '.label': {
                        text: 'Group Label',
                    }
                },
                size: {
                    width: 130,
                    height: 30
                },
                ports: {}
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.GroupLabelModelView = joint.shapes.basic.RectView;

        return new joint.shapes.devs.GroupLabelModel({
            position: {
                x: x,
                y: y
            }
        });*/
        return new joint.shapes.basic.Rect({
            position: {
                x: x,
                y: y
            },
            size: {
                width: 150,
                height: 40
            },
            attrs: {
                text: {
                    text: text,
                    'font-size': 16,
                    'font-weight': 'bold'
                },
                rect: {
                    stroke: 'none',
                    fill: 'rgba(31,0,146,0.22)'
                }
            }
        });
    }
}