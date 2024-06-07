import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetVendorsAndContractors = (status) => {
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        let array = [];
        let response = await api.post('/vendor/get-vendors', { userId, role, userName });
        response = await errorHandler(response);
        if (response.data && response.data.data) {
          array = array.concat(response.data.data);
        }
        let response1 = await api.post('/get-contractors', { userId, role, userName });
        response1 = await errorHandler(response1);
        if (response1.data.data) {
          array = array.concat(response1.data.data);
        }
        console.log(array);
        setData(array);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    fetchData();
  }, [status]);

  return data;
};

export default useGetVendorsAndContractors;
