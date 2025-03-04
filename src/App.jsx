import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EvidenceStore from "./Component/EvidenceStore/EvidenceStore";
import EvidencePage from "./Component/EvidencePage/EvidencePage";
import ErrorBoundary from "./Component/ErrorBoundary/ErrorBoundary";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <ErrorBoundary>
            <EvidenceStore />
          </ErrorBoundary>} />
        <Route path="/evidence" element={<EvidencePage />} />
      </Routes>
    </Router>
  );
}

export default App;
