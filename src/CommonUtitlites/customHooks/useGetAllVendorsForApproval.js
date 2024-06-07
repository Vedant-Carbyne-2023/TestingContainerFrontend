import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetVendorsForApproval = (status) => {
  const [data, setData] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
        let response =  api.post('/vendor/vendor-approval',{userId,role, userName})
        response= await errorHandler(response)
        console.log("DATA",response) 
        if(response.data && response.data) 
        setData(response.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    fetchData();
  }, [status]);

  return data;
};

export default useGetVendorsForApproval;
