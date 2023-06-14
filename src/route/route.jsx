import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/home/Home";

export default function route() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </>
    );
}
