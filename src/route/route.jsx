
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main/Main";
import Home from "../pages/home/Home";

export default function MyRouter() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/home" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}
