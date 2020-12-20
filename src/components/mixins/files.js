export default {
    methods: {
        createFile(name, data, mimeType = 'text/plain'){
            let ext = '';
            switch (mimeType) {
                case "text/json": ext = 'json'; break;
                case "text/plain": ext = 'txt'; break;
                default:
                    console.error(mimeType + ' - не предусмотрен обработчик для данного типа');
                    return false;
            }
            name = name + '.' + ext;
            const file = new Blob([data], {type: mimeType});
            if (window.navigator.msSaveOrOpenBlob) // IE10+
                window.navigator.msSaveOrOpenBlob(file, name);
            else {
                let a = document.createElement("a"),
                    url = URL.createObjectURL(file);
                a.href = url;
                a.download = name;
                document.body.appendChild(a);
                a.click();
                setTimeout(function() {
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                }, 0);
            }
        }
    }
}