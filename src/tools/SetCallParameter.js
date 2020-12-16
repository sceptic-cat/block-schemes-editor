import validation from "./utils/validation";
import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.SetCallParameterModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.SetCallParameterModel',
                attrs: {
                    '.label': {
                        text: 'Set Call \n Parameter',
                    },
                    '.body': {
                        fill: config.colours.blocks.callParams
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
                        messages.push('Не указано имя параметра в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.SetCallParameterModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.SetCallParameterModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}