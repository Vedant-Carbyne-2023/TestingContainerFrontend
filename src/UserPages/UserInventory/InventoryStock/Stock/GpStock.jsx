import React, { useEffect, useState } from "react";
import {
  role,
  userId,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetUserProject from "../../../../CommonUtitlites/customHooks/useGetUserProject";
import useGetAllInventoryProducts from "../../../../CommonUtitlites/customHooks/useInventoryProducts";
import Loader from "../../../../CommonUtitlites/Loader/Loader";
import useInventoryProjectWise from "../../../../CommonUtitlites/customHooks/useInventoryProjectWise";

export default function GpWiseStock({ projectId, status }) {

  // const {products,loading} = useInventoryProjectWise(projectId, status);
  const [loading, setLoading] = useState(false)
  const [gps, setGps] = useState([])
  const [selectedGp, setSelectedGp] = useState({})
  // console.log(projectId)
  useEffect(() => {
    const getProject = async () => {
      // console.log("Here 123" )
      if (projectId != "false" && projectId !== 'Select Project') {
        let result = api.post(`/single-project?id=${projectId}`, { userId, role, projectId })
        result = await errorHandler(result)
        // console.log(result)
        setGps(result.data.data.project.gpName)
      }
    }
    if (projectId && projectId !== 'false' && projectId !== 'Select Project') { getProject() }
    else if (projectId == 'Select Project') {
      setGps([])
      setSelectedGp({})
      setProducts([])
    }
  }, [projectId])

  const [products, setProducts] = useState([])
  const handleGetInventoryForGP = async (data) => {
    setLoading(true)
    setProducts([])
    // return;
    let result = api.post('/get-all-items', { userId, role, projectId, gpId: data.id })
    result = await errorHandler(result)
    // console.log(result)
    setProducts(result.data.data)
    setLoading(false)
  }



  return (

    <div className="container p-0 mt-3">

      <div className="container">
        {
          gps.length > 0 &&

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <SearchInput
              id={"gp"}
              items={gps}
              placeholder={"Select Gp"}
              ResultOnClick={(data) => handleGetInventoryForGP(data)}
            />
          </div>

        }
      </div>



      {loading ? <Loader /> : <div className="table-responsive mt-4 ">
        <table className="table table-bordered table-hover">
          <thead style={{ backgroundColor: "#cedfe5" }} className=" sticky-thead">
            <tr>
              <th style={{ borderColor: "black" }}>Items Category</th>
              <th style={{ borderColor: "black" }}>Items SubCategory</th>
              <th style={{ borderColor: "black" }}>Items Description</th>
              <th style={{ borderColor: "black" }}>BOQ Quantity</th>
              <th style={{ borderColor: "black" }}>Received Quantity</th>
              <th style={{ borderColor: "black" }}>Wasted Quantity</th>
              <th style={{ borderColor: "black" }}>Consumed Quantity</th>
              <th style={{ borderColor: "black" }}>Disputed Quantity</th>
              <th style={{ borderColor: "black" }}>Remaining Quantity</th>
              {/* <th>Unit Of Measurement</th> */}
              {/* <th>Return To Store Quantity</th> */}
            </tr>
          </thead>
          <tbody className="scrollable-tbody">
            {products &&
              products.map((item, key) => {
                if (item.boqQty !== 0) {
                  return (
                    <tr key={key}>
                      <td style={{ borderColor: "black" }}>{item.materialCategory}</td>
                      <td style={{ borderColor: "black" }}>{item.materialSubCategory}</td>
                      <td style={{ borderColor: "black" }}>{item.materialDescription}</td>
                      <td style={{ borderColor: "black" }}>{item.boqQty}</td>
                      <td style={{ borderColor: "black" }}>{item.quantity}</td>
                      <td style={{ borderColor: "black" }}>{item.wastedQuantity}</td>
                      <td style={{ borderColor: "black" }}>{item.consumedQuantity}</td>
                      <td style={{ borderColor: "black" }}>{item.disruptedQuantity}</td>
                      <td style={{ borderColor: "black" }}>{item.quantity - item.disruptedQuantity - item.wastedQuantity  - item.consumedQuantity}</td>
                      {/* <td>{item.materialCode}</td> */}
                    </tr>
                  );
                }
                return null;
              })}
          </tbody>
        </table>

      </div>
      }
    </div>
  );
}
