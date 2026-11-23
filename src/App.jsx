import React, { useEffect, Suspense, lazy } from "react";
import "./App.css";
import { pageView } from "./analytics";
import ThreePortfolio from "./pages/ThreePortfolio";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const CertificationLists = lazy(() => import("./pages/CertificationLists.jsx"));
const ProjectLists = lazy(() => import("./pages/ProjectLists.jsx"));
const TechStackList = lazy(() => import("./pages/TechStackList.jsx"));
const ReactCoursePage = lazy(() => import("./pages/ReactCoursePage.jsx"));
const FriendQuizPage = lazy(() => import("./pages/FriendQuizPage.jsx"));

const PageLoader = () => (
  <div className="w-screen h-screen bg-[#121110] text-[#F3F1EC] flex items-center justify-center claude-font-mono text-xs">
    Loading...
  </div>
);

const App = () => {
  useEffect(() => {
    pageView();
  }, []);

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<ThreePortfolio />} />
          <Route path="/3d" element={<ThreePortfolio />} />
          <Route path="/recommend" element={<ThreePortfolio initialOpenRecommend={true} />} />
          <Route path="/write-recommendation" element={<ThreePortfolio initialOpenRecommend={true} />} />
          <Route path="/all-certifications" element={<CertificationLists />} />
          <Route path="/all-projects" element={<ProjectLists />} />
          <Route path="/all-techstack" element={<TechStackList />} />
          <Route path="/react-course" element={<ReactCoursePage />} />
          <Route path="/friend-quiz" element={<FriendQuizPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
