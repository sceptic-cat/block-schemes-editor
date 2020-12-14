import validation from "./utils/validation";
import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.SayDigitsModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.SayDigitsModel',
                attrs: {
                    '.label': {
                        text: 'Say Digits',
                    },
                    '.body': {
                        fill: config.colours.blocks.sounds
                    },
                },
                data: {
                    number: ''
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
                    if (this.data.number === '') {
                        messages.push('Не указан номер для воспроизведения в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.SayDigitsModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.SayDigitsModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}