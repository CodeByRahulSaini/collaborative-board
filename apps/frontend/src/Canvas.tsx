import Toolbar from './components/Toolbar';
import useCanvas from './hooks/useCanvas';
import useWindowSize from './hooks/useWindowSize';

const Canvas = () => {
    const {
        canvasRef,
        undo,
        redo,
        brushSize,
        setDrawingMode,
        setBrushColor,
        setBrushSize,
        clearCanvas,
    } = useCanvas();
    const { windowSize } = useWindowSize();

    return (
        <>
            <canvas
                ref={canvasRef}
                width={windowSize[0] >1000 ? 1200 : windowSize[0]-100}
                height={600}
            />
            <Toolbar
                setDrawingMode={setDrawingMode}
                clearCanvas={clearCanvas}
                setBrushColor={setBrushColor}
                undo={undo}
                redo={redo}
                brushSize={brushSize}
                setBrushSize={setBrushSize}
            />
        </>
    );
};

export default Canvas;
