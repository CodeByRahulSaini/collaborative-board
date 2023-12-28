import { IoMdClose } from 'react-icons/io';
import { MdOutlineDraw } from 'react-icons/md';
import { Dispatch, SetStateAction } from 'react';
import { IoArrowUndoOutline, IoArrowRedoOutline } from 'react-icons/io5';
import consts, { DrawingMode } from '../consts';

interface ToolbarProps {
    clearCanvas: () => void;
    setDrawingMode: Dispatch<SetStateAction<DrawingMode>>;
    setBrushColor: (color: string) => void;
    brushSize: number;
    setBrushSize: (size: number) => void;
    undo: () => void;
    redo: () => void;
}

const Toolbar = ({
    clearCanvas,
    setDrawingMode,
    setBrushColor,
    setBrushSize,
    undo,
    redo,
}: ToolbarProps) => {
    const tools = [
        { Icon: IoMdClose, name: 'Clear', onClick: clearCanvas },
        {
            Icon: MdOutlineDraw,
            name: 'Free form',
            onClick: () => setDrawingMode(DrawingMode.FreeForm),
        },
        // { Icon: RxCursorArrow, name: 'Arrow', onClick: ()=> setDrawingMode(DrawingMode.FreeForm) },
        // { Icon: FaRegCircle, name: 'Circle',  onClick: ()=> setDrawingMode(DrawingMode.Circle) },
        // { Icon: FaRegSquare, name: 'Square', onClick: ()=> setDrawingMode(DrawingMode.FreeForm) },
        { Icon: IoArrowUndoOutline, name: 'Undo', onClick: undo },
        { Icon: IoArrowRedoOutline, name: 'Redo', onClick: redo },
    ];

    return (
        <div className="toolbar-container">
            <div className="tool">
                <input
                    type="color"
                    defaultValue={consts.defaultCanvasStyle.color}
                    onChange={(e) => setBrushColor(e.target.value)}
                />
            </div>
            <div className="tool">

            <input
                defaultValue={consts.defaultCanvasStyle.brushSize}
                type="range"
                min="1"
                max="100"
                onChange={(e) => setBrushSize(Number(e.target.value))}
            />
            </div>

            {tools.map((tool) => (
                <button key={tool.name} className="tool" onClick={tool.onClick}>
                    <tool.Icon size={20} />
                </button>
            ))}
        </div>
    );
};

export default Toolbar;
