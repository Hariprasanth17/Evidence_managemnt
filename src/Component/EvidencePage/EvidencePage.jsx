import React, { useState, useEffect } from "react";
import { Button } from "../../Component/Button/Button";
import { Trash2, Edit } from "lucide-react";
import "./EvidencePage.css";

const EvidencePage = () => {
    const [evidenceList, setEvidenceList] = useState([]);
    const [filteredEvidenceList, setFilteredEvidenceList] = useState([]);
    const [searchId, setSearchId] = useState("");
    const [editMode, setEditMode] = useState(null);
    const [editedData, setEditedData] = useState({ name: "", age: "", text: "" });

    useEffect(() => {
        const storedEvidence = JSON.parse(localStorage.getItem("evidenceList")) || [];
        setEvidenceList(storedEvidence);
        setFilteredEvidenceList(storedEvidence);
    }, []);

    const deleteEvidence = (id) => {
        const updatedList = evidenceList.filter((evidence) => evidence.id !== id);
        setEvidenceList(updatedList);
        setFilteredEvidenceList(updatedList);
        localStorage.setItem("evidenceList", JSON.stringify(updatedList));
    };

    const handleSearchInputChange = (e) => {
        const value = e.target.value;
        setSearchId(value);

        if (value.trim() === "") {
            setFilteredEvidenceList(evidenceList); // Show all evidence if input is empty
        }
    };

    const handleSearch = () => {
        if (searchId.trim() === "") {
            setFilteredEvidenceList(evidenceList);
        } else {
            const filtered = evidenceList.filter((evidence) => evidence.id === searchId);
            setFilteredEvidenceList(filtered);
        }
    };

    const startEditing = (evidence) => {
        setEditMode(evidence.id);
        setEditedData({ name: evidence.name, age: evidence.age, text: evidence.text });
    };

    const handleEditChange = (e) => {
        setEditedData({ ...editedData, [e.target.name]: e.target.value });
    };

    const saveEdit = (id) => {
        const updatedList = evidenceList.map((evidence) =>
            evidence.id === id ? { ...evidence, ...editedData } : evidence
        );
        setEvidenceList(updatedList);
        setFilteredEvidenceList(updatedList);
        localStorage.setItem("evidenceList", JSON.stringify(updatedList));
        setEditMode(null);
    };

    return (
        <div className="evidence-container">
            {/* Search Input */}
            <div className="search-bar">
                <input
                    type="text"
                    value={searchId}
                    onChange={handleSearchInputChange} // Updates search dynamically
                    placeholder="Enter Evidence ID"
                />
                <Button variant="primary" onClick={handleSearch}>Search</Button>
            </div>

            {/* Evidence Scrollable Card Container */}
            <div className="evidence-scroll-container">
                {filteredEvidenceList.length > 0 ? (
                    filteredEvidenceList.map((evidence) => (
                        <div key={evidence.id} className="evidence-card">
                            {editMode === evidence.id ? (
                                <>
                                    <input name="name" value={editedData.name} onChange={handleEditChange} />
                                    <input name="age" value={editedData.age} onChange={handleEditChange} />
                                    <textarea name="text" value={editedData.text} onChange={handleEditChange} />
                                    <Button variant="success" className="save-butt" onClick={() => saveEdit(evidence.id)}>Save</Button>
                                </>
                            ) : (
                                <>
                                    <h3>{evidence.name} (Age: {evidence.age})</h3>
                                    <p>ID: {evidence.id}</p>
                                    <p className="evidence-text">{evidence.text}</p>
                                </>
                            )}

                            {/* Edit & Delete Buttons */}
                            {editMode !== evidence.id && (
                                <>
                                    <Button variant="secondary" className="edit-button" onClick={() => startEditing(evidence)}>
                                        <Edit size={16} /> Edit
                                    </Button>
                                    <Button variant="destructive" className="delete-button" onClick={() => deleteEvidence(evidence.id)}>
                                        <Trash2 size={16} /> Delete
                                    </Button>
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="no-evidence">No evidence found.</p>
                )}
            </div>
        </div>
    );
};

export default EvidencePage;
