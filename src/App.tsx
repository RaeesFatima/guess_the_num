import './App.css'
import { Routes, Route } from "react-router-dom";
import Start from './pages/Start';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Start />}></Route>
    </Routes>
  )
}

export default App
