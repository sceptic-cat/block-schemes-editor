import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.IsTimeBetweenModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.IsTimeBetweenModel',
                attrs: {
                    '.label': {
                        text: 'Is Time \n Between',
                    }
                },
                data: {
                    begin: '',
                    end: ''
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
                    if (this.data.begin === '') {
                        messages.push('Не указаны дата и время начала в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    if (this.data.end === '') {
                        messages.push('Не указаны дата и время конца в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.IsTimeBetweenModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.IsTimeBetweenModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}