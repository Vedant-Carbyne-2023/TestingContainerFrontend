import React, { useEffect, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import MyToggleComponent from "./ActiveToggle";
import TimeInputComponent from "./TimeComponent";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import Swal from "sweetalert2";
import moment from "moment/moment";
import Drilling from "./Drilling";
import Compressor from "./Compressor";
import OpUnit from "./OpUnit";
import ShowPreviousBorewellDpr from "./ShowPreviousBorewellDpr";
import BorewellDprModal from "./BorewellModal";
import { Spinner } from "react-bootstrap";


export default function Borewell({ projectName, gpName }) {

  const [loweringDate, setLoweringDate] = useState('')
  const [loweringDepth, setLoweringDepth] = useState('')
  const [gravellingDate, setGravelPackingDate] = useState('')
  const [gravelPackagingQty, setGravelPackagingQty] = useState('')
  const [remarks, setRemarks] = useState('');
  const [displayDates, setDisplayDates] = useState(true);
  const [showForm, setShowForm] = useState(true);
  const [showDateInput, setShowDateInput] = useState(true); // Add this state variable
  const [isDrillingVendorAllocated, setIsDrillingVendorAllocated] = useState(false);
  const [loadingVendorStatus, setLoadingVendorStatus] = useState(true);

  // Add this state variable
  console.log(displayDates)


  const drillingRef = useRef();
  const compressorRef = useRef();
  const opUnitRef = useRef();

  const [latestDpr, setLatestDpr] = useState('')
  const [drillingEndDate, setDrillingEndDate] = useState(false)
  const [compressorEndDate, setCompressorEndDate] = useState(false)
  const [opUnitEndDate, setOpUnitEndDate] = useState(false)
  const [loweringDone, setLoweringDone] = useState(false)
  const [gravellingDone, setGravellingDone] = useState(false)
  const [loading, setLoading] = useState(false);
  const [isNewEntry, setIsNewEntry] = useState(false);
  const [isGetDataClicked, setIsGetDataClicked] = useState(false);
  const [allCreatedAtDates, setAllCreatedAtDates] = useState([]);
  const [totalBoreWell, setTotalBoreWell] = useState([])
  const [dprId, setDprId] = useState('');
  const [todaysDate, setTodaysDate] = useState('')
  const [status, setStatus] = useState('')
  const [borewell, setBorewell] = useState({
    loweringVendorName: "",
    compressorVendorName: "",
    gravellingVendorName: "",
    opUnitVendorName: "",
    drillingVendorName: "",
  });
  const [previousBorewellDpr, setPreviousBorewellDpr] = useState('')
  const [borewellCount, setBorewellCount] = useState(1)
  console.log(displayDates)
  useEffect(() => {
    const getData = async () => {

      setLoading(true);
      try {
        let result = await api.post(
          `/getBorewellDpr`,
          { projectName: projectName, gpName: gpName, borewellCount }
        );
        result = await errorHandler(result);
        console.log("GET DATA", result);

        const datedata = result.data.data.pipeDpr?.borewellDpr || null;
        if (result.data.data.pipeDpr) {
          setIsDrillingVendorAllocated(!!result.data.data.pipeDpr.drillingVendorName);
        }


        if (datedata !== null) {
          const allCreatedAtDates = datedata.flatMap(item =>
            item?.dprDetails ? [item.dprDetails.createdAt] : []
          );

          console.log(datedata)
          const allBorewellSet = new Set(datedata.flatMap(item =>
            item?.dprDetails ? [item.dprDetails.borewellCount] : []
          ));

          console.log("All createdAt dates:", allBorewellSet);

          setAllCreatedAtDates(allCreatedAtDates);
          const borewellArray = Array.from(allBorewellSet);

          // Alternatively, you can use the spread operator
          // const borewellArray = [...allBorewellSet];
          console.log(borewellArray)
          setTotalBoreWell(borewellArray);
          setDisplayDates(true)
        } else {
          console.error("datedata is null");
        }




        setPreviousBorewellDpr(result.data.data.pipeDpr?.borewellDpr || null)
        if (result.data.data.pipeDpr) {
          if (
            // !result.data.data.pipeDpr.loweringVendorName ||
            // !result.data.data.pipeDpr.compressorVendorName ||
            // !result.data.data.pipeDpr.gravellingVendorName ||
            // !result.data.data.pipeDpr.opUnitVendorName ||
            !result.data.data.pipeDpr.drillingVendorName
          ) {
            alert('No vendor allocated. Please allocate a vendor first.');
            return
          }
        } else {
          alert('No vendor allocated. Please allocate a vendor first.');

          return
        }
        setBorewell({
          loweringVendorName: result.data.data.pipeDpr?.loweringVendorName || 'Default Vendor',
          compressorVendorName: result.data.data.pipeDpr?.compressorVendorName || 'Default Vendor',
          gravellingVendorName: result.data.data.pipeDpr?.gravellingVendorName || 'Default Vendor',
          opUnitVendorName: result.data.data.pipeDpr?.opUnitVendorName || 'Default Vendor',
          drillingVendorName: result.data.data.pipeDpr?.drillingVendorName || 'Default Vendor',
        });

        setDrillingEndDate(result.data.data.latestDpr.drillingDates && result.data.data.latestDpr.drillingDates.slice(-1)[0]?.typeOfDate === 'End Date');
        setCompressorEndDate(result.data.data.latestDpr.compressorDates && result.data.data.latestDpr.compressorDates.slice(-1)[0]?.typeOfDate === 'End Date');
        setOpUnitEndDate(result.data.data.latestDpr.opUnitDates && result.data.data.latestDpr.opUnitDates.slice(-1)[0]?.typeOfDate === 'End Date');
        setLoweringDone(result.data.data.latestDpr.loweringDate && result.data.data.latestDpr.loweringDate ? true : false)
        setGravellingDone(result.data.data.latestDpr.gravellingDate && result.data.data.latestDpr.gravellingDate ? true : false)
        setLoweringDate(result.data.data.latestDpr.loweringDate && result.data.data.latestDpr.loweringDate)
        setLoweringDepth(result.data.data.latestDpr.loweringDepth && result.data.data.latestDpr.loweringDepth)
        setGravelPackingDate(result.data.data.latestDpr.gravellingDate && result.data.data.latestDpr.gravellingDate)
        setGravelPackagingQty(result.data.data.latestDpr.gravelPackagingQty && result.data.data.latestDpr.gravelPackagingQty)
        setLatestDpr(result.data.data.latestDpr && result.data.data.latestDpr);
        setDprId(result.data.data.latestDpr && result.data.data.latestDpr.dprId);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingVendorStatus(false); // Set loadingVendorStatus to false once API call is complete

        setLoading(false);
      }

    };

    if (projectName && gpName) {

      getData();
    }
  }, [status, isGetDataClicked]);
  useEffect(() => {
    const getData = async () => {
      // setIsGetDataClicked(false);
      setDisplayDates(false);
      setBorewellCount(1)
      setTotalBoreWell([])
      setDprId('');
      setLoweringDate('');
      setLoweringDepth('');
      setGravelPackingDate('');
      setGravelPackagingQty('');
      setRemarks('');
      setDrillingEndDate(false);
      setCompressorEndDate(false);
      setOpUnitEndDate(false);
      setLoweringDone(false);
      setGravellingDone(false);
      setTodaysDate('');
      setStatus('');
      setLatestDpr('');
      setPreviousBorewellDpr('');

      setLoading(true);
      try {
        let result = await api.post(
          `/getBorewellDpr`,
          { projectName: projectName, gpName: gpName, borewellCount: 1 }
        );
        result = await errorHandler(result);
        console.log("GET DATA", result);

        const datedata = result.data.data.pipeDpr?.borewellDpr || null;
        if (result.data.data.pipeDpr) {
          setIsDrillingVendorAllocated(!!result.data.data.pipeDpr.drillingVendorName);
        }


        if (datedata !== null) {
          const allCreatedAtDates = datedata.flatMap(item =>
            item?.dprDetails ? [item.dprDetails.createdAt] : []
          );

          console.log(datedata)
          const allBorewellSet = new Set(datedata.flatMap(item =>
            item?.dprDetails ? [item.dprDetails.borewellCount] : []
          ));

          console.log("All createdAt dates:", allBorewellSet);

          setAllCreatedAtDates(allCreatedAtDates);
          const borewellArray = Array.from(allBorewellSet);

          // Alternatively, you can use the spread operator
          // const borewellArray = [...allBorewellSet];
          console.log(borewellArray)
          setTotalBoreWell(borewellArray);
          setDisplayDates(true)
        } else {
          console.error("datedata is null");
        }




        setPreviousBorewellDpr(result.data.data.pipeDpr?.borewellDpr || null)
        if (result.data.data.pipeDpr) {
          if (
            // !result.data.data.pipeDpr.loweringVendorName ||
            // !result.data.data.pipeDpr.compressorVendorName ||
            // !result.data.data.pipeDpr.gravellingVendorName ||
            // !result.data.data.pipeDpr.opUnitVendorName ||
            !result.data.data.pipeDpr.drillingVendorName
          ) {
            alert('No vendor allocated. Please allocate a vendor first.');
            return
          }
        } else {
          alert('No vendor allocated. Please allocate a vendor first.');
          return

        }
        setBorewell({
          loweringVendorName: result.data.data.pipeDpr?.loweringVendorName || 'Default Vendor',
          compressorVendorName: result.data.data.pipeDpr?.compressorVendorName || 'Default Vendor',
          gravellingVendorName: result.data.data.pipeDpr?.gravellingVendorName || 'Default Vendor',
          opUnitVendorName: result.data.data.pipeDpr?.opUnitVendorName || 'Default Vendor',
          drillingVendorName: result.data.data.pipeDpr?.drillingVendorName || 'Default Vendor',
        });

        setDrillingEndDate(result.data.data.latestDpr.drillingDates && result.data.data.latestDpr.drillingDates.slice(-1)[0]?.typeOfDate === 'End Date');
        setCompressorEndDate(result.data.data.latestDpr.compressorDates && result.data.data.latestDpr.compressorDates.slice(-1)[0]?.typeOfDate === 'End Date');
        setOpUnitEndDate(result.data.data.latestDpr.opUnitDates && result.data.data.latestDpr.opUnitDates.slice(-1)[0]?.typeOfDate === 'End Date');
        setLoweringDone(result.data.data.latestDpr.loweringDate && result.data.data.latestDpr.loweringDate ? true : false)
        setGravellingDone(result.data.data.latestDpr.gravellingDate && result.data.data.latestDpr.gravellingDate ? true : false)
        setLoweringDate(result.data.data.latestDpr.loweringDate && result.data.data.latestDpr.loweringDate)
        setLoweringDepth(result.data.data.latestDpr.loweringDepth && result.data.data.latestDpr.loweringDepth)
        setGravelPackingDate(result.data.data.latestDpr.gravellingDate && result.data.data.latestDpr.gravellingDate)
        setGravelPackagingQty(result.data.data.latestDpr.gravelPackagingQty && result.data.data.latestDpr.gravelPackagingQty)

        setLatestDpr(result.data.data.latestDpr && result.data.data.latestDpr);
        setDprId(result.data.data.latestDpr && result.data.data.latestDpr.dprId);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoadingVendorStatus(false); // Set loadingVendorStatus to false once API call is complete

        setLoading(false);
      }

    };

    if (projectName && gpName) {

      getData();
    }
  }, [projectName, gpName]);

  // useEffect(()=> {

  // },[selectedDates]);

  const handleParentSubmit = async (e) => {
    e.preventDefault();
    console.log("here")

    // Access and call handleSubmit functions of child components
    const promises = [
      !drillingEndDate ? drillingRef.current.handleSubmit(e) : null,
      (loweringDone && gravellingDone && !compressorEndDate) ? compressorRef.current.handleSubmit(e) : null,
      compressorEndDate && opUnitRef.current.handleSubmit(e)
    ];
    // Wait for all promises to resolve 
    let [drillingResult, compressorResult, opUnitResult] = await Promise.all(promises);
    console.log(drillingResult, compressorResult, opUnitResult)
    if (drillingResult == "cancel" || compressorResult == "cancel" || opUnitResult == "cancel") {
      // alert("Something is False")
      return
    }
    if (drillingEndDate) {
      drillingResult = latestDpr.drillingDates;
    }
    if (compressorEndDate) {
      compressorResult = latestDpr.compressorDates;
    }
    // return
    let result;
    if (dprId && dprId != '') {
      result = await api.post('/borewellDailyDpr', {
        // borewellId: dprId,
        projectName: projectName,
        gpName: gpName,
        borewellCount: borewellCount,
        drillingDates: drillingResult,
        compressorDates: compressorResult,
        opUnitDates: opUnitResult,
        remarks: remarks,
        todaysDate: todaysDate,
        gravellingDate: gravellingDate,
        gravelPackagingQty: gravelPackagingQty,
        loweringDate: loweringDate,
        loweringDepth: loweringDepth,

      });

    } else {
      result = await api.post('/borewellDailyDpr', {
        projectName: projectName,
        gpName: gpName,
        drillingDates: drillingResult,
        borewellCount: borewellCount,
        compressorDates: compressorResult,
        opUnitDates: opUnitResult,
        remarks: remarks,
        todaysDate: todaysDate,
        gravellingDate: gravellingDate,
        gravelPackagingQty: gravelPackagingQty,
        loweringDate: loweringDate,
        loweringDepth: loweringDepth,

      });
    }

    result = await errorHandler(result);
    setStatus(result.data.data._id);

    setRemarks('');

    Swal.fire({
      title: result.data.message,
      timer: 3000,
      icon: 'success'
    });

  };


  const handleNewEntry = async () => {
    if (opUnitEndDate == false) {
      return Swal.fire({
        title: "Please Complete this Borewell First"
      })
    }

    setIsGetDataClicked(false);
    setDisplayDates(false);


    setLoweringDate('');
    setLoweringDepth('');
    setGravelPackingDate('');
    setGravelPackagingQty('');
    setRemarks('');
    setDrillingEndDate(false);
    setCompressorEndDate(false);
    setOpUnitEndDate(false);
    setLoweringDone(false);
    setGravellingDone(false);
    setTodaysDate('');
    setStatus('');
    setLatestDpr('');
    // setPreviousBorewellDpr('');



    let result = await api.post('/borewellDailyDpr', {
      projectName: projectName,
      gpName: gpName,
      borewellCount: totalBoreWell.length + 1
    })


    setBorewellCount(totalBoreWell.length + 1)
    setStatus(result.data.data._id);
    handleGetCreatedAtData(totalBoreWell.length + 1)
    console.log(result)
    // if (drillingRef.current && drillingRef.current.resetForm) {
    //   drillingRef.current.resetForm();
    // } else {
    //   console.error("drillingRef or resetForm not available");
    // }
    // compressorRef.current.resetForm();
    // opUnitRef.current.resetForm();


  };


  // const handleGetData = () => {
  //   setIsGetDataClicked(true);
  //   setDisplayDates(true);
  //   setShowDateInput(false); // Hide the date input when Get Data button is clicked


  // };

  const handleGetCreatedAtData = async (createdAt) => {
    console.log("Created AT", createdAt);
    setBorewellCount(createdAt)
    try {
      const result = await api.post(`/getBorewellDprByCreatedAt`, {
        projectName: projectName,
        gpName: gpName,
        createdAt
      });
      console.log("DATA ATAT", result);

      const data = result.data.data;
      console.log("rgsdgs", data)

      const createdAtFormatted = moment(createdAt).format('YYYY-MM-DD HH:mm:ss');
      console.log("createdAtFormatted AT", createdAtFormatted);
      let filteredBorewellDpr = data.latestDpr
      // const filteredBorewellDpr = data.pipeDpr?.borewellDpr?.find(item => {
      //   const dprDetailsCreatedAt = item?.dprDetails?.createdAt;

      //   if (dprDetailsCreatedAt) {
      //     const dprDetailsCreatedAtFormatted = moment(dprDetailsCreatedAt).format('YYYY-MM-DD HH:mm:ss');
      //     console.log("dprDetailsCreatedAtFormatted AT", dprDetailsCreatedAtFormatted);

      //     return dprDetailsCreatedAtFormatted === createdAtFormatted;
      //   }

      //   return false;
      // });
      // const filteredBorewellDpr = data.pipeDpr?.borewellDpr[0].dprDetails
      // console.log("DATA FILTERED", filteredBorewellDpr);
      // console.log("1", filteredBorewellDpr.dprDetails)
      // console.log("2", filteredBorewellDpr.dprDetails.drillingDates && filteredBorewellDpr.dprDetails.drillingDates.slice(-1)[0]?.typeOfDate === 'End Date')
      // console.log("3", filteredBorewellDpr.dprDetails.drillingDates)

      // if (!filteredBorewellDpr) {
      //   console.error("No data found for the selected date");
      //   return;
      // }
      setDprId(filteredBorewellDpr.dprDetails._id);

      // setPreviousBorewellDpr(filteredBorewellDpr)

      setBorewell({
        loweringVendorName: result.data.data.pipeDpr?.loweringVendorName || 'Default Vendor',
        compressorVendorName: result.data.data.pipeDpr?.compressorVendorName || 'Default Vendor',
        gravellingVendorName: result.data.data.pipeDpr?.gravellingVendorName || 'Default Vendor',
        opUnitVendorName: result.data.data.pipeDpr?.opUnitVendorName || 'Default Vendor',
        drillingVendorName: result.data.data.pipeDpr?.drillingVendorName || 'Default Vendor',
      });

      const drillingEndDate = (filteredBorewellDpr.dprDetails.drillingDates || []).slice().reverse().find(date => date.typeOfDate === 'End Date')?.workingDate;
      const formattedDrillingEndDate = drillingEndDate ? moment(drillingEndDate).format('YYYY-MM-DD') : null;

      setDrillingEndDate(formattedDrillingEndDate);
      setCompressorEndDate(filteredBorewellDpr.dprDetails.compressorDates && filteredBorewellDpr.dprDetails.compressorDates.slice(-1)[0]?.typeOfDate === 'End Date');
      setOpUnitEndDate(filteredBorewellDpr.dprDetails.opUnitDates && filteredBorewellDpr.dprDetails.opUnitDates.slice(-1)[0]?.typeOfDate === 'End Date');
      setLoweringDone(filteredBorewellDpr.dprDetails.loweringDate && filteredBorewellDpr.dprDetails.loweringDate ? true : false);
      setGravellingDone(filteredBorewellDpr.dprDetails.gravellingDate && filteredBorewellDpr.dprDetails.gravellingDate ? true : false);
      setLoweringDate(filteredBorewellDpr.dprDetails.loweringDate && filteredBorewellDpr.dprDetails.loweringDate);
      setLoweringDepth(filteredBorewellDpr.dprDetails.loweringDepth && filteredBorewellDpr.dprDetails.loweringDepth);
      setGravelPackingDate(filteredBorewellDpr.dprDetails.gravellingDate && filteredBorewellDpr.dprDetails.gravellingDate);
      setGravelPackagingQty(filteredBorewellDpr.dprDetails.gravelPackagingQty && filteredBorewellDpr.dprDetails.gravelPackagingQty);
      setLatestDpr(filteredBorewellDpr.dprDetails && filteredBorewellDpr.dprDetails);
      // console.log("DPR",result.data.data.latestDpr);

      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error fetching data for createdAt:', error);
    }
  };


  return (
    <>
      {loadingVendorStatus ? (
        // Show loading spinner or message while checking vendor status
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
        </div>
      ) : (

        <>
          {isDrillingVendorAllocated && (
            <>
              {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                  <Spinner animation="border" role="status">
                    <span className="sr-only"></span>
                  </Spinner>
                </div>
              ) : (
                ""
              )}



              <div className="d-flex justify-content-center mt-3">
                {/* <button
                  className="btn btn-secondary mx-2"
                  type="button"
                  onClick={handleNewEntry}
                  title="Press This 'New Entry' Button To Generate New Entry When Below Form is Already Filled"
                  >
                  New Entry
                </button>
                     */}

                {/* <button
                  className="btn btn-primary mx-2"
                  type="button"
                  title="Press This 'Get Data' Button To Get Latest Borewell Data Which Is Filled Latest"

                  onClick={handleGetData}
                >
                  Get Data
                </button> */}
              </div>
              <div className="d-flex justify-content-center mt-3">
                {previousBorewellDpr && <BorewellDprModal previousBorewellDpr={previousBorewellDpr} />}
              </div>


              {/* {displayDates && allCreatedAtDates.length > 0 && (
                <div className="date-buttons-container mt-5">
                  {allCreatedAtDates.map((createdAt, index) => (
                    <button
                      key={index}
                      className="btn btn-secondary date-button  mb-3"
                      style={{ backgroundColor: "blue", marginRight: "15px" }}
                      onClick={() => handleGetCreatedAtData(createdAt)}
                    >
                      {moment(createdAt).format('YYYY-MM-DD HH:mm:ss')}
                    </button>
                  ))}
                </div>
              )} */}
              {displayDates && totalBoreWell.length > 0 && (
                <div className="date-buttons-container mt-5">
                  {totalBoreWell.map((count, index) => (
                    <button
                      key={index}
                      className="btn btn-secondary date-button  mb-3"
                      style={{ backgroundColor: "blue", marginRight: "15px" }}
                      onClick={() => handleGetCreatedAtData(count)}
                    >
                      {`Borewell ${count}`}
                    </button>
                  ))}
                </div>
              )}
              <form onSubmit={handleParentSubmit} >



                {showDateInput && (
                  <div className="col-md-4">
                    <label htmlFor="todaysDate" title="Select Date Of Dpr Filling">Date Of Dpr</label>
                    <input
                      name='todaysDate'
                      type='date'
                      required
                      className='form-control'
                      value={todaysDate}
                      onChange={(e) => setTodaysDate(e.target.value)}
                    />
                  </div>
                )}
                <label>Borewell Number</label>
                <input className="form-input"
                  value={`Borewell ${borewellCount}`}
                />


                <Drilling
                  ref={drillingRef}
                  latestDpr={latestDpr}
                  projectName={projectName}
                  gpName={gpName}
                  drillingVendorName={borewell.drillingVendorName}
                />

                {
                  drillingEndDate

                  &&
                  <div className="row">
                    <div className="col-md-6">
                      <label title="Select Date Of Lowering">Lowering</label>
                      <input
                        className="form-control"
                        type="date"
                        required
                        disabled={loweringDone}
                        value={loweringDate ? moment(loweringDate).format('YYYY-MM-DD') : ''}
                        onChange={(e) => setLoweringDate(e.target.value)}
                      />
                    </div>
                    {loweringDone ? (
                      <div className="col-md-6">
                        <label title="Enter Depth Of Lowering">Lowering Depth</label>
                        <input
                          className="form-control"
                          type="text"
                          value={loweringDepth + " Meter"}
                          readOnly // Use readOnly instead of disabled for a non-editable text field
                        />
                      </div>
                    ) : (
                      <div className="col-md-6">
                        <label title="Enter Depth Of Lowering">Lowering Depth</label>
                        <input
                          className="form-control"
                          type="tel"
                          required
                          value={loweringDepth}
                          onChange={(e) => setLoweringDepth(e.target.value)}
                        />
                      </div>
                    )}


                  </div>
                }

                {
                  loweringDone
                  &&
                  <div className="row">
                    <div className="col-md-12">
                      <label title="Select Date Of Gravel Packing">Gravel Packing</label>
                      <input className="form-control"
                        type="date"
                        required
                        disabled={gravellingDone}
                        value={gravellingDate ? moment(gravellingDate).format('YYYY-MM-DD') : ''}
                        onChange={(e) => setGravelPackingDate(e.target.value)}
                      />
                    </div>

                    {/* <div className="col-md-6">
                    <label title="Enter Gravel Packaging Qty">Gravel Packaging Quantity</label>
                    <input
                      className="form-control"
                      type="tel"
                      required
                      disabled={gravellingDone}
                      value={gravelPackagingQty}
                      onChange={(e) => setGravelPackagingQty(e.target.value)}
                    />
                    </div> */}

                  </div>
                }

                {
                  gravellingDone

                  &&
                  <Compressor
                    ref={compressorRef}
                    latestDpr={latestDpr}
                    projectName={projectName}
                    gpName={gpName}
                    compressorVendorName={borewell.compressorVendorName}
                  />
                }
                {
                  compressorEndDate

                  &&
                  <OpUnit
                    ref={opUnitRef}
                    latestDpr={latestDpr}
                    projectName={projectName}
                    gpName={gpName}
                    opUnitVendorName={borewell.opUnitVendorName}
                  />
                }

                <label>Remarks</label>
                <input
                  className="form-control"
                  type="text"
                  onChange={(e) => setRemarks(e.target.value)}
                  required  // Add the required attribute
                />


                <div className="d-flex justify-content-center">
                  <button title="Click To Submit" className="btn btn-primary mt-3" type="submit" disabled={opUnitEndDate}>
                    Submit
                  </button>

                </div>

              </form >


              {
                !showForm && (
                  <div>
                    {/* Render any additional UI or messages when the form is not shown */}
                  </div>
                )
              }
            </>
          )}
          {!isDrillingVendorAllocated && (
            <div className="alert alert-warning mt-3">
              No drilling vendor allocated. Please allocate a vendor first.
            </div>
          )}

        </>
      )
      }



    </>
  )
}
