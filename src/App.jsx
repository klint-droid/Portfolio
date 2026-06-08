import React, { useEffect } from "react";
import { pageView } from "./analytics";
import Layout from './sections/Layout.jsx';
import CertificationLists from "./pages/CertificationLists.jsx";
import ProjectLists from "./pages/ProjectLists.jsx";
import TechStackList from "./pages/TechStackList.jsx";
import ThreePortfolio from "./pages/ThreePortfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {

  useEffect(() => {
    pageView();
  }, []);

  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/all-certifications" element={<CertificationLists />} />
        <Route path="/all-projects" element={<ProjectLists />} />
        <Route path="/all-techstack" element={<TechStackList />} />
        <Route path="/3d" element={<ThreePortfolio />} />
      </Routes>
    </Router>
  );
};

export default App;