export default {
    socketUrl: import.meta.env.VITE_SOCKET_URL,
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
