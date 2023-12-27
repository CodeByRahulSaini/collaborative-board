import { useEffect, useMemo, useRef, useState } from 'react';
// import io, { Socket } from 'socket.io-client';
import CanvasUtil from '../utils/canvas.util';
import consts, { DrawingMode } from '../consts';
import * as socketIo from 'socket.io-client';

interface CanvasStyle {
    color: string;
    brushSize: number;
}

/**
 * Custom hook for managing canvas drawing functionality.
 * @returns An object containing various canvas-related functions and properties.
 */
const useCanvas = () => {
    const canvasStyle = useRef<CanvasStyle>(consts.defaultCanvasStyle);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const Canvas = useMemo(() => new CanvasUtil(), []);
    const socket = useRef<socketIo.Socket | null>(null);
    const [drawingMode, setDrawingMode] = useState(DrawingMode.FreeForm);
    const socketRoom = new URLSearchParams(window.location.search).get('r');

    useEffect(() => {
        if (canvasRef?.current) {
            Canvas.initializeContext(
                canvasRef?.current,
                canvasStyle.current.color,
                canvasStyle.current.brushSize,
            );
        }
    }, [canvasRef, Canvas]);

    useEffect(() => {
        socket.current = socketIo.io(consts.socketUrl);

        const _socket = socket.current;

        _socket.emit('joinRoom', socketRoom);

        _socket?.on('canvasImage', (data) => {
            Canvas.drawImage(data);
            Canvas.updateHistory(data);
        });
        _socket?.on('undo', () => {
            Canvas.undo();
        });
        _socket?.on('redo', () => {
            Canvas.redo();
        });

        const canvas = canvasRef.current;
        canvas?.addEventListener('mousedown', startDrawing);
        canvas?.addEventListener('mouseup', endDrawing);
        canvas?.addEventListener('mousemove', handleDrawing);

        return () => {
            _socket?.disconnect();
            canvas?.removeEventListener('mousedown', startDrawing);
            canvas?.removeEventListener('mouseup', endDrawing);
            canvas?.removeEventListener('mousemove', handleDrawing);
        };
    });

    const setBrushColor = (color: string) => {
        Canvas.setBrushColor(color);
    };

    const setBrushSize = (brushSize: number) => {
        Canvas.setBrushSize(brushSize);
    };

    const handleDrawing = (e: { offsetX: number; offsetY: number }) => {
        switch (drawingMode) {
            case DrawingMode.FreeForm:
                Canvas.drawFreeForm(e.offsetX, e.offsetY);
                break;
            case DrawingMode.Arrow:
                // Canvas.drawArrow(e);
                break;
            case DrawingMode.Circle:
                Canvas.drawCircle(e.offsetX, e.offsetY);
                break;
            case DrawingMode.Square:
                // Canvas.drawSquare(e);
                break;
            default:
                break;
        }
    };

    const startDrawing = (e: { offsetX: number; offsetY: number }) => {
        Canvas.startDrawing(e);
    };

    const endDrawing = () => {
        const dataUrl = Canvas.endDrawing();
        socket.current?.emit('canvasImage', dataUrl, socketRoom);
    };

    const clearCanvas = () => {
        Canvas.clearCanvas();
    };

    const undo = () => {
        socket.current?.emit('undo', socketRoom);
        Canvas.undo();
    };

    const redo = () => {
        socket.current?.emit('redo', socketRoom);
        Canvas.redo();
    };

    return {
        canvasRef,
        undo,
        redo,
        clearCanvas,
        brushSize: canvasStyle.current.brushSize,
        setBrushSize,
        brushColor: canvasStyle.current.color,
        setBrushColor,
        drawingMode,
        setDrawingMode,
        socket,
    };
};

export default useCanvas;
