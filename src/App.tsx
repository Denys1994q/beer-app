import "./app.sass";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home";

function App() {
    return (
        <>
            <div className='main-container'>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                    {/* <Route path='/cart' element={<CartScreen />} /> */}
                </Routes>
            </div>
        </>
    );
}

export default App;
