import validation from "./utils/validation";
import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.SayNumberModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.SayNumberModel',
                attrs: {
                    '.label': {
                        text: 'Say Number',
                    },
                    '.body': {
                        fill: config.colours.blocks.sounds
                    },
                },
                data: {
                    number: '',
                    gender: 'f'
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

        joint.shapes.devs.SayNumberModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.SayNumberModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}