import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetApprovedMR_ProjectWise = (projectId) => {

  const [approvedIndent, setApprovedIndent] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {

    const fetchData = async () => {
      try {
        let response =  api.post('/get-approved-projectwise', { projectId, userId, role, userName })
        response= await errorHandler(response)
        console.log(response, "HEre")
        if(response.data && response.data.data) setApprovedIndent(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
        setLoading(false); // Set loading to false in case of error
      }
    };
    if(projectId!=null || projectId!=undefined)fetchData();
  }, [projectId]);
 
  return {approvedIndent,loading};
};

export default useGetApprovedMR_ProjectWise;
