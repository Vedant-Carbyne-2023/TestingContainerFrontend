import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetCompleteLocations = (result) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response =  api.post('/get-completeLocations',{userId, role, userName});
        response= await errorHandler(response)
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };

    fetchData();
  }, [result]);
  console.log(data)
  return data;
};

export default useGetCompleteLocations;
