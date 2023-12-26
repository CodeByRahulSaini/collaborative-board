/**
 * Utility class for managing canvas operations.
 */
class CanvasUtil {
    private ctx: CanvasRenderingContext2D | null; // The canvas rendering context
    private canvasRef: HTMLCanvasElement | null; // Reference to the HTML canvas element
    private lastX: number; // The last X coordinate
    private lastY: number; // The last Y coordinate
    private canvasHistory: string[]; // Array to store the canvas history
    private drawingEnabled: boolean; // Flag to indicate if drawing is enabled
    private currentHistoryStep: number; // The current step in the canvas history

    constructor() {
        this.ctx = null;
        this.lastX = 0;
        this.lastY = 0;
        this.drawingEnabled = false;
        this.canvasRef = null;
        this.canvasHistory = [];
        this.currentHistoryStep = -1;
    }

    // Initializes the canvas context
    initializeContext(
        canvasRef: HTMLCanvasElement,
        color: string,
        brushSize: number,
    ) {
        this.canvasRef = canvasRef;
        this.ctx = this.canvasRef?.getContext('2d');
        if (this.ctx) {
            this.ctx.strokeStyle = color;
            this.ctx.lineWidth = brushSize;
        }
    }

    // Sets the last X and Y coordinates
    setLastXY(x: number, y: number) {
        this.lastX = x;
        this.lastY = y;
    }

    // Sets the brush color
    setBrushColor(color: string) {
        if (this.ctx) {
            this.ctx.strokeStyle = color;
        }
    }

    // Sets the brush size
    setBrushSize(brushSize: number) {
        if (this.ctx) {
            this.ctx.lineWidth = brushSize;
        }
    }

    // Starts the drawing process
    startDrawing(e: { offsetX: number; offsetY: number }) {
        this.drawingEnabled = true;
        if (this.ctx) {
            this.ctx.beginPath();
            this.ctx.moveTo(e.offsetX, e.offsetY);
            this.setLastXY(e.offsetX, e.offsetY);
        }
    }

    // Ends the drawing process and returns the canvas data URL
    endDrawing() {
        this.drawingEnabled = false;
        const dataURL = this.canvasRef?.toDataURL();
        dataURL && this.updateHistory(dataURL);
        return dataURL;
    }

    // Updates the canvas history with the given data URL
    updateHistory(dataURL: string) {
        this.canvasHistory = this.canvasHistory.slice(
            0,
            this.currentHistoryStep + 1,
        );
        this.canvasHistory = [...this.canvasHistory, dataURL];
        this.currentHistoryStep = this.canvasHistory.length - 1;
    }

    // Returns the canvas history
    getHistory() {
        return this.canvasHistory;
    }

    // Draws a free-form line
    drawFreeForm(offsetX: number, offsetY: number) {
        if (this.ctx && this.drawingEnabled) {
            this.ctx.lineCap = 'round';
            this.ctx.lineJoin = 'round';
            this.ctx.lineTo(offsetX, offsetY);
            this.ctx.stroke();
        }
    }

    // Draws an arrow
    drawArrow(x: number, y: number) {
        if (this.ctx) {
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
        }
    }

    // Draws a circle
    drawCircle(x: number, y: number) {
        if (this.ctx && this.drawingEnabled) {
            this.ctx.beginPath();
            const radius = Math.sqrt(
                Math.pow(x - this.lastX, 2) + Math.pow(y - this.lastY, 2),
            );
            this.ctx.arc(this.lastX, this.lastY, radius, 0, 2 * Math.PI);
            this.ctx.stroke();
        }
    }

    // Draws a square
    drawSquare(x: number, y: number, width: number, height: number) {
        if (this.ctx) {
            this.ctx.strokeRect(x, y, width, height);
        }
    }

    // Clears the canvas
    clearCanvas() {
        if (this.ctx) {
            this.ctx.clearRect(
                0,
                0,
                this.canvasRef?.width ?? 0,
                this.canvasRef?.height ?? 0,
            );
            this.canvasHistory = [''];
            this.currentHistoryStep = -1;
        }
    }

    // Draws an image on the canvas
    drawImage(dataUrl: string) {
        if (this.ctx) {
            const image = new Image();
            image.src = dataUrl;
            image.onload = () => {
                this.canvasRef?.width &&
                    this.ctx?.clearRect(
                        0,
                        0,
                        this.canvasRef?.width,
                        this.canvasRef?.height,
                    );
                this.ctx?.drawImage(image, 0, 0);
            };
        }
    }

    // Undoes the last drawing action
    undo() {
        if (this.canvasHistory.length > 0 && this.currentHistoryStep > 0) {
            this.currentHistoryStep -= 1;
            this.drawImage(this.canvasHistory[this.currentHistoryStep]);
        } else if (this.currentHistoryStep === 0) {
            this.currentHistoryStep -= 1;
            this.clearCanvas();
        }
    }

    // Redoes the last undone drawing action
    redo() {
        if (
            this.canvasHistory.length > 0 &&
            this.currentHistoryStep < this.canvasHistory.length - 1
        ) {
            this.currentHistoryStep += 1;
            this.drawImage(this.canvasHistory[this.currentHistoryStep]);
        }
    }
}

export default CanvasUtil;
