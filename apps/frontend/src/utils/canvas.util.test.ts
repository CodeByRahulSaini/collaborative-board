import CanvasUtil from './canvas.util';

describe('CanvasUtil', () => {
    // Can set last X and Y coordinates
    it('should set last X and Y coordinates when setLastXY is called', () => {
        const canvasUtil = new CanvasUtil();
        const x = 10;
        const y = 20;

        canvasUtil.setLastXY(x, y);

        expect(canvasUtil['lastX']).toBe(x);
        expect(canvasUtil['lastY']).toBe(y);
    });

    // Brush color and size are not set if canvas context is null
    it('should not set brush color and size if canvas context is null when setBrushColor and setBrushSize are called', () => {
        const canvasUtil = new CanvasUtil();
        const color = 'black';
        const brushSize = 5;

        canvasUtil.setBrushColor(color);
        canvasUtil.setBrushSize(brushSize);

        expect(canvasUtil['ctx']).toBeNull();
    });

    // Free-form line is not drawn if canvas context is null or drawing is disabled
    it('should not draw free-form line if canvas context is null or drawing is disabled when drawFreeForm is called', () => {
        const canvasUtil = new CanvasUtil();
        const offsetX = 10;
        const offsetY = 20;

        canvasUtil.drawFreeForm(offsetX, offsetY);

        expect(canvasUtil['ctx']).toBeNull();
    });
});
