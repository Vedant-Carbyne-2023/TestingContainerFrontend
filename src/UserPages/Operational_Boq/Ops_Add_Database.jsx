import React, { useState } from "react";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";
import { FaSearch } from "react-icons/fa";
import { role, userId } from "../../CommonUtitlites/Others/commonExportVariable";

export default function Ops_Add_Database() {
    const [formData, setFormData] = useState({
        indexCode: "",
        description: "",
        subDescription: "",
        wtd: "",
        uom: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };


  const handleSubmit = async (e) => {
    e.preventDefault();
    formData.userId=userId,
    formData.role=role


    let result = api.post("/create-update-operational-boq-database",formData);
    result = await errorHandler(result);
    console.log(result);
    Swal.fire({
      title: result.data.message,
      timer: 5000,
    });
  };

  const handleSearch = async () => {
    // Assuming you want to search based on the Index Number
    if (formData.indexCode) {
      const result = api.post(`/get-operational-boq-database-by-indexcode`,{indexCode:formData.indexCode});
      const searchData = await errorHandler(result);
      console.log(searchData)
      setFormData({
        indexCode:searchData.data.data.indexCode,
        description:searchData.data.data.description,
        subDescription:searchData.data.data.subDescription,
        wtd:searchData.data.data.wtd,
        uom:searchData.data.data.uom,
      })
    //   setSearchResult(searchData);
      // Handle the search result as needed
    }
  };
  return (
    <div>
      {" "}
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label>Index Number</label>
          <div className="input-group">
            <input
              className="form-control"
              name="indexCode"
              type="text"
              required={true}
              placeholder="Enter Index Number"
              value={formData.indexCode}
              onChange={(e)=>handleChange(e)}
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={handleSearch}
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className="form-group">
          <label>Boq Details</label>
          <textarea
            type="text"
            required="true"
            className="form-control"
            name="description"
            placeholder="Enter Boq Details"
            value={formData.description}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label>Sub Description (If Have)</label>
          <input
            type="text"
            // required="true"
            className="form-control"
            name="subDescription"
            placeholder="Enter Details"
            value={formData.subDescription}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        <div className="form-group">
          <label>WTD (in %) (If Have)  (For Example :  if 30%  then write 30 in input)</label>
          <input
            type="number"
            // required="true"
            className="form-control"
            name="wtd"
            placeholder="Enter WTD Details"
            value={formData.wtd}
            onChange={(e)=>handleChange(e)}
          />
        </div>
        {/* <div className='form-group'>
    <label>Other Details</label>
    <textarea
    type='text'
    // required="true"
    className='form-control'
    name='subDescription'
    placeholder='Enter Boq Other Details'
    />
    </div> */}
        <div className="form-group">
          <label>UOM</label>
          <input
            type="text"
            // required="true"
            className="form-control"
            name="uom"
            placeholder="Enter Uom Of Boq"
            value={formData.uom}
            onChange={(e)=>handleChange(e)}
          />
        </div>

        <button type="submit" className="mt-5 btn">
          Submit
        </button>
      </form>
    </div>
  );
}
