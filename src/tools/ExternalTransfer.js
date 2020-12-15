import validation from "./utils/validation";

export default {
    create(joint, x = 0, y = 0){
        joint.shapes.devs.ExternalTransferModel = joint.shapes.devs.TransferTemplateModel.extend({
            defaults: joint.util.deepSupplement({
                type: 'devs.ExternalTransferModel',
                attrs: {
                    '.label': {
                        text: 'External \n Transfer',
                    }
                },
                data: {
                    number: '',
                    gate: '',
                    music: true,
                    timeout: '',
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

        joint.shapes.devs.ExternalTransferModelView = joint.shapes.devs.TransferTemplateModelView;

        return new joint.shapes.devs.ExternalTransferModel({
            position: {
                x: x,
                y: y
            }
        });

    }
}