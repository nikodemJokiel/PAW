import { BrowserRouter, Routes, Route } from "react-router";

import './App.css'
import Dashboard from "./components/Dashboard.tsx";
import Settings from "./components/Settings.tsx";
import Home from "./components/Home.tsx";

function App() {
  return (
    <>
        <BrowserRouter>
            <Routes >
                <Route index element={<Home />} />
                <Route path={"dashboard"} element={<Dashboard/>} />
                <Route path={"settings"} element={<Settings/>} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
