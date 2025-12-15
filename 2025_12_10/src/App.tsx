import { BrowserRouter, Routes, Route } from "react-router";

import './App.css'
import Dashboard from "./components/Dashboard.tsx";
import Settings from "./components/Settings.tsx";
import Home from "./components/Home.tsx";
import NavigationLayout from "./layouts/NavigationLayout.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes >
                    //nested routes
                    <Route path={"/"} element={<NavigationLayout />}>
                        <Route index element={<Home/>} />
                        <Route path={"dashboard"} element={<Dashboard/>} />
                        <Route path={"settings"} element={<Settings/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
