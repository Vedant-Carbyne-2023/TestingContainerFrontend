import { useEffect, useState } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useInventoryProjectWise = (projectId, status) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading state to true

  useEffect(() => {

    async function getProducts() {
        let result = api.post("/get-allItems-projectWise", { projectId, userId, role, userName });
        result = await errorHandler(result);
        if (result != undefined) setProducts(result.data.data);
        console.log(result);
        setLoading(false); // Set loading to false after data is fetched  
      }
      if(projectId) getProducts();

  }, [projectId, status]); // Empty dependency array ensures the effect runs only once on component mount

  return {products,loading};
};

export default useInventoryProjectWise;
  