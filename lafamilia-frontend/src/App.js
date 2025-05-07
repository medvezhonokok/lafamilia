import './App.css';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import IndexPage from "./components/IndexPage/IndexPage";
import ShopPage from "./components/ShopPage/ShopPage";
import AdminPage from "./components/AdminPage/AdminPage";
import React, { useEffect, useState } from "react";
import * as client from "./client/client";
import Menu from "./components/Menu/Menu";

function App() {
    const [lots, setLots] = useState([]);

    useEffect(() => {
        client.getLots()
            .then((lotsJson) => setLots(lotsJson))
            .catch((err) => console.log(err));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<AdminPage />} />

                <Route path="/" element={
                    <>
                        <Menu index={true} />
                        <IndexPage />
                    </>
                } />

                <Route path="/shop" element={
                    <>
                        <Menu index={false} />
                        <ShopPage lots={lots} />
                    </>
                } />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;