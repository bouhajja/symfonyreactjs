import React from 'react';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectList from "./pages/ProjectList"
import ProjectCreate from "./pages/ProjectCreate"
import ProjectEdit from "./pages/ProjectEdit"
import ProjectShow from "./pages/ProjectShow"

import CatalogueList from "./pages/CatalogueList"
import CatalogueCreate from "./pages/CatalogueCreate"
import CatalogueEdit from "./pages/CatalogueEdit"
import CatalogueShow from "./pages/CatalogueShow"


function Main() {
    return (
        <Router>
            <Routes>
                <Route exact path="/"  element={<ProjectList/>} />
                <Route path="/create"  element={<ProjectCreate/>} />
                <Route path="/edit/:id"  element={<ProjectEdit/>} />
                <Route path="/show/:id"  element={<ProjectShow/>} />


                <Route path="/catalogue"  element={<CatalogueList/>} />
                <Route path="/catalogue/create"  element={<CatalogueCreate/>} />
                <Route path="/catalogue/edit/:id"  element={<CatalogueEdit/>} />
                <Route path="/catalogue/show/:id"  element={<CatalogueShow/>} />



            </Routes>
        </Router>
    );
}
    
export default Main;
    
if (document.getElementById('app')) {
    const rootElement = document.getElementById("app");
    const root = createRoot(rootElement);
  
    root.render(
        <StrictMode>
            <Main />
        </StrictMode>
    );
}