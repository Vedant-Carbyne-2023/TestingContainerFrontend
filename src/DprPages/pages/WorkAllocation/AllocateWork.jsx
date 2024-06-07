import React, { useEffect, useState } from "react";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";

export default function AllocateWork() {

    const [formData, setFormData] = useState({
        projectName: "",
        userName: "",
        typeOfWork: "",
    });
    const [projects, setProjects] = useState([]);
    const [users, setUsers] = useState([]);


    const handleChange = async (e, fieldType) => {
        const { value } = e.target;
        let updatedFormData = { ...formData, [fieldType]: value };

        console.log("FORM DATA", updatedFormData)

        setFormData(updatedFormData);

        if (fieldType === "projectName") {
            const selectedProject = projects.find(project => project.name === value);
            const projectId = selectedProject ? selectedProject.id : null;

            try {
                const response = await api.post("/get-users-by-project", {
                    projectId: projectId,
                });

                const result = await errorHandler(response);
                console.log("HAAJI", response)

                if (result?.data) {
                    setUsers(result.data || []);
                } else {
                    console.error("Error fetching assigned users:", result?.message);
                }

            } catch (error) {
                console.error("Error fetching assigned users:", error);
            }
        }
        if (fieldType === "userName") {
            const selectedUser = users.find((user) => user.id === value);
            console.log(selectedUser)
            
            const userNameData = {
                id: selectedUser ? selectedUser.id : "",
                name: selectedUser ? selectedUser.name : "",
            };
            updatedFormData = { ...updatedFormData, [fieldType]: userNameData };
            setFormData(updatedFormData);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await api.post('/save-work-data', formData);
            const result = await errorHandler(response);
            if (result && result && result.data.success) {
                console.log('Work data submitted successfully');
                setFormData({
                    projectName: '',
                    userName: '',
                    typeOfWork: '',
                });
            } else {
                console.error('Error submitting work data:', result?.message);
            }
        } catch (error) {
            console.error('Error submitting work data:', error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectsResponse] = await Promise.all([
                    api.post("/get-dpr-projects"),

                ]);

                const [projectsResult] = await Promise.all([
                    errorHandler(projectsResponse),

                ]);

                if (projectsResult?.data?.success) {
                    setProjects(projectsResult.data.data || []);

                } else {
                    console.error(
                        "Error fetching Projects:",
                        projectsResult?.data?.message
                    );
                }


            } catch (error) {
                console.error("Error fetching data:", error);
                alert(error.message);
            }
        };

        fetchData();
    }, []);

    const typeOfWorkOptions = [
        "Borewell",
        "Pipe",
        "FHTC",
        "Boundary Wall",
        "Pump House",
        "OHT",
        // "Hydrotest",
        // "JMR",
    ];
    return (
        <>
            <div className="container mt-2">
                <div className="row">
                    <div className="col-md-4">
                        <label htmlFor="projectName" title="Select Project From DropDown">Project Name</label>
                        <select
                            className="form-select"
                            id="projectName"
                            name="projectName"
                            value={formData.projectName}
                            onChange={(e) => handleChange(e, "projectName")}
                        >
                            <option value="">Select Project Name</option>
                            {projects.map((project) => (
                                <option key={project._id} value={project.name}>
                                    {project.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="userName" title="Select User From DropDown">
                            User Name
                        </label>
                        <select
                            className="form-select"
                            id="userName"
                            name="userName"
                            value={formData.userName.id || "haaji"}
                            onChange={(e) => handleChange(e, "userName")}
                        >
                            <option value="">Select User Name</option>
                            {users.map((user) => (
                                <option key={user._id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="typeOfWork" title="Select Type of Work">
                            Type of Work
                        </label>
                        <select
                            className="form-select"
                            id="typeOfWork"
                            name="typeOfWork"
                            value={formData.typeOfWork}
                            onChange={(e) => handleChange(e, "typeOfWork")}
                        >
                            <option value="">Select Type of Work</option>
                            {typeOfWorkOptions.map((typeOfWork) => (
                                <option key={typeOfWork} value={typeOfWork}>
                                    {typeOfWork}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>


            </div>
            <div className="row mt-5 d-flex justify-content-center">
                <div className="col-md-4 text-center">
                    <button
                        type="button"
                        className="btn btn-primary fw-bold"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>



        </>
    )
}
