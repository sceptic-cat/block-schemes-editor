import validation from "./utils/validation";
import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.QueueModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.QueueModel',
                attrs: {
                    '.label': {
                        text: 'Queue',
                    },
                    '.body': {
                        fill: config.colours.blocks.queues
                    }
                },
                data: {
                    name: '',
                    music: ''
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
                        messages.push('Не указано название очереди в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.QueueModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.QueueModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}