import { BrowserRouter, Routes, Route } from "react-router";

import './App.scss'
import Categories from "./components/Categories/Categories.tsx";
import Home from "./components/Home/Home.tsx";
import NavigationLayout from "./layouts/NavigationLayout.tsx";
import Post from "./components/Post/Post.tsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes >
                    //nested routes
                    <Route path={"/"} element={<NavigationLayout />}>
                        <Route index element={<Home/>} />
                        <Route path={"categories"} element={<Categories/>} />
                        <Route path={"post"} element={<Post/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
