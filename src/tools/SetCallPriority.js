import validation from "./utils/validation";
//import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.SetCallPriorityModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.SetCallPriorityModel',
                attrs: {
                    '.label': {
                        text: 'Set Call \n Priority',
                    }
                },
                data: {
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
                    if (this.data.value === '') {
                        messages.push('Не указан приоритет звонка в элементе ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.SetCallPriorityModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.SetCallPriorityModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}