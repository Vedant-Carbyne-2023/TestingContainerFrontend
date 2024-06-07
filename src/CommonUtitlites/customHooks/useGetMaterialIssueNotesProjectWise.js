import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetMaterialIssueNotesProjectWise = (projectId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response =  api.post('/get-min-projectwise',{projectId:projectId, userId, role, userName});
        response= await errorHandler(response)
        setData(response.data.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
        setLoading(false); // Set loading to false in case of error
      }
    };

    fetchData();
  }, [projectId]);
  console.log(data)
  return {data, loading};
};

export default useGetMaterialIssueNotesProjectWise;
