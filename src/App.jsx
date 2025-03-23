import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Home from "./Component/Home/Home";
import Login from "./Component/Login/Login";
import Signup from "./Component/SignUp/Signup";
import EvidencePage from "./Component/EvidencePage/EvidencePage";
import EvidenceStore from "./Component/EvidenceStore/EvidenceStore";


const App = () => {
  return (
    <Router>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/evidence/upload" element={<EvidencePage />} />
        <Route path="/evidence/view" element={<EvidenceStore />} />
      </Routes>
    </Router>
  );
};

export default App;
