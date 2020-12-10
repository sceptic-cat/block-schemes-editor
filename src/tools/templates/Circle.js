export default {
    load(joint){
        joint.shapes.devs.CircleModel = joint.shapes.devs.Model.extend({
            markup: '<g class="rotatable"><g class="scalable"><circle class="body"/></g><text class="label"/><g class="inPorts"/><g class="outPorts"/></g>',

            defaults: joint.util.deepSupplement({
                type: 'devs.CircleModel',
                originShape: 'circle', //кастомное свойство, дабы можно было определить родителя при наследовании
                attrs: {
                    '.body': {
                        r: 45,
                        cx: 45,
                        fill: '#FFFFFF'
                    },
                    '.label': {
                        text: 'Circle',
                        'font-size': 15,
                        'ref-y': 2,
                        'y-alignment': 'middle'
                    }
                },
                size: {
                    width: 60,
                    height: 60
                }
            }, joint.shapes.devs.Model.prototype.defaults)
        });

        joint.shapes.devs.CircleModelView = joint.shapes.devs.ModelView;
    }
}