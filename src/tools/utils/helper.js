export default {
    //Прописываем координаты кнопки закрытия для элементов
    getCloseBtnPosition(t){
        const diamond = [
            'devs.CheckConditionModel'
        ];
        const circle = [
            'devs.StartModel',
            'devs.HangUpModel'
        ];
        if (diamond.indexOf(t) !== -1) {
            return { x: -40, y: 15};
        } else if (circle.indexOf(t) !== -1) {
            return { x: -8, y: -17};
        } else {
            return { x: -3, y: 3 }
        }
    }
}