export default {
    socketUrl: 'http://collaborative-board-backend.vercel.app',
    defaultCanvasStyle: {
        color: 'black',
        brushSize: 10,
    },
    githubUrl: 'https://github.com/CodeByRahulSaini/collaborative-board.git',
} as const;

export enum DrawingMode {
    FreeForm = 'free-form',
    Arrow = 'shape-arrow',
    Circle = 'shape-circle',
    Square = 'shape-square',
}
