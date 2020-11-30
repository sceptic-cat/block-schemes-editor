export default {
    create(joint, x, y){
        joint.shapes.devs.PlaybackModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.PlaybackModel',
                attrs: {
                    '.label': {
                        text: 'Playback',
                    }
                },
                data: {
                    file: 0,
                    option: 'skip'
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.PlaybackModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.PlaybackModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}