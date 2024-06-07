import React, { useState, useRef, useEffect } from "react";
import AddBlock from "./AddBlock";
import AddStore from "./AddStore";
import ShowProjects from "./ShowProjects";
import useGetBlock from "../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../CommonUtitlites/customHooks/useGetGP";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import AddGp from "./AddGp";
import AddLocation from "./AddLocation";
import EditGp from "./EditGp";
import useGetCompleteLocations from "../../CommonUtitlites/customHooks/useGetLocation";
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import {userId, role, userName} from '../../CommonUtitlites/Others/commonExportVariable'
import Swal from "sweetalert2";
const ProjectForm = () => {
  const [submit, setSubmit] = useState("")
  const Locations = useGetCompleteLocations(submit);

  
  const [location, setLocation] = useState({ id: "", name: "" });
  const [block, setBlock] = useState({ id: "", name: "" });
  const [gp, setGp] = useState({ id: "", name: "" });

  let Blocks = useGetBlock(location?location.id:"", submit);
  let Gps = useGetGP(block?block.id:"", submit)
  console.log(Blocks,"herer")

  const [projects, setProjects] = useState([]);
  
  useEffect(() => {
    async function getProjects() {
      let result = api.post("/get-completeLocations", {userId,role, userName});
      result = await errorHandler(result);
      console.log('all locs',result)
      setProjects(result.data.data);
    }
    getProjects();
  }, [submit]);
  
  // useEffect(() => {
  //   if(Blocks){console.log(Blocks)}
  //   if(Projects){console.log(project)}
  //   if(Gps){console.log(project)}
  // }, [project, Projects, Blocks, Gps, block, gp])

  
  const [locationModalOpen, setlocationModalOpen] = useState(false);
  const [blockModalOpen, setblockModalOpen] = useState(false);
  const [gpModalOpen, setgpModalOpen] = useState(false);
  const [storeModalOpen, setstoreModalOpen] = useState(false);
  const [modalOpen3, setModalOpen3] = useState(false);
  const [modalOpen4, setModalOpen4] = useState(false);
  const [modalOpen5, setModalOpen5] = useState(false);
  const callblockModal = () => {
    // console.log('is location',location);
    if(location.id===''||location.name===''){
      Swal.fire('Please Select Location first!');
    } else{
      setblockModalOpen(true);
    }
  }
  const callgpModal = () => {
    // console.log('is location and block: ',location, block);
    if(location.id===''||location.name===''||block.id===''||block.name===''){
      Swal.fire('Please Select Location and Block first!');
    } else{
      setgpModalOpen(true)
    }
  }

  const handleDeleteLocation = async (id) => {
    console.log('location id is:', id);
      const confirmDelete = window.confirm("Are you sure you want to delete this Location?");
      if (!confirmDelete) {
        // If the user cancels the deletion, do nothing
        return;
      }
      let result = await api.post('/delete-location', {locationId:id,userId,role, userName});
      result = await errorHandler(result);
      console.log(result);
      if(result&&result.data){
        // console.log('here',result.data.data._id);
        setSubmit(result.data.data._id);
      }
      // // alert(result.data.message);
      Swal.fire(result.data.message);
  }

  const handleDeleteBlocks = async (id) => {
    // console.log('block id is:', id, location.id);
    const confirmDelete = window.confirm("Are you sure you want to delete this Block?");
      if (!confirmDelete) {
        // If the user cancels the deletion, do nothing
        return;
      }
      let result = await api.post('/delete-block', {blockId:id, locationId:location.id,userId,role, userName});
      result = await errorHandler(result);
      console.log('block deleted',result);
      if(result&&result.data){
        // console.log('here',result.data.data._id);
        setSubmit(result.data.data._id);
      }
      // // alert(result.data.message);
      Swal.fire(result.data.message);
  }



  return (
    <>
    <div className="title">
          <span>Location (s)</span>
          <button
          onClick={() => setstoreModalOpen(true)}
          className="btn btn-sm d-flex mx-auto my-2"
        >
          Add Location
        </button>
        <button
        className="btn btn-sm d-flex mx-auto my-2"
        onClick={() => setModalOpen3(true)}
        >
          Delete Location
        </button>
        <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => {
            // setSubCategories([]); // Set subCategories state to an empty array
            setModalOpen4(true);
          }}
          >
          Delete Block
        </button>
        <button
          className="btn btn-sm d-flex mx-auto my-2"
          onClick={() => {
            // setSubCategories([]); // Set subCategories state to an empty array
            setModalOpen5(true);
          }}
          >
          Edit Gp
        </button>
          </div>
    <div className="container">
      <div className="d-flex">
     
      </div>


      <CustomModal
        isOpen={storeModalOpen}
        onClose={() => setstoreModalOpen(false)}
        title={"Add Store"}
      >
        <SearchInput
          id={"locationName"}
          title={"Location Name"}
          items={Locations}
          placeholder={"Select Location Name"}
          ResultOnClick={(data) => setLocation(data)}
        />

      <button
          onClick={() => setlocationModalOpen(true)}
          className="btn d-flex mx-auto "
        >
          Add Location
        </button>

        <SearchInput
          id={"blockName"}
          title={"Block"}
          items={Blocks}
          placeholder={"Select Block Name"}
          ResultOnClick={(data) => setBlock(data)}
        />

      <button
          onClick={callblockModal}
          className="btn d-flex mx-auto"
        >
          Add Block
        </button>


        <SearchInput
          id={"gpName"}
          title={"GP"}
          items={Gps}
          placeholder={"Select GP Name"}
          ResultOnClick={(data) => setGp(data)}
        />

      <button
          onClick={callgpModal}
          className="btn d-flex mx-auto"
        >
          Add GP
        </button>

       <AddStore gpId={gp} setStatus={(status)=>setSubmit(status)} />
    
      
      </CustomModal>


     <CustomModal
        isOpen={locationModalOpen}
        onClose={() => setlocationModalOpen(false)}
        title={"Add Location"}
      >
        <AddLocation setStatus={(status)=>setSubmit(status)}/>
      </CustomModal>

      <CustomModal
        isOpen={blockModalOpen}
        onClose={() => setblockModalOpen(false)}
        title={"Add Block"}
      >

      <label>Location Name</label>    
      <input
      className="form-control"
      value={location?location.name:""}
      placeholder="Location Name">
        </input>




        <AddBlock locationId={location?location.id:""} setStatus={(status)=>setSubmit(status)}/>

      </CustomModal>


      <CustomModal
        isOpen={gpModalOpen}
        onClose={() => setgpModalOpen(false)}
        title={"Add GP"}
      >
     
     <label>Location Name</label>    
      <input
      className="form-control"
      value={location?location.name:""}
      placeholder="Location Name">
        </input>


        <label>Block Name</label>    
      <input
      className="form-control"
      value={block?block.name:""}
      placeholder="Block Name">
        </input>




       <AddGp blockId={block} setStatus={(status)=>setSubmit(status)}/>

      </CustomModal> 
      <CustomModal
        isOpen={modalOpen3}
        onClose={() => setModalOpen3(false)}
        title={"Delete Location"}
        >
          <div className="container">
            {console.log('we have', projects)}
          {projects.map((category) => (
              <div key={category._id} className="d-flex align-items-center mb-2">
              <p className="me-2">{category.name}</p>
              <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteLocation(category._id)}>Delete</button>
              </div>
           ))}
          </div>
        </CustomModal>
        <CustomModal
        isOpen={modalOpen4}
        onClose={() => setModalOpen4(false)}
        title={"Delete Block"}
        >
          <div className="container">
          <SearchInput
          id={"locationName"}
          title={"Location Name"}
          items={Locations}
          placeholder={"Select Location Name"}
          ResultOnClick={(data) => setLocation(data)}
        />
            <h3>Associated Subcategories are: </h3>
          {(Blocks&&Blocks.length > 0) ? (
               Blocks.map((subcategory) => (
                 <div key={subcategory._id} className="d-flex align-items-center mb-2">
                    <p className="me-2">{subcategory.name}</p>
                    <button className="btn btn-sm btn-danger ms-2" onClick={() => handleDeleteBlocks(subcategory._id)}>Delete</button>
                 </div>
               ))
              ) : (
                <p>No SubCategories found.</p>
            )}
          </div>
        </CustomModal>
        {/* add Latitiude and Longitude */}
        <CustomModal
        isOpen={modalOpen5}
        onClose={() => setModalOpen5(false)}
        title={"Edit Gp"}
        >
          <div className="container">
          <SearchInput
          id={"locationName"}
          title={"Location Name"}
          items={Locations}
          placeholder={"Select Location Name"}
          ResultOnClick={(data) => setLocation(data)}
        />
        <SearchInput
          id={"blockName"}
          title={"Block"}
          items={Blocks}
          placeholder={"Select Block Name"}
          ResultOnClick={(data) => setBlock(data)}
        />
        <SearchInput
          id={"gpName"}
          title={"GP"}
          items={Gps}
          placeholder={"Select GP Name"}
          ResultOnClick={(data) => setGp(data)}
        />
        <EditGp gp={gp} setStatus={(status)=>setSubmit(status)}/>
          </div>
        </CustomModal>

      {/* Store Modal */}

      
      <ShowProjects status={submit} setStatus={setSubmit}/>
    </div>
    </>
  );
};

export default ProjectForm;
