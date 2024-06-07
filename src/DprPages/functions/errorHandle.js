import Swal from "sweetalert2";

export async function errorHandler(func) {
    try {
      const result = await func;
      return result;
    }catch (error) {
      if(error.response){
        console.log(error.response)

        Swal.fire(
          {
            icon:"error",
            title:error.response.data.message,
            text:error.response.data.code,
          }
          )
 
      }
      else{
        console.log("Herre")
        Swal.fire(
          {
            icon:"error",
            title:error.message,
            // text:error.response.status,
          }
          )
        // alert(error.message)
      }
    }
  };
  