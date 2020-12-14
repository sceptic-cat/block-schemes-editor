import validation from "./utils/validation";
import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.IsTodayHolidayModel = joint.shapes.devs.DiamondModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.IsTodayHolidayModel',
                attrs: {
                    '.label': {
                        text: 'Is Today \n Holiday',
                        'ref-y': 35,
                    },
                    '.body': {
                        fill: config.colours.blocks.datetime
                    }
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let result = true;
                    let messages = [];
                    let linkTrueFound = validation.findLink(links, this.id, "true");
                    let linkFalseFound = validation.findLink(links, this.id, "false");
                    if (!linkTrueFound) {
                        messages.push('Не указана исходящая ссылка для true порта элемента ' + this.attrs['.label'].text);
                        result = false;
                    }
                    if (!linkFalseFound) {
                        messages.push('Не указана исходящая ссылка для false порта элемента ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                }
            }, joint.shapes.devs.DiamondModel.prototype.defaults)
        });

        joint.shapes.devs.IsTodayHolidayModelView = joint.shapes.devs.DiamondModelView;

        let block = new joint.shapes.devs.IsTodayHolidayModel({
            position: {
                x: x,
                y: y
            }
        });

        return block;
    }
}
