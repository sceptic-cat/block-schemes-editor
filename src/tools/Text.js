export default {
    create(joint, text, x = 0, y = 0) {
        return new joint.shapes.basic.Text({
            position: { x: x, y: y },
            size: { width: 80, height: 20 },
            attrs: {
                rect: {
                    fill: 'transparent',
                    stroke: null
                },
                text: {
                    text: text,
                    fill: '#2f73d7',
                    refX: '50%',
                    refY: '50%',
                    yAlignment: 'middle',
                    xAlignment: 'middle'
                }
            },
            content: text
        });
    }
}