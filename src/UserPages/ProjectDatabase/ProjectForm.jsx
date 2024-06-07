import React, { useState, useRef, useEffect } from "react";
import AddBlock from "./AddBlock";
import AddStore from "./AddStore";
import ShowProjects from "./ShowProjects";
import useGetBlock from "../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../CommonUtitlites/customHooks/useGetGP";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Swal from "sweetalert2";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import AddGp from "./AddGp";
import AddLocation from "./AddLocation";
import useGetCompleteLocations from "../../CommonUtitlites/customHooks/useGetLocation";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";
import AddMultipleGp from "./AddMultipleGp";
const UserProjectForm = ({ compPermission }) => {
  let permission = useGetRolePermissionComponentWise(compPermission);
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const permissionObject = permission.map((item) => ({
      [item.permission]: item.value,
    }));
    setPermissions(permissionObject);
  }, [permission]);
  console.log(permissions);

  const [submit, setSubmit] = useState("");
  const Locations = useGetCompleteLocations(submit);

  const [location, setLocation] = useState({ id: "", name: "" });
  const [block, setBlock] = useState({ id: "", name: "" });
  const [gp, setGp] = useState({ id: "", name: "" });

  let Blocks = useGetBlock(location ? location.id : "", submit);
  let Gps = useGetGP(block ? block.id : "", submit);
  console.log(Blocks, "herer");

  // useEffect(() => {
  //   if(Blocks){console.log(Blocks)}
  //   if(Projects){console.log(project)}
  //   if(Gps){console.log(project)}
  // }, [project, Projects, Blocks, Gps, block, gp])
const [multipleGpModalOpen, setMultipleGpModalOpen] = useState(false)
  const [locationModalOpen, setlocationModalOpen] = useState(false);
  const [blockModalOpen, setblockModalOpen] = useState(false);
  const [gpModalOpen, setgpModalOpen] = useState(false);
  const [storeModalOpen, setstoreModalOpen] = useState(false);
  const callblockModal = () => {
    // console.log('is location',location);
    if (location.id === "" || location.name === "") {
      Swal.fire("Please Select Location first!");
    } else {
      setblockModalOpen(true);
    }
  };
  const callgpModal = () => {
    // console.log('is location and block: ',location, block);
    if (
      location.id === "" ||
      location.name === "" ||
      block.id === "" ||
      block.name === ""
    ) {
      Swal.fire("Please Select Location and Block first!");
    } else {
      setgpModalOpen(true);
    }
  };

  return (
    <>
      <div className="title">
        <span>Location (s)</span>
        {permissions.some((item) => item.add === true) && (
          <button
            onClick={() => setlocationModalOpen(true)}
            className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
          >
            Add Location
          </button>
        )}
        {permissions.some((item) => item.add === true) && (
          <button
            onClick={() => setstoreModalOpen(true)}
            className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
          >
            Add Store
          </button>
        )}
        {permissions.some((item) => item.add === true) && (
          <button
            onClick={() => setblockModalOpen(true)}
            className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
          >
            Add Block
          </button>
        )}
        {permissions.some((item) => item.add === true) && (
          <button
            onClick={() => setgpModalOpen(true)}
            className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
          >
            Add Gp
          </button>
        )}
        {permissions.some((item) => item.add === true) && (
          <button
            onClick={() => setMultipleGpModalOpen(true)}
            className="btn d-flex mx-auto mt-2 btn-primary btn-sm text-sm"
          >
            Add Multiple Gps
          </button>
        )}
      </div>
      <div className="container">
        <div className="d-flex"></div>

        <CustomModal
          isOpen={storeModalOpen}
          onClose={() => setstoreModalOpen(false)}
          title={"Add Store"}
        >
          {/* <SearchInput
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
        </button> */}

          <AddStore gpId={gp} setStatus={(status) => setSubmit(status)} />
        </CustomModal>

        <CustomModal
          isOpen={locationModalOpen}
          onClose={() => setlocationModalOpen(false)}
          title={"Add Location"}
        >
          <AddLocation setStatus={(status) => setSubmit(status)} />
        </CustomModal>


        <CustomModal
          isOpen={blockModalOpen}
          onClose={() => setblockModalOpen(false)}
          title={"Add Block"}
        >
          <SearchInput
            id={"locationName"}
            required={true}
            title={"Location Name"}
            items={Locations}
            placeholder={"Select Location Name"}
            ResultOnClick={(data) => setLocation(data)}
          />

          <AddBlock
            locationId={location ? location.id : ""}
            setStatus={(status) => setSubmit(status)}
          />
        </CustomModal>

        <CustomModal
          isOpen={gpModalOpen}
          onClose={() => setgpModalOpen(false)}
          title={"Add GP"}
        >
          <SearchInput
          required={true}
            id={"locationName"}
            title={"Location Name"}
            items={Locations}
            placeholder={"Select Location Name"}
            ResultOnClick={(data) => setLocation(data)}
          />

          <SearchInput
            id={"blockName"}
            required={true}
            title={"Block"}
            items={Blocks}
            placeholder={"Select Block Name"}
            ResultOnClick={(data) => setBlock(data)}
          />

          <AddGp blockId={block} setStatus={(status) => setSubmit(status)} />
        </CustomModal>

        <CustomModal
          isOpen={multipleGpModalOpen}
          onClose={() => setMultipleGpModalOpen(false)}
          title={"Add Multiple GP"}
        >
         

          <AddMultipleGp setStatus={(status) => setSubmit(status)} />
        </CustomModal>

        {/* Store Modal */}

        {permissions.some((item) => item.show === true) && (
          <ShowProjects status={submit} />
        )}
      </div>
    </>
  );
};

export default UserProjectForm;
