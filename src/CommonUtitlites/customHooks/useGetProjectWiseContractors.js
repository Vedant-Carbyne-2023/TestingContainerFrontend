import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetContractorsProjectWise = (id) => {
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        let response =  api.post('/get-contractors-projectWise', {projectId:id, userId,role, userName})
        response= await errorHandler(response)
        console.log(response) 
        if(response.data && response.data.data) 
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    if(id)
    {
      console.log("here", id)
      fetchData();
    }
  }, [id]);

  return data;
};

export default useGetContractorsProjectWise;
