import Rectangle from "../templates/Rectangle";
import Diamond from "../templates/Diamond";
import Circle from "../templates/Circle";
import TransferTemplate from "../templates/TransferTemplate";
import Input from "../templates/Input";

export default {
    load(joint){
        Rectangle.load(joint);
        Diamond.load(joint);
        Circle.load(joint);
        TransferTemplate.load(joint);
        Input.load(joint);
    }
}