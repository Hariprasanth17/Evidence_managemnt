import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../Component/Input/Input";
import { Button } from "../../Component/Button/Button";
import "./EvidenceStore.css";

const EvidenceStore = () => {
    const [evidenceList, setEvidenceList] = useState(() => {
        const savedEvidence = localStorage.getItem("evidenceList");
        return savedEvidence ? JSON.parse(savedEvidence) : [];
    });
    const [newEvidence, setNewEvidence] = useState({
        id: "",
        name: "",
        age: "",
        text: "",
        files: [],
        video: null,
    });
    const [errors, setErrors] = useState({
        id: "",
        name: "",
        age: "",
        text: "",
    });
    const navigate = useNavigate();

    // Validate form inputs
    const validateForm = () => {
        let valid = true;
        const newErrors = { id: "", name: "", age: "", text: "" };

        // Validate ID: Ensure it's not empty
        if (!newEvidence.id) {
            newErrors.id = "Evidence ID is required";
            valid = false;
        }

        // Validate Name: Ensure it contains only letters (A-Z, a-z)
        const namePattern = /^[a-zA-Z\s]+$/;
        if (!newEvidence.name) {
            newErrors.name = "Name is required";
            valid = false;
        } else if (!namePattern.test(newEvidence.name)) {
            newErrors.name = "Name can only contain letters and spaces";
            valid = false;
        }

        // Validate Age: Ensure it's a positive number
        if (!newEvidence.age || newEvidence.age <= 0) {
            newErrors.age = "Age must be a positive number";
            valid = false;
        }

        // Validate Text: Ensure it contains at least one character
        if (!newEvidence.text) {
            newErrors.text = "Details are required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    // Handle form submission
    const addEvidence = () => {
        if (validateForm()) {
            const updatedList = [...evidenceList, { ...newEvidence, files: [...newEvidence.files] }];
            setEvidenceList(updatedList);
            localStorage.setItem("evidenceList", JSON.stringify(updatedList));

            setNewEvidence({
                id: "",
                name: "",
                age: "",
                text: "",
                files: [],
                video: null,
            });
        }
    };

    const handleFileUpload = (event) => {
        const files = event.target.files;
        const filesArray = Array.from(files).map(file => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));

        setNewEvidence({
            ...newEvidence,
            files: [...newEvidence.files, ...filesArray],
        });
    };

    const goToEvidencePage = () => {
        navigate("/evidence");
    };

    return (
        <div className="evidence-container p-6 mx-auto d-flex justify-center align-items-center min-h-screen">
            <div className="container-inside w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">Evidence Store</h1>
                <div className="flex flex-col items-start gap-3 mx-3">
                    <div className="input-element d-flex flex-column justify-center align-items-center w-100 gap-2">
                        <div className="id-field input d-flex flex-column align-items-center">
                            <Input
                                type="text"
                                className="w-full"
                                value={newEvidence.id}
                                onChange={(e) => setNewEvidence({ ...newEvidence, id: e.target.value })}
                                placeholder="Enter ID"
                            />
                            {errors.id && <p className="error-message">{errors.id}</p>}
                        </div>
                        <div className="name-field input d-flex flex-column align-items-center">
                            <Input
                                type="text"
                                className="w-full w-100"
                                value={newEvidence.name}
                                onChange={(e) => setNewEvidence({ ...newEvidence, name: e.target.value })}
                                placeholder="Enter Name"
                            />
                            {errors.name && <p className="error-message">{errors.name}</p>}
                        </div>
                        <div className="age-field input d-flex flex-column align-items-center">
                            <Input
                                type="number"
                                className="w-full"
                                value={newEvidence.age}
                                onChange={(e) => setNewEvidence({ ...newEvidence, age: e.target.value })}
                                placeholder="Enter Age"
                            />
                            {errors.age && <p className="error-message">{errors.age}</p>}
                        </div>
                        <div className="text-field input d-flex flex-column align-items-center">
                            <textarea
                                type="text"
                                rows="4"
                                className="w-full text-area"
                                value={newEvidence.text}
                                onChange={(e) => setNewEvidence({ ...newEvidence, text: e.target.value })}
                                placeholder="Enter Details"
                            />
                            {errors.text && <p className="error-message">{errors.text}</p>}
                        </div>
                        <div className="file-field d-flex flex-column align-items-center">
                            <Input
                                type="file"
                                className="w-full w-100"
                                multiple
                                accept="video/*,audio/*"
                                onChange={handleFileUpload}
                            />
                        </div>
                        <div className="flex flex-col gap-2 d-flex flex-column align-items-center">
                            <Button onClick={addEvidence} className="w-full btn btn-success">Add Evidence</Button>
                            <Link to="/evidence/list" variant="secondary" onClick={goToEvidencePage} className="w-full">View All Evidence</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EvidenceStore;
