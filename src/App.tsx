import "./app.sass";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/Home";
import OneBeerPage from "./screens/OneBeerPage";
import NotFound from "./screens/NotFound";

function App() {
    return (
        <>
            <div className='main-container'>
                <Routes>
                    <Route path='/' element={<HomeScreen />} />
                    <Route path=':page/:id' element={<OneBeerPage />} />
                    <Route path='*' element={<NotFound />}/>
                </Routes>
            </div>
        </>
    );
}

export default App;
