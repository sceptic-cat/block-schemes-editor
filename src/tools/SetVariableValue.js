import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.SetVariableValueModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.SetVariableValueModel',
                attrs: {
                    '.label': {
                        text: 'Set Variable \n Value',
                    }
                },
                data: {
                    name: '',
                    value: ''
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
                    if (this.data.name === '') {
                        messages.push('Не указано имя переменной в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.SetVariableValueModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.SetVariableValueModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}