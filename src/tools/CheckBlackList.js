import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.CheckBlackListModel = joint.shapes.devs.DiamondModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.CheckBlackListModel',
                attrs: {
                    '.label': {
                        text: 'Check Black List',
                        'ref-y': 35,
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

        joint.shapes.devs.CheckBlackListModelView = joint.shapes.devs.DiamondModelView;

        let block = new joint.shapes.devs.CheckBlackListModel({
            position: {
                x: x,
                y: y
            }
        });

        return block;
    }
}