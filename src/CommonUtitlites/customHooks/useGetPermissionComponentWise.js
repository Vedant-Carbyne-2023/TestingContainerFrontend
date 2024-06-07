import React, { useState, useEffect } from "react";
import { api } from "../AxiosSetup/axiosDefault";
import { errorHandler } from "../Others/errorHandle";
import { userId, role, userName } from "../Others/commonExportVariable";

const useGetRolePermissionComponentWise = (string) => {
  console.log(string);
  const [data, setData] = useState([]);
  let havePermission = localStorage.getItem("permissionSet");

  useEffect(() => {
    const fetchData = async () => {
      try {
        let permissions = JSON.parse(havePermission);
        let separate = permissions.filter(
          (permission) => permission.componentName === string
        );
        setData(separate);
      } catch (error) {
        console.error("Error fetching roles data:", error);
        alert(error.message);
      }
    };

    if (havePermission) {
      fetchData();
    }
  }, [string, havePermission]);

  return data;
};

export default useGetRolePermissionComponentWise;
