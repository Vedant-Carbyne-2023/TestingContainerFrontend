import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetProductData = (status) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    console.log(userId, role)
    const fetchCategoryData = async () => {
      try {
        let response =  api.post('/get-products',{userId, role, userName});
        response= await errorHandler(response)
        console.log(response)
        setCategoryData(response.data.data);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };

    fetchCategoryData();
  }, [status]);

  return categoryData;
};

export default useGetProductData;
