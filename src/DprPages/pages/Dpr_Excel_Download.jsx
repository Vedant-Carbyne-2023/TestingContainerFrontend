import React, { useState } from 'react';
import { api } from '../functions/axiosDefault';

export default function Dpr_Excel_Download() {
    const [formData, setFormData] = useState({
        typeOfWork: '',
    });
    const [downloadedData, setDownloadedData] = useState(null);

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        await handleDownload();
    };

    const handleDownload = async () => {
        try {
            let result;

            if (formData.typeOfWork === 'Pipe') {
                result = await api.post('/getPipeDprAll');
            } else if (formData.typeOfWork === 'Borewell') {
                result = await api.post('/getBorewellDprAll');
            } else if (formData.typeOfWork === 'FHTC') {
                result = await api.post('/getFhtcDprAll');
            } else if (formData.typeOfWork === 'BoundaryWall') {
                result = await api.post('/getBoundaryWallDprAll');
            } else if (formData.typeOfWork === 'PumpHouse') {
                result = await api.post('/getPumpHouseDprAll');
            } else if (formData.typeOfWork === 'OHT') {
                result = await api.post('/getOhtDprAll');
            }
            // Add more conditions for other types of work if needed
            console.log('API Response:', result);

            if (result) {
                setDownloadedData(result.data);
            }
        } catch (error) {
            console.error('Error downloading data:', error.message);
        }
    };
    
    const handleDownloadCSV = () => {
        if (downloadedData && downloadedData.data && Array.isArray(downloadedData.data) && downloadedData.data.length > 0) {
            const csvLines = [];

            if (formData.typeOfWork === 'BoundaryWall') {
                csvLines.push('Date,Project Name,GP Name,Labour Count,Work Done');
            } else if (formData.typeOfWork === 'OHT') {
                csvLines.push('Date,Project Name,GP Name,Layout,Work Done');
            } else if (formData.typeOfWork === 'PumpHouse') {
                csvLines.push('Date,Project Name,GP Name,Labour Count,Work Done');
            } else if (formData.typeOfWork === 'FHTC') {
                csvLines.push('Date,Project Name,GP Name,Labour Count,Work Done');
            }

            downloadedData.data.forEach((item) => {
                if (formData.typeOfWork === 'BoundaryWall') {
                    item.boundaryWallDpr.forEach((dpr) => {
                        const boundaryWallDate = dpr.dprDetails?.boundaryWallDate ? new Date(dpr.dprDetails.boundaryWallDate).toLocaleDateString('en-GB') : '';
                        const projectName = item.projectName || '';
                        const gpName = item.gpName || '';
                        const labourCount = dpr.dprDetails?.labourCount || 0;
                        const workDone = dpr.dprDetails?.workDone || '';

                        csvLines.push(`${boundaryWallDate},${projectName},${gpName},${labourCount},"${workDone}"`);
                    });
                } else if (formData.typeOfWork === 'OHT') {
                    item.ohtDpr.forEach((dpr) => {
                        const ohtDate = dpr.dprDetails?.ohtDate ? new Date(dpr.dprDetails.ohtDate).toLocaleDateString('en-GB') : '';
                        const projectName = item.projectName || '';
                        const gpName = item.gpName || '';
                        const layout = dpr.dprDetails?.layout || 0;
                        const workDone = dpr.dprDetails?.workDone || '';

                        csvLines.push(`${ohtDate},${projectName},${gpName},${layout},"${workDone}"`);
                    });
                } else if (formData.typeOfWork === 'PumpHouse') {
                    item.pumpHouseDpr.forEach((dpr) => {
                        const pumpHouseDate = dpr.dprDetails?.pumpHouseDate ? new Date(dpr.dprDetails.pumpHouseDate).toLocaleDateString('en-GB') : '';
                        const projectName = item.projectName || '';
                        const gpName = item.gpName || '';
                        const labourCount = dpr.dprDetails?.labourCount || 0;
                        const workDone = dpr.dprDetails?.workDone || '';

                        csvLines.push(`${pumpHouseDate},${projectName},${gpName},${labourCount},"${workDone}"`);
                    });
                } else if (formData.typeOfWork === 'FHTC') {
                    item.fhtcDpr.forEach((dpr) => {
                        const fhtcDate = dpr.dprDetails?.fhtcDate ? new Date(dpr.dprDetails.fhtcDate).toLocaleDateString('en-GB') : '';
                        const projectName = item.projectName || '';
                        const gpName = item.gpName || '';
                        const labourCount = dpr.dprDetails?.labourCount || 0;
                        const workDone = dpr.dprDetails?.workDone || '';

                        csvLines.push(`${fhtcDate},${projectName},${gpName},${labourCount},"${workDone}"`);
                    });
                }
            });
            console.log('csvLines:', csvLines);
            const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'downloaded_data.csv';
            link.click();
        }
        else if (downloadedData && downloadedData.data && downloadedData.data.pipeDpr) {
            const csvLines = [];
            const pipeDpr = downloadedData.data.pipeDpr;

            if (formData.typeOfWork === 'Pipe') {
                const pipeDiameters = ['63', '75', '90', '110', '140', '160', '180', '200'];

                // Create the CSV header line
                const header = ['Project Name', 'GP Name', 'Date', 'Labour Count', 'Cummulative Work', ...pipeDiameters.map(dia => `PipeDia-${dia}`)];
                csvLines.push(header.join(','));
            }
            const pipeDiameters = ['63', '75', '90', '110', '140', '160', '180', '200'];


            pipeDpr.pipeDpr.forEach((dpr) => {
                const pipeDate = dpr.dprDetails?.todaysDate ? new Date(dpr.dprDetails.todaysDate).toLocaleDateString('en-GB') : '';
                const projectName = pipeDpr.projectName || '';
                const gpName = pipeDpr.gpName || '';
                const labourCount = dpr.dprDetails?.labourCount || 0;
                const cummulativeWork = dpr.dprDetails?.cummulativeWork || '';
        
                // Create an array for each pipe diameter with work done today
                const pipeWorkDoneToday = pipeDiameters.map(dia => {
                    const pipe = dpr.dprDetails?.pipeData.find(pipe => pipe.pipeDia === dia);
                    return pipe ? pipe.workDoneTillDate : 0;
                });
        
                // Create the CSV data line
                const dataLine = [projectName, gpName, pipeDate, labourCount, cummulativeWork, ...pipeWorkDoneToday];
                csvLines.push(dataLine.join(','));
            });
        
            console.log('csvLines:', csvLines);
        
            const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });
        
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'downloaded_data.csv';
            link.click();
        }
        else if (formData.typeOfWork === 'Borewell') {
            const csvLines = [];
            csvLines.push('Date,Project Name,GP Name,Lowering Date,Gravelling Date,Remarks,Status');

            downloadedData.data.borewellDpr.forEach((borewell) => {
                const gpName = borewell.gpName || '';
                const projectName = borewell.projectName || '';

                borewell.borewellDpr.forEach((dpr) => {
                    const borewellDate = dpr.dprDetails?.todaysDate ? new Date(dpr.dprDetails.todaysDate).toLocaleDateString('en-GB') : '';
                    const loweringDate = dpr.dprDetails?.loweringDate ? new Date(dpr.dprDetails.loweringDate).toLocaleDateString('en-GB') : '';
                    const gravellingDate = dpr.dprDetails?.gravellingDate ? new Date(dpr.dprDetails.gravellingDate).toLocaleDateString('en-GB') : '';
                    const remarks = dpr.dprDetails?.remarks || '';
                    const status = dpr.dprDetails?.status || '';

                    csvLines.push(`${borewellDate},${projectName},${gpName},${loweringDate},${gravellingDate},"${remarks}","${status}"`);
                });
            });
            console.log('csvLines:', csvLines); // Check if csvLines contains the expected data

            const blob = new Blob([csvLines.join('\n')], { type: 'text/csv;charset=utf-8;' });

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = 'downloaded_data.csv';
            link.click();
        }
        else {
            alert("No data Found or Invalid Format")
        }
        setDownloadedData(null);
    };
      
      

    const typeOfWorkOptions = [
        "Borewell",
        "Pipe",
        "FHTC",
        "BoundaryWall",
        "PumpHouse",
        "OHT",
        // "Hydrotest",
        // "JMR",
    ];

    return (
        <div className="d-flex flex-column align-items-center">
            <div className="row mb-3">
                <label htmlFor="typeOfWork" className="form-label">
                    Type Of Work
                </label>
                <select
                    className="form-select"
                    name="typeOfWork"
                    value={formData.typeOfWork}
                    onChange={handleChange}
                >
                    <option value="">Select Type Of Work</option>
                    {typeOfWorkOptions.map((work) => (
                        <option key={work} value={work}>
                            {work}
                        </option>
                    ))}
                </select>
            </div>

            <div className="row mb-3">
                <button className="btn btn-primary mb-4" onClick={handleDownload}>
                    Download
                </button>
                <button
                    className="btn btn-success"
                    onClick={handleDownloadCSV}
                    disabled={!downloadedData}
                >
                    Download CSV
                </button>
            </div>

             {downloadedData && (
                <div className="mt-3">
                    {/* Display the downloaded data below the download button */}
                    <h3>Downloaded Data:</h3>
                    <pre style={{color:"green",fontSize:"20px"}}>Click on Download CSV Button To Download The Excel File</pre>
                </div>
            )} 
        </div>
    );
}  
