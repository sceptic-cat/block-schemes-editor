import validation from "./utils/validation";
//import config from "@/config";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.ReadModel = joint.shapes.devs.InputModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.ReadModel',
                data: {
                    variable: 'USER_INPUT',
                    filename: '',
                    maxdigits: 1,
                    attempts: '',
                    timeout: 5,
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let result = true;
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "ok");
                    if (!linkFound) {
                        messages.push('Не указана исходящая ссылка для результата "ok" для элемента ' + this.attrs['.label'].text);
                        result = false;
                    }
                    return {
                        result: result,
                        messages: messages
                    };
                },
                inPorts: ['in'],
                outPorts: ['ok', 'time', 'hang', 'err']
            }, joint.shapes.devs.InputModel.prototype.defaults)
        });

        joint.shapes.devs.ReadModelView = joint.shapes.devs.InputModelView;

        return new joint.shapes.devs.ReadModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}