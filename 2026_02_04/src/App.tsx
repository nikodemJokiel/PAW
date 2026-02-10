import { BrowserRouter, Routes, Route } from "react-router";

import './App.scss'
import Categories from "./scenes/Categories/Categories.tsx";
import Home from "./scenes/Home";
import Posts from "./scenes/Posts/Posts.tsx";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Post from "./scenes/Post/Post.tsx";

function App() {
    return (
        <>

            <BrowserRouter>
                <NavBar />
                <Routes >
                    <Route index element={<Home/>} />
                    <Route path={"/categories"} element={<Categories/>} />
                    <Route path={"/post"} element={<Posts/>} />
                    <Route path={"/post/:id"} element={<Post/>} />
                </Routes>
                <Footer />
            </BrowserRouter>

        </>
    )
}

export default App
