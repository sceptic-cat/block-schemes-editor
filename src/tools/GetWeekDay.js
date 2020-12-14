import config from "@/config";
import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.GetWeekDayModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.GetWeekDayModel',
                attrs: {
                    '.label': {
                        text: 'Get Week Day',
                    },
                    '.body': {
                        fill: config.colours.blocks.datetime
                    }
                },
                data: {},
                validate: function(graph) {
                    const links = graph.getLinks();
                    let result = true;
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "out");
                    if (!linkFound) {
                        messages.push('Не указана исходящая ссылка для элемента ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.RectangleModel.prototype.defaults)
        });

        joint.shapes.devs.GetWeekDayModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.GetWeekDayModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}