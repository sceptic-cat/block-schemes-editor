import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.PlaySilenceModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.PlaySilenceModel',
                attrs: {
                    '.label': {
                        text: 'Play Silence',
                    },
                    '.body': {
                        fill: '#748091'
                    },
                },
                data: {
                    duration: 0
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let result = true;
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "out");
                    if (!linkFound) {
                        messages.push('Не указана исходящая ссылка для элемента ' + this.attrs['.label'].text);
                        result = false;
                    }
                    if (this.data.duration === '') {
                        messages.push('Не указана длительность ожидания в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.PlaySilenceModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.PlaySilenceModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}