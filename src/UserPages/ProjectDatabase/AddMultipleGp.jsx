import React, { useState } from "react";
import { formatTitle } from '../../CommonUtitlites/Others/formattingDateAndName';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import useGetCompleteLocations from "../../CommonUtitlites/customHooks/useGetLocation";
import useGetBlock from "../../CommonUtitlites/customHooks/useGetBlock";
import useGetGP from "../../CommonUtitlites/customHooks/useGetGP";
import SearchInput from "../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";

export default function AddMultipleGp({ setStatus }) {
  const [rows, setRows] = useState([{ locationId:"", blockId:"", gpName: "", schemeNo: "", longitude:"", latitude:"" }]);
  const [submit, setSubmit] = useState(false);
  const Locations = useGetCompleteLocations(submit);

  const [location, setLocation] = useState({ id: "", name: "" });
  const [block, setBlock] = useState({ id: "", name: "" });
  const [gp, setGp] = useState({ id: "", name: "" });

  const Blocks = useGetBlock(location ? location.id : "", submit);
  const Gps = useGetGP(block ? block.id : "", submit);

  const handleRowChange = async (index, field, value) => {
    const newRows = [...rows];

    if (field === 'locationId') {
      setLocation(value);
      setSubmit(!submit);
      newRows[index][field] = value.id;
    } else if (field === 'blockId') {
      setBlock(value);
      setSubmit(!submit);
      newRows[index][field] = value.id;
    } else {
      newRows[index][field] = value;
    }

    setRows(newRows);
  };

  const checkGpExists = async (gpName, schemeNo) => {
    const response = await Gps.filter(gp => gp.name == gpName && gp.schemeNo == schemeNo);
    console.log(response)
    return response.length > 0; // Adjust based on your actual API response
  };



  const handleAddRow = async () => {
    // Check if the previous row is completely filled before adding a new row
    const lastRow = rows[rows.length - 1];
    if (lastRow.locationId && lastRow.blockId && lastRow.gpName && lastRow.schemeNo) {
      const gpExists = await checkGpExists(lastRow.gpName , lastRow.schemeNo );
      if (gpExists) {
        alert("Error: GP name or scheme number already exists.");
        return; // Do not update state if the GP name or scheme number already exists
      }

      setRows([...rows, { locationId:"", blockId:"", gpName: "", schemeNo: "", longitude:"", latitude:"" }]);
    } else {
      alert("Please fill in the current row before adding a new one.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Assuming you want to send multiple rows at once, modify the API call accordingly
    const result = await Promise.all(
      rows.map(async (row) => {
        const { gpName, schemeNo } = row;
        const response = await api.post("/create-gp", { gpName, blockId: row.blockId, schemeNo, longitude:row.longitude,latitude: row.latitude });
        return errorHandler(response);
      })
    );

    // Assuming setStatus and alert should be called after all rows are processed
    const allResultsSuccessful = result.every((res) => res && res.data && res.data.data);
    if (allResultsSuccessful) {
      setStatus(result.length);
      alert("All GPs added successfully");
    } else {
      alert("Error adding GPs. Please check and try again.");
    }
  };

  return (
  
    <form onSubmit={handleSubmit}>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Location Name</th>
            <th>Block Name</th>
            <th>GP Name</th>
            <th>GP Scheme No</th>
            <th>GP Latitude</th>
            <th>GP Longitude</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td>
                <SearchInput
                  required={true}
                  id={`locationName-${index}`}
                  // title={"Location Name"}
                  items={Locations}
                  placeholder={"Select Location Name"}
                  ResultOnClick={(data) => handleRowChange(index, "locationId", data)}
                />
              </td>
              <td>
                <SearchInput
                  id={`blockName-${index}`}
                  required={true}
                  // title={"Block"}
                  items={Blocks}
                  placeholder={"Select Block Name"}
                  ResultOnClick={(data) => handleRowChange(index, "blockId", data)}
                />
              </td>
              <td>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter GP Name"
                  id={`gpName-${index}`}
                  name={`gpName-${index}`}
                  value={formatTitle(row.gpName)}
                  onChange={(e) => handleRowChange(index, "gpName", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter GP Scheme No"
                  id={`schemeNo-${index}`}
                  name={`schemeNo-${index}`}
                  value={row.schemeNo}
                  onChange={(e) => handleRowChange(index, "schemeNo", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter GP Latitude"
                  id={`latitude-${index}`}
                  name={`latitude-${index}`}
                  value={row.latitude}
                  onChange={(e) => handleRowChange(index, "latitude", e.target.value)}
                />
              </td>
              <td>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="Enter GP Longitude"
                  id={`longitude-${index}`}
                  name={`longitude-${index}`}
                  value={row.longitude}
                  onChange={(e) => handleRowChange(index, "longitude", e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-primary" type="button" onClick={handleAddRow}>
        Add GP
      </button>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
}
