import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.BackgroundModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.BackgroundModel',
                attrs: {
                    '.label': {
                        text: 'Background',
                    },
                    '.body': {
                        fill: '#748091'
                    }
                },
                data: {
                    file: '',
                    option: 'skip'
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
                    if (this.data.file === '') {
                        messages.push('Не указан файл для воспроизведения в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.BackgroundModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.BackgroundModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}