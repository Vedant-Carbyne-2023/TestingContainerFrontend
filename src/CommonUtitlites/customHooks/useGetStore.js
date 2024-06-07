import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'
const useGetStores = (gpId) => {
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        let response =  api.post('/get-stores', {gpId, userId, role, userName});
        response= await errorHandler(response)
        console.log(response)
        if(response.data && response.data.data) setData(response.data.data.stores);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    if(gpId)fetchData();
  }, [gpId]);

  return data;
};

export default useGetStores;
