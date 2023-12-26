import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Canvas from './Canvas';

const CanvasDrawing = () => {
    return (
        <div className="App">
            <Header />
            <h1>Collaborative Board</h1>
            <div>
                <Canvas />
            </div>
            <Footer />
        </div>
    );
};

export default CanvasDrawing;
