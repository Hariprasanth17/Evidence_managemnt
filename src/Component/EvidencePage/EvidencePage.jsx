import React, { useState, useEffect } from "react";
import { Button } from "../../Component/Button/Button";
import { Trash2 } from "lucide-react";
import "./EvidencePage.css";

const EvidencePage = () => {
    const [evidenceList, setEvidenceList] = useState([]);
    const [filteredEvidenceList, setFilteredEvidenceList] = useState([]);
    const [searchId, setSearchId] = useState(""); // State for the search ID
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [currentEvidence, setCurrentEvidence] = useState(null);

    // Load evidence data from localStorage on page load
    useEffect(() => {
        const storedEvidence = JSON.parse(localStorage.getItem("evidenceList")) || [];
        setEvidenceList(storedEvidence);
        setFilteredEvidenceList(storedEvidence); // Initially, show all evidence
    }, []); // Only run once when the component mounts

    const deleteEvidence = (id) => {
        const updatedList = evidenceList.filter((evidence) => evidence.id !== id);
        setEvidenceList(updatedList);
        setFilteredEvidenceList(updatedList); // Also update filtered list
        localStorage.setItem("evidenceList", JSON.stringify(updatedList)); // Save updated list to localStorage
    };

    const handleVerify = () => {
        alert("Evidence Verified");
        setIsPopupVisible(false); // Close popup after verification
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const goBack = () => {
        // Navigate to previous page without losing data
        window.history.back();
    };

    const handleSearch = () => {
        const filtered = evidenceList.filter((evidence) =>
            evidence.id === searchId
        );
        setFilteredEvidenceList(filtered); // Update the filtered list
    };

    return (
        <div className="p-6 max-w-4xl mx-auto .evidence-store-container">
            {/* Search Input and Button */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchId}
                    onChange={(e) => setSearchId(e.target.value)}
                    placeholder="Enter Evidence ID"
                    className="border px-4 py-2 mr-2"
                />
                <Button variant="primary" onClick={handleSearch}>Search</Button>
            </div>

            {isPopupVisible ? (
                <div className="popup-overlay">
                        <div>
                            {currentEvidence.files.map((file, index) => (
                                <div key={index}>
                                    {file && file.name ? (  // Check if file and file.name exist
                                        file.type.startsWith("video") ? (
                                            <video controls width="200">
                                                <source src={URL.createObjectURL(file)} type={file.type} />
                                            </video>
                                        ) : file.type.startsWith("audio") ? (
                                            <audio controls>
                                                <source src={URL.createObjectURL(file)} type={file.type} />
                                            </audio>
                                        ) : file.type.startsWith("image") ? (
                                            <img src={URL.createObjectURL(file)} alt="File preview" width="200" />
                                        ) : null
                                    ) : (
                                        <p>File not available</p> // Handle cases where file is missing or has no name
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 flex justify-between">
                            <Button variant="primary" onClick={handleVerify}>Verify</Button>
                            <Button variant="secondary" onClick={closePopup}>Close</Button>
                        </div>
                    </div>
              
            ) : (
                <div className="evidence-store-table">
                    <h1 className="text-2xl font-bold mb-4">Evidence Records</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">ID</th>
                                    <th className="border px-4 py-2">Name</th>
                                    <th className="border px-4 py-2">Age</th>
                                    <th className="border px-4 py-2">Evidence</th>
                                    <th className="border px-4 py-2">Media</th>
                                    <th className="border px-4 py-2">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredEvidenceList.length > 0 ? (
                                    filteredEvidenceList.map((evidence) => (
                                        <tr
                                            key={evidence.id}
                                            className={`border ${evidence.id === searchId ? "bg-yellow-200" : ""}`} // Highlight row if ID matches
                                        >
                                            <td className="border px-4 py-2">{evidence.id}</td>
                                            <td className="border px-4 py-2">{evidence.name}</td>
                                            <td className="border px-4 py-2">{evidence.age}</td>
                                            <td className="border px-4 py-2">{evidence.text}</td>
                                            <td className="border px-4 py-2">
                                                {evidence.files.length > 0 ? (
                                                    evidence.files.map((file, index) => (
                                                        <div key={index}>
                                                            <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                                                                {file.name || "Download File"}
                                                            </a>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <p>No evidence files uploaded</p>
                                                )}
                                            </td>

                                            <td className="border px-4 py-2">
                                                <Button variant="destructive" onClick={() => deleteEvidence(evidence.id)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No evidence found.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Button variant="outline" onClick={goBack} className="mt-4 go-back-butt">
                Go Back
            </Button>
        </div>
    );
};

export default EvidencePage;
