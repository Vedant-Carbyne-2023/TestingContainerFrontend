import React, { useState, useEffect } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetProductByCateOrSubData = (categoryId,subCategoryId, status) => {
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        let response =  api.post('/get-product-categoryOrsubcategory',{categoryId,subCategoryId, userId, role, userName});
        response= await errorHandler(response)
        // console.log(response)
        setCategoryData(response.data.data);
      } catch (error) {
        // console.error('Error fetching category data:', error);
        alert(error.message)
      }
    };
    if(categoryId || subCategoryId){
      fetchCategoryData();
    }
  }, [categoryId,subCategoryId, status]);

  return categoryData;
};

export default useGetProductByCateOrSubData;
