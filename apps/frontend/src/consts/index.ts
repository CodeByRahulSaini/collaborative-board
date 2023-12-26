export default {
    socketUrl: 'http://localhost:5001',
    defaultCanvasStyle: {
        color: 'black',
        brushSize: 10,
    },
    githubUrl: '',
} as const;

export enum DrawingMode {
    FreeForm = 'free-form',
    Arrow = 'shape-arrow',
    Circle = 'shape-circle',
    Square = 'shape-square',
}
