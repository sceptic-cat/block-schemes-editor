import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.CountActiveCallsModel = joint.shapes.devs.RectangleModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.CountActiveCallsModel',
                attrs: {
                    '.label': {
                        text: 'Count Active \n Calls',
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

        joint.shapes.devs.CountActiveCallsModelView = joint.shapes.devs.RectangleModelView;

        return new joint.shapes.devs.CountActiveCallsModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}