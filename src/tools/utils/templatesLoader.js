import Rectangle from "../templates/Rectangle";
import Diamond from "../templates/Diamond";

export default {
    load(joint){
        Rectangle.load(joint);
        Diamond.load(joint);
    }
}