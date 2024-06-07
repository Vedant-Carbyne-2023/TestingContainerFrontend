import React, { useEffect, useState } from 'react';
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import {userId, role} from '../../CommonUtitlites/Others/commonExportVariable'
import { errorHandler } from '../../CommonUtitlites/Others/errorHandle';
import Swal from 'sweetalert2';
import useGetDateSchema from '../../CommonUtitlites/customHooks/useGetDateSchema';
function DateEnabled() {
let {backDate,futureDate,todayDate} = useGetDateSchema()


  const [options, setOptions] = useState({
    backDate: false,
    todayDate: false,
    futureDate: false,
  });

  useEffect(() => {
    setOptions({
        backDate:backDate,
        todayDate:todayDate,
        futureDate:futureDate,
    })
  }, [backDate,futureDate,todayDate])
  

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleSubmit = async()=>{
    let result = api.post('/crud-dateEnabled',{options, userId,role})
    result = await errorHandler(result)
    Swal.fire({
        timer:3000,
        title:result.data.message
    })
  }

  return (
    <div>
      <h1>Select Options</h1>
      <form>
        <label>
          <input
            type="checkbox"
            name="backDate"
            checked={options.backDate}
            onChange={handleCheckboxChange}
          />{' '}
          Back Date
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="todayDate"
            checked={options.todayDate}
            onChange={handleCheckboxChange}
          />{' '}
          Today Date
        </label>
        <br />
        <label>
          <input
            type="checkbox"
            name="futureDate"
            checked={options.futureDate}
            onChange={handleCheckboxChange}
          />{' '}
          Future Date
        </label>
        <br />
        <button type="button" onClick={handleSubmit}>
        {/* <button type="button"> */}
          Submit
        </button>
      </form>
    </div>
  );
}

export default DateEnabled;
