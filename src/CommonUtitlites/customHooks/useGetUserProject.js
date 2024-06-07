import { useEffect, useState } from 'react';
import { api } from '../AxiosSetup/axiosDefault';
import { errorHandler } from '../Others/errorHandle';
import {userId, role, userName} from '../Others/commonExportVariable'

const useGetUserProject = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
  

    const getAllProject = async () => {
      let result = await api.post("/user-project", { userId, role, userName });
      result = await errorHandler(result);
      // console.log(result.data)
      setProjects(result.data.data);
    };

    getAllProject();
  }, []); // Empty dependency array ensures the effect runs only once on component mount

  return  projects;
};

export default useGetUserProject;
