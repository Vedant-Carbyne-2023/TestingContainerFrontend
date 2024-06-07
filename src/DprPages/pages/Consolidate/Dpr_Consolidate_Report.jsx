import React, { useState, useEffect } from 'react';
import { api } from '../../functions/axiosDefault';
import { errorHandler } from '../../functions/errorHandle';
import Swal from 'sweetalert2';

const getTableStyles = () => {
    return {
        overflowX: 'auto',
        maxWidth: '100%',
    };
};

const getTableContainerStyles = () => {
    return {
        width: '100%',
        tableLayout: 'fixed',
    };
};



export default function Dpr_Consolidate_Report() {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedProject, setSelectedProject] = useState('');
    const [projects, setProjects] = useState([]);
    const [fhtcDprData, setFhtcDprData] = useState([]);
    const [pipeDprData, setPipeDprData] = useState([]);
    const [ohtDprData, setOhtDprData] = useState([]);
    const [pumpHouseDprData, setPumpHouseDprData] = useState([]);
    const [boundaryWallDprData, setBoundaryWallDprData] = useState([]);
    const [borewellDprData, setBorewellDprData] = useState([]);





    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const projectsResponse = await api.post('/get-dpr-projects');
                const projectsResult = await errorHandler(projectsResponse);

                if (projectsResult?.data?.success) {
                    setProjects(projectsResult.data.data || []);
                } else {
                    console.error('Error fetching Projects:', projectsResult?.data?.message);
                }
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        };

        fetchProjects();
    }, []);

    const fetchFhtcDpr = async () => {
        try {
            const response = await api.post("/getFhtcDprconsolidate", {
                projectName: selectedProject,
                startDate,
                endDate,
            });

            // Handle the response from the server
            if (response?.data?.code === 200) {
                // Successfully fetched data, you can process the data here
                const fetchedData = response.data.data;
                setFhtcDprData(fetchedData || []);

                console.log("Fetched FHTC Dpr Data:", fetchedData);

            } else {
                // Handle error cases
                console.error("Error fetching FHTC Dpr:", response?.data?.message);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network error:", error.message);
        }
    };
    const fetchPipeDpr = async () => {
        try {
            const response = await api.post('/getPipeDprConsolidate', {
                projectName: selectedProject,
                startDate,
                endDate,
            });

            if (response?.data?.code === 200) {
                const fetchedData = response.data.data;




                setPipeDprData(fetchedData || []);
                console.log("PIPE DATA", fetchedData);

            } else {
                console.error('Error fetching Pipe Dpr:', response?.data?.message);
            }

        } catch (error) {
            console.error('Network error:', error.message);
        }
    };
    const fetchOhtDpr = async () => {
        try {
            const response = await api.post("/getOhtDprConsolidate", {
                projectName: selectedProject,
                startDate,
                endDate,
            });

            // Handle the response from the server
            if (response?.data?.code === 200) {
                // Successfully fetched data, you can process the data here
                const fetchedData = response.data.data;
                setOhtDprData(fetchedData || []);

                console.log("Fetched OHT Dpr Data:", fetchedData);

            } else {
                // Handle error cases
                console.error("Error fetching OHT Dpr:", response?.data?.message);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network error:", error.message);
        }
    };
    const fetchPumpHouseDpr = async () => {
        try {
            const response = await api.post('/getPumpHouseDprConsolidate', {
                projectName: selectedProject,
                startDate,
                endDate,
            });

            if (response?.data?.code === 200) {
                const fetchedData = response.data.data;

                setPumpHouseDprData(fetchedData || []);
                console.log("PUMP HOUSE DATA", fetchedData);
            } else {
                console.error('Error fetching Pump House Dpr:', response?.data?.message);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };
    const fetchBoundaryWallDpr = async () => {
        try {
            const response = await api.post('/getBoundaryWallDprConsolidate', {
                projectName: selectedProject,
                startDate,
                endDate,
            });

            if (response?.data?.code === 200) {
                const fetchedData = response.data.data;

                setBoundaryWallDprData(fetchedData || []);
                console.log("BOUNDARY WALL DATA", fetchedData);
            } else {
                console.error('Error fetching Boundary Wall Dpr:', response?.data?.message);
            }
        } catch (error) {
            console.error('Network error:', error.message);
        }
    };
    const fetchBorewellDpr = async () => {
        try {
            const response = await api.post("/getBorewellDprConsolidate", {
                projectName: selectedProject,
                startDate,
                endDate,
            });

            // Handle the response from the server
            if (response?.data?.code === 200) {
                // Successfully fetched data, you can process the data here
                const fetchedData = response.data.data;
                setBorewellDprData(fetchedData.borewellDpr || []);

                console.log("Fetched Borewell Dpr Data:", fetchedData);
            } else {
                // Handle error cases
                console.error("Error fetching Borewell Dpr:", response?.data?.message);
            }
        } catch (error) {
            // Handle network errors
            console.error("Network error:", error.message);
        }
    };



    useEffect(() => {
        if(startDate && endDate && selectedProject){

            fetchFhtcDpr();
            fetchPipeDpr();
            fetchOhtDpr();
            fetchPumpHouseDpr();
            fetchBoundaryWallDpr();
            fetchBorewellDpr();
        }
        else{
          
        }
    }, [startDate, endDate, selectedProject]);

    const handleChange = (e, fieldType) => {
        const { value } = e.target;
        if (fieldType === 'startDate') {
            setStartDate(value);
        } else if (fieldType === 'endDate') {
            setEndDate(value);
        } else if (fieldType === 'selectedProject') {
            setSelectedProject(value);
        }
    };

    const handleGenerateReport = () => {
        if(startDate && endDate && selectedProject)
        {fetchFhtcDpr();
        fetchPipeDpr();
        fetchOhtDpr();
        fetchPumpHouseDpr();
        fetchBoundaryWallDpr();
        fetchBorewellDpr();
        calculateTotalCummulativeWork();
        calculateTotalCummulativeWorkPipe();
        calculateTotalCummulativeWorkOht();
        calculateTotalCummulativeWorkPumpHouse();
        calculateTotalCummulativeWorkBoundaryWallpaint();
        calculateTotalCummulativeWorkBoundaryWalllayout();
        calculateTotalCummulativeWorkBoundaryWallexcavation();
        calculateTotalCummulativeWorkBoundaryWallpcc();
        calculateTotalCummulativeWorkBoundaryWallbrick();
        calculateTotalCummulativeWorkBoundaryWallplaster();}
        else{
            Swal.fire({
                timer:2000,
                title:"Please Select All Fields Above First",
                icon:'warning'
            })
        }
    };

    const calculateTotalCummulativeWork = () => {
        let total = 0;

        fhtcDprData.forEach((item) => {
            if (item.fhtcDpr && item.fhtcDpr.length > 0) {
                item.fhtcDpr.forEach((dprDetails) => {
                    total += dprDetails?.dprDetails?.workDone || 0;
                });
            }
        });

        // console.log("TOTAL", total);
        return total;
    };
    const calculateTotalCummulativeWorkPipe = () => {
        let total = 0;

        if (pipeDprData && pipeDprData.pipeDpr && Array.isArray(pipeDprData.pipeDpr.pipeDpr) && pipeDprData.pipeDpr.pipeDpr.length > 0) {
            const lastArray = pipeDprData.pipeDpr.pipeDpr[pipeDprData.pipeDpr.pipeDpr.length - 1];

            total = lastArray?.dprDetails?.cummulativeWork


        }

        return total;
    };
    const calculateTotalCummulativeWorkOht = () => {
        let total = 0;

        ohtDprData.forEach((item) => {
            if (item.ohtDpr && item.ohtDpr.length > 0) {
                item.ohtDpr.forEach((dprDetails) => {
                    total += dprDetails?.dprDetails?.labourCount || 0;
                });
            }
        });
        return total;
    };
    const calculateTotalCummulativeWorkPumpHouse = () => {
        let total = 0;

        pumpHouseDprData.forEach((item) => {
            if (item.pumpHouseDpr && item.pumpHouseDpr.length > 0) {
                item.pumpHouseDpr.forEach((dprDetails) => {
                    total += dprDetails?.dprDetails?.labourCount || 0;
                });
            }
        });
        return total;
    };
    const calculateTotalCummulativeWorkBoundaryWallpaint = () => {
        let total = 0;

        boundaryWallDprData.forEach((item) => {
            if (item.boundaryWallDpr && item.boundaryWallDpr.length > 0) {
                item.boundaryWallDpr.forEach((dprDetails) => {
                    // Check if workDone is "Painting Work"
                    if (dprDetails?.dprDetails?.workDone === "Painting Work") {
                        total += dprDetails?.dprDetails?.labourCount || 0;
                    }
                });
            }
        });

        return total;
    };
    const calculateTotalCummulativeWorkBoundaryWalllayout = () => {
        let total = 0;

        boundaryWallDprData.forEach((item) => {
            if (item.boundaryWallDpr && item.boundaryWallDpr.length > 0) {
                item.boundaryWallDpr.forEach((dprDetails) => {
                    // Check if workDone is "Painting Work"
                    if (dprDetails?.dprDetails?.workDone === "Layout") {
                        total += dprDetails?.dprDetails?.labourCount || 0;
                    }
                });
            }
        });

        return total;
    };
    const calculateTotalCummulativeWorkBoundaryWallexcavation = () => {
        let total = 0;

        boundaryWallDprData.forEach((item) => {
            if (item.boundaryWallDpr && item.boundaryWallDpr.length > 0) {
                item.boundaryWallDpr.forEach((dprDetails) => {
                    // Check if workDone is "Painting Work"
                    if (dprDetails?.dprDetails?.workDone === "Excavation") {
                        total += dprDetails?.dprDetails?.labourCount || 0;
                    }
                });
            }
        });

        return total;
    };
    const calculateTotalCummulativeWorkBoundaryWallpcc = () => {
        let total = 0;

        boundaryWallDprData.forEach((item) => {
            if (item.boundaryWallDpr && item.boundaryWallDpr.length > 0) {
                item.boundaryWallDpr.forEach((dprDetails) => {
                    // Check if workDone is "Painting Work"
                    if (dprDetails?.dprDetails?.workDone === "PCC") {
                        total += dprDetails?.dprDetails?.labourCount || 0;
                    }
                });
            }
        });

        return total;
    };
    const calculateTotalCummulativeWorkBoundaryWallbrick = () => {
        let total = 0;

        boundaryWallDprData.forEach((item) => {
            if (item.boundaryWallDpr && item.boundaryWallDpr.length > 0) {
                item.boundaryWallDpr.forEach((dprDetails) => {
                    // Check if workDone is "Painting Work"
                    if (dprDetails?.dprDetails?.workDone === "Brickwork Substructure") {
                        total += dprDetails?.dprDetails?.labourCount || 0;
                    }
                });
            }
        });

        return total;
    };
    const calculateTotalCummulativeWorkBoundaryWallplaster = () => {
        let total = 0;

        boundaryWallDprData.forEach((item) => {
            if (item.boundaryWallDpr && item.boundaryWallDpr.length > 0) {
                item.boundaryWallDpr.forEach((dprDetails) => {
                    // Check if workDone is "Painting Work"
                    if (dprDetails?.dprDetails?.workDone === "Plaster work") {
                        total += dprDetails?.dprDetails?.labourCount || 0;
                    }
                });
            }
        });

        return total;
    };

    const calculateTotalCummulativeWorkBorewell = () => {
        let startedCount = 0;
        let inProgressCount = 0;
        let endedCount = 0;
        let nonActiveCount = 0;

        if (
            borewellDprData &&
            borewellDprData.borewellDpr &&
            Array.isArray(borewellDprData.borewellDpr)
        ) {
            borewellDprData.borewellDpr.forEach((item) => {
                const drillingDatesLength = item?.dprDetails?.drillingDates?.length || 0;

                if (drillingDatesLength > 1) {
                    inProgressCount += 1;  
                } else if (drillingDatesLength === 1) {
                    startedCount += 1;  // Count if drillingDates array length is equal to 1
                } else {
                    endedCount += 1;  
                }
            });
        }

        nonActiveCount = borewellDprData.length - (startedCount + inProgressCount + endedCount);

        return {
            startedCount,
            inProgressCount,

        };
    };
    const calculateTotalCummulativeWorkBorewellend = () => {
        let endedCount = 0;
        let nonActiveCount = 0;

        if (
            borewellDprData &&
            borewellDprData.borewellDpr &&
            Array.isArray(borewellDprData.borewellDpr)
        ) {
            borewellDprData.borewellDpr.forEach((item) => {
                const opUnitDatesLength = item?.dprDetails?.opUnitDates?.length || 0;

                if (opUnitDatesLength > 1) {
                    endedCount += 1;
                }

                if (
                    Array.isArray(item?.dprDetails?.drillingDates) &&
                    item.dprDetails.drillingDates.some(
                        (date) => date.status === 'Non Active'
                    )
                ) {
                    nonActiveCount += 1;
                }
            });
        }

        return {
            endedCount,
            nonActiveCount,
        };
    };

    const calculateTotalCummulativeWorkBorewellResult = calculateTotalCummulativeWorkBorewell();
    const calculateTotalCummulativeWorkBorewellResultend = calculateTotalCummulativeWorkBorewellend();





    return (
        <div className="container mt-2">
            <div className="row" style={{ display: 'flex', alignItems: 'center' }}>
                <div className="col-md-4" style={{ marginRight: '10px' }}>
                    <label htmlFor="startDate">Start Date</label>
                    <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        onChange={(e) => handleChange(e, 'startDate')}
                        value={startDate}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <div className="col-md-4" style={{ marginRight: '10px' }}>
                    <label htmlFor="endDate">End Date</label>
                    <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        onChange={(e) => handleChange(e, 'endDate')}
                        value={endDate}
                        style={{ width: '100%', padding: '5px' }}
                    />
                </div>

                <div className="col-md-4" style={{ marginRight: '10px' }}>
                    <label htmlFor="selectedProject">Select Project</label>
                    <select
                        className="form-select"
                        id="selectedProject"
                        name="selectedProject"
                        value={selectedProject}
                        onChange={(e) => handleChange(e, 'selectedProject')}
                        style={{ width: '100%', padding: '5px' }}
                    >
                        <option value="">Select Project</option>
                        {projects.map((project) => (
                            <option key={project._id} value={project.name}>
                                {project.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="col-md-4 mt-5">
                    <button
                        className="btn btn-primary"
                        onClick={handleGenerateReport}
                    >
                        Generate Report
                    </button>
                </div>
            </div>


            <div className="row mt-4">
                <div className="col-md-12">
                    <div className="table-container" style={getTableStyles()}>
                        <table className="table table-bordered"  style={{ border: '1px solid black', ...getTableContainerStyles() }}>
                            <thead >
                                <tr>
                                    <th style={{ width: '250px',backgroundColor:"#d6dee9" }}>FHTC</th>
                                    <th style={{ width: '250px' ,backgroundColor:"#d6dee9"  }}>Pipe</th>
                                    <th style={{ width: '250px' ,backgroundColor:"#d6dee9"  }}>OHT</th>
                                    <th style={{ width: '250px' ,backgroundColor:"#d6dee9"  }}>Pump House</th>
                                    <th style={{ width: '280px' ,backgroundColor:"#d6dee9"  }}>Boundary Wall</th>
                                    <th style={{ width: '250px' ,backgroundColor:"#d6dee9"  }}>BoreWell</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Total Cummulative Work : {calculateTotalCummulativeWork()}</td>
                                    <td>Total Cummulative Work : {calculateTotalCummulativeWorkPipe()}</td>
                                    <td>Total Labour Count : {calculateTotalCummulativeWorkOht()}</td>
                                    <td>Total Labour Count : {calculateTotalCummulativeWorkPumpHouse()}</td>
                                    <td>
                                        <p>Total Labour Count Paint : {calculateTotalCummulativeWorkBoundaryWallpaint()}</p>
                                        <p>Total Labour Count Layout : {calculateTotalCummulativeWorkBoundaryWalllayout()}</p>
                                        <p>Total Labour Count Excavation : {calculateTotalCummulativeWorkBoundaryWallexcavation()}</p>
                                        <p>Total Labour Count PCC : {calculateTotalCummulativeWorkBoundaryWallpcc()}</p>
                                        <p>Total Labour Count BrickWork : {calculateTotalCummulativeWorkBoundaryWallbrick()}</p>
                                        <p>Total Labour Count Plaster : {calculateTotalCummulativeWorkBoundaryWallplaster()}</p>
                                    </td>
                                    <td>
                                        <p>BoreWell Started : {calculateTotalCummulativeWorkBorewellResult.startedCount}</p>
                                        <p>BoreWell In Progress : {calculateTotalCummulativeWorkBorewellResult.inProgressCount - calculateTotalCummulativeWorkBorewellResultend.endedCount}</p>
                                        <p>BoreWell Ended : {calculateTotalCummulativeWorkBorewellResultend.endedCount}</p>
                                        <p>BoreWell Non-Active : {calculateTotalCummulativeWorkBorewellResultend.nonActiveCount}</p>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    );
}
