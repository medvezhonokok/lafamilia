import './App.css';
import {Routes, Route, Navigate, BrowserRouter as Router} from 'react-router-dom';
import IndexPage from "./components/IndexPage/IndexPage";
import ShopPage from "./components/ShopPage/ShopPage";
import AdminPage from "./components/AdminPage/AdminPage";
import {useEffect, useState} from "react";
import * as client from "./client/client";

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
                <Route path="/" element={<IndexPage/>}/>
                <Route path="/shop" element={<ShopPage lots={lots}/>}/>
                <Route path="/admin" element={<AdminPage/>}/>
                <Route path="*" element={<Navigate to="/" replace/>}/>
            </Routes>
        </Router>

    );
}

export default App;
