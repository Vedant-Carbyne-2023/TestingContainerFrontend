import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetDateSchema = (status) => {
  const [backDate, setBackDate] = useState(false);
  const [todayDate, setTodayDate] = useState(false);
  const [futureDate, setFutureDate] = useState(false);
  useEffect(() => {

    const fetchData = async () => {
      try {
        let response =  api.post('/get-dateEnabled', {userId,role})
        response= await errorHandler(response)
        console.log(response) 
        if(response.data && response.data.data) 
        {
          setBackDate(response.data.data.backDate);
          setTodayDate(response.data.data.currentDate);
          setFutureDate(response.data.data.futureDate);
        
        }
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    fetchData();
  }, [status]);

  return {backDate,futureDate,todayDate};
};

export default useGetDateSchema;
