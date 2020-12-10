import Rectangle from "../templates/Rectangle";
import Diamond from "../templates/Diamond";
import Circle from "../templates/Circle";

export default {
    load(joint){
        Rectangle.load(joint);
        Diamond.load(joint);
        Circle.load(joint);
    }
}