import React, { useState } from "react";

import useCategoryData from "../../../../CommonUtitlites/customHooks/useGetCategory";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import {
  role,
  userId,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import EditableTable from "./EditableTable/EditableTable";
import Loader from "../../../../CommonUtitlites/Loader/Loader";
import Swal from 'sweetalert2';

export default function AddInventory({ projectId }) {
  // const projects = useGetUserProject();

  let categories = useCategoryData();
  const [categoryId, setCategoryId] = useState("");

  const [subCategoryId, setSubCategoryId] = useState("");
  const [loading, setLoading] = useState(false);


  //console.log(products)
  const [tableData, setTableData] = useState([]);

  // const [selectedProject, setSelectedProject] = useState({});

  const handleNewItem = async (e) => {
    e.preventDefault();
    let data = {};

    data.projectId = projectId;

    if (!data.projectId || data.projectId === null) {
      alert("No Project Selected");
    }
    setLoading(true);
    data.tableData = tableData;

    data.userId = userId;
    data.role = role;
    data.userName = userName;
    // console.log(data)
    // return;
    let res = api.post("/create-item", data);
    res = await errorHandler(res);
    Swal.fire(res.data.message);
    // alert(res.data.message);
    setLoading(false);
  };

  //console.log(projects)

  // console.log(tableData);

  return (
    <>
    { loading?<Loader/>:<div>
      {projectId ? (
        <form onSubmit={(e) => handleNewItem(e)}>
          <EditableTable tableData={(data) => setTableData(data)} />

          <div>
            <button type="submit" className="btn d-flex mx-auto mt-3">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <h6>"Project Not Selected"</h6>
      )}
    </div>
    }
    </>
  );
}
