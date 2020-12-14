import config from "@/config";

export default {
    create(joint, text, x = 0, y = 0){
        return new joint.shapes.basic.Rect({
            position: {
                x: x,
                y: y
            },
            size: {
                width: 150,
                height: 40
            },
            attrs: {
                text: {
                    text: text,
                    'font-size': 16,
                    'font-weight': 'bold'
                },
                rect: {
                    stroke: 'none',
                    fill: config.colours.blocks.groupLabel
                }
            },
            originShape: 'groupLabel'
        });
    }
}