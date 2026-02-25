import React from "react";
import Layout from './sections/Layout.jsx';
import CertificationLists from "./pages/CertificationLists.jsx";
import ProjectLists from "./pages/ProjectLists.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Layout />} />
        <Route path="/all-certifications" element={<CertificationLists />} />
        <Route path="/all-projects" element={<ProjectLists />} />
      </Routes>
    </Router>
  );
};

export default App;