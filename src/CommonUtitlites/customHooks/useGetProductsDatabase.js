import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetProductDatabase = (status) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(userId, role);
    // console.log('right place');
    const fetchCategoryData = async () => {
      try {
        let response =  api.post('/get-products',{userId, role, userName});
        response= await errorHandler(response)
        console.log('response came: ',response);
        setProducts(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category data:', error);
        alert(error.message);
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [status]);

  return {products,loading};
};

export default useGetProductDatabase;
