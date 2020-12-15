import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.TransferModel = joint.shapes.devs.TransferTemplateModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.TransferModel',
                attrs: {
                    '.label': {
                        text: 'Transfer',
                    }
                },
                data: {
                    number: '',
                    timeout: '',
                    music: true
                },
                validate: function(graph) {
                    const links = graph.getLinks();
                    let result = true;
                    let messages = [];
                    let linkFound = validation.findLink(links, this.id, "ok");
                    if (!linkFound) {
                        messages.push('Не указана исходящая ссылка (ok) для элемента ' + this.attrs['.label'].text);
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
            }, joint.shapes.devs.TransferTemplateModel.prototype.defaults)
        });

        joint.shapes.devs.TransferModelView = joint.shapes.devs.TransferTemplateModelView;

        return new joint.shapes.devs.TransferModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}