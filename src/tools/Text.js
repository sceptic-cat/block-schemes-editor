export default {
    create(joint, text, x = 0, y = 0) {
        return new joint.shapes.basic.TextBlock({
            position: { x: x, y: y },
            size: { width: '100%', height: 20 },
            attrs: {
                rect: {
                    fill: 'transparent',
                    stroke: null
                },
            },
            content: text
        });
    }
}