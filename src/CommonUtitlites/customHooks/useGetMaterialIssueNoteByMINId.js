import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetMaterialIssueNoteByMINId = (minId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response =  api.post('/get-single-min',{minId:minId, userId, role, userName});
        response= await errorHandler(response)
        setData(response.data.tableData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
        setLoading(false); // Set loading to false in case of error
      }
    };

    if(minId)
    {
      fetchData();
    }
  }, [minId]);
  console.log(data)
  return {data,loading};
};

export default useGetMaterialIssueNoteByMINId;
