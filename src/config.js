export default {
    importServiceUrl: 'http://localhost/dialplan/web/index.php/editor-api/get-json',
    saveServiceUrl: 'http://localhost/dialplan/web/index.php/editor-api/save',
    parseServiceUrl: 'http://localhost/dialplan/web/index.php/editor-api/parse',
    defaults: {
        context: 'call-out',
        extension: '397945',
    },
    colours: {
        blocks: {
            datetime: '#d78f21',
            default: '#43914b',
            sounds: '#748091',
            transfers: '#cc2d42',
            queues: 'rgb(164,204,86)',
            callParams: '#4f77cc',
            groupLabel: 'rgba(31,0,146,0.22)',
            input: 'rgb(142,31,0)',
        }
    }

}