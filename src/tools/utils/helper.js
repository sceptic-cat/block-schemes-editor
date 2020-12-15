export default {
    /*
     *  Прописываем координаты кнопки закрытия для нестандартных элементов
     */
    getCloseBtnPosition(t){
        if (t == 'diamond') {
            return { x: -40, y: 15};
        } else if (t == 'circle') {
            return { x: -8, y: -17};
        } else {
            return { x: -3, y: 3 }
        }
    }
}