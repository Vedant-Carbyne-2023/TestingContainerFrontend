import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'


const useGetRoleWithPermission = (status) => {
  const [data, setData] = useState([]);
  let fetched =false

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (role !== null && role !== undefined && role !== "SuperUser") {
          response = await api.post('/get-user-role', { userId, role, userName });
        } else {
          const roleFromStorage = localStorage.getItem('role');
          const userFromLocalStorage = localStorage.getItem('user_Id');
          if (roleFromStorage!=="SuperUser" && roleFromStorage!==undefined && roleFromStorage !== "") {
            response = await api.post('/get-user-role', { userId:userFromLocalStorage, role: roleFromStorage, userName });
            setData(roleFromStorage); // Update the role state
          } else {
            return;
          } }
        response = await errorHandler(response);
        if (response.data && response.data.data) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching roles data:', error);
        alert(error.message);
      }
    };

    const intervalId = setInterval(() => {
      if (role || localStorage.getItem('role')) {
        clearInterval(intervalId);
        if(!fetched)
        {
          fetchData();
          fetched=true
        }
      }
    }, 1000);

    if(role || localStorage.getItem('role')){
      if(!fetched){
        fetchData();
        fetched=true

      }
    }

    return () => clearInterval(intervalId);
  }, [status, role]);
  if(data){
    const truePermissionsWithComponent = data.flatMap((component) => {
      const truePermissions = component.typeOfPermissions.filter(
        (typeOfPermission) => typeOfPermission.value === true
      );
      return truePermissions.map((truePermission) => ({
        componentName: component.nameOfComponent,
        permission: truePermission.permission,
        value: truePermission.value,
      }));
    });

    localStorage.setItem('permissionSet',JSON.stringify(truePermissionsWithComponent))
  }
  return data;
};

export default useGetRoleWithPermission;
