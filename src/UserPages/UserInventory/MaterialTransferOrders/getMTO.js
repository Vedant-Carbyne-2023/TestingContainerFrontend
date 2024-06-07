const getData = async(e) =>{
e.preventDefault();
console.log(e.target, "here")
let formData = new FormData(e.target);
    // const email = formData.get("email");
    const mtoDate = formData.get("mtoDate");
    const mtoDescription = formData.get("mtoDescription");
    const mtoUom = formData.get("mtoUom");
    const mtoQuantity = formData.get("mtoQuantity");
    const mtoRate = formData.get("mtoRate");
    const mtoAmount = formData.get("mtoAmount");
    const mtoContractorName = formData.get("mtoContractorName");
    const mtoGpName = formData.get("mtoGpName");
    const remark = formData.get("remark");
    const mtoNumber = formData.get("mtoNumber");

    // console.log(projectName, role)
    // return;
    return {mtoDate,mtoNumber, mtoDescription,mtoUom,mtoQuantity, mtoRate, mtoAmount, mtoContractorName, mtoGpName, remark}
   
}
export default getData;
