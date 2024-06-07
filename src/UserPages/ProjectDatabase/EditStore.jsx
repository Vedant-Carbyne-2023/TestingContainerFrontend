import React, { useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import Select from 'react-select';
import useGetCompleteLocations from "../../CommonUtitlites/customHooks/useGetLocation";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
export default function EditStore({setStatus }) {
  const [storeName, setStoreName] = useState("");
  let databaseProjects = useGetCompleteLocations(setStatus);
  const [selectedDBproject, setSelectedDBproject] = useState([]);
  const [gps, setGps] = useState([]);
  const [selectedGps, setSelectedGps] = useState([])
  const [locationName, setLocation] = useState({ id: "", name: "" });

  const [selectStore, setSelectStore] = useState({ id: "", name: "" })
  const [stores, setStores] = useState([])

  const handleSelectProject = (data) => {
    setLocation(data)
    console.log(data)
    const selectedProject = databaseProjects.find(
      (project) => project._id === data.id
    );
    setStores(selectedProject.stores)
    let gp = [];
    console.log(selectedProject)
    selectedProject.blocks.forEach((block) => {
      gp.push(...block.gps);
    });

    console.log(gp, "sada");

    setSelectedDBproject(data);
    setGps(gp);
  };

  const handleSelectStore = (data) => {
    setSelectStore(data)
    
    const selectedProject = databaseProjects.find(
      (project) => project._id === locationName.id
    );
    console.log(selectedProject)
    const matchingStore = selectedProject.stores.find((store) => store._id === data.id)
    console.log(matchingStore.gps)
    const options = matchingStore.gps.map((gpsItem) => ({
      value: gpsItem._id, // The 'value' property should contain the id
      label: gpsItem.name, // The 'label' property is what will be displayed in the dropdown
    }));
    setSelectedGps(options)

    // setSelectedDBproject(data);
    // setGps(gp);
  };
  console.log(selectedGps)

  const handleCheckboxChangeForGps = (updatedOptions) => {
    setSelectedGps(updatedOptions);
  };

  const options = gps.map((gpsItem) => ({
    value: gpsItem._id, // The 'value' property should contain the id
    label: gpsItem.name, // The 'label' property is what will be displayed in the dropdown
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    let gpsSelected = selectedGps.map(gp => gp.value);
    console.log(gpsSelected)
    let result = api.post("/edit-store", { storeName:selectStore.name,storeId:selectStore.id, gpIds: gpsSelected });
    result = await errorHandler(result);
    setStatus(result.data.data._id)
    alert(result.data.message);
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
        <div className="form-group">
        <SearchInput
            id={"locationName"}
            required={true}
            title={"Location Name"}
            items={databaseProjects}
            placeholder={"Select Location Name"}
            ResultOnClick={(data) => handleSelectProject(data)}
          />
      </div>
      <div className="form-group">
        <SearchInput
            id={"storeName"}
            required={true}
            title={"Store Name"}
            items={stores}
            placeholder={"Select Store Name"}
            ResultOnClick={(data) => handleSelectStore(data)}
          />
      </div>
      <div className="form-group">
        <label htmlFor="gpIds">GP Name</label>
        <Select
    isMulti
    options={options}
    value={selectedGps}
    onChange={handleCheckboxChangeForGps}
  />
      </div>
      <button className="btn  btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
