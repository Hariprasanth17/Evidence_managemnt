import React, { useState, useEffect } from "react";
import { Button } from "../../Component/Button/Button";
import "./EvidenceList.css"; // Import styles

const EvidenceList = () => {
    const [evidenceList, setEvidenceList] = useState([]);
    const [filteredEvidenceList, setFilteredEvidenceList] = useState([]);
    const [searchId, setSearchId] = useState("");

    useEffect(() => {
        const storedEvidence = JSON.parse(localStorage.getItem("evidenceList")) || [];
        setEvidenceList(storedEvidence);
        setFilteredEvidenceList(storedEvidence);
    }, []);

    useEffect(() => {
        if (searchId.trim() === "") {
            setFilteredEvidenceList(evidenceList);
        }
    }, [searchId, evidenceList]);

    const handleSearch = () => {
        if (searchId.trim() === "") {
            setFilteredEvidenceList(evidenceList);
        } else {
            const filtered = evidenceList.filter((evidence) => evidence.id === searchId);
            setFilteredEvidenceList(filtered);
        }
    };

    return (
        <div className="container-evi">
            <div className="evidence-container">
                <h2 className="evidence-title">Available Evidence</h2>

                {/* Search Input */}
                <div className="search-bar">
                    <input
                        type="text"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                        placeholder="Enter Evidence ID"
                    />
                    <Button variant="primary" onClick={handleSearch}>Search</Button>
                </div>

                {/* Evidence Display */}
                <div className="evidence-list">
                    {filteredEvidenceList.length > 0 ? (
                        filteredEvidenceList.map((evidence) => (
                            <div key={evidence.id} className="evidence-card">
                                <h3>{evidence.name} (Age: {evidence.age})</h3>
                                <p>ID: {evidence.id}</p>
                                <p className="evidence-text">{evidence.text}</p>

                                {/* Display Evidence Files */}
                                <div className="evidence-files">
                                    {evidence.files.length > 0 ? (
                                        evidence.files.map((file, index) => (
                                            <div key={index} className="file-preview">
                                                {file.url.endsWith(".mp4") ? (
                                                    <video controls>
                                                        <source src={file.url} type="video/mp4" />
                                                    </video>
                                                ) : file.url.endsWith(".mp3") ? (
                                                    <audio controls>
                                                        <source src={file.url} type="audio/mp3" />
                                                    </audio>
                                                ) : file.url.match(/\.(jpeg|jpg|png)$/) ? (
                                                    <img src={file.url} alt="Uploaded Evidence" />
                                                ) : (
                                                    <a href={file.url} target="_blank" rel="noopener noreferrer">
                                                        {file.name}
                                                    </a>
                                                )}
                                            </div>
                                        ))
                                    ) : (
                                        <p>No media attached</p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="no-evidence">No evidence found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EvidenceList;
