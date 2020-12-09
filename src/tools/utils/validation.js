export default {
    /*
     * Проверяем наличие ссылки (стрелочки) от/на элемент
     */
    findLink(links, id, port, group = 'source') {
        let linkFound = false;
        links.forEach(elem => {
            if (elem.attributes[group].id == id && elem.attributes[group].port == port) {
                linkFound = true;
                return;
            }
        });
        return linkFound;
    }
}