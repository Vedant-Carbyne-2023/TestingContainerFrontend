const getPR = async(e) =>{
    e.preventDefault();
    let formData = new FormData(e.target);
        // const email = formData.get("email");
        const projectName = formData.get("projectName");
        const projectCode = formData.get("projectCode");
        const agreementNo = formData.get("agreementNo");
        const deliveryDate = formData.get("deliveryDate");
        const miNumber = formData.get("miNumber");
        const miDate = formData.get("miDate");
        const date = formData.get("date");
        const storageLocation = formData.get("storageLocation");
        
        const client = formData.get("client");
        const employer = formData.get("employer");
        const deliveryAddress = formData.get("deliveryAddress");
        const makePreference = formData.get("makePreference");
        const qualityInstruction = formData.get("qualityInstruction");
        const inspectionInstruction = formData.get("inspectionInstruction");
        const documentsWithMaterial = formData.get("documentsWithMaterial");
    
        const materialDesc = formData.get("materialDesc");
        const unit = formData.get("unit");
        const quantity = formData.get("quantity");
        const remark = formData.get("remark");
        const remarks = formData.get("remarks");

      console.log(materialDesc, unit, quantity,remark)


        return {projectName, storageLocation, projectCode,date, agreementNo, deliveryDate, miNumber, miDate, client , employer,materialDesc,unit,quantity,remark,remarks,   deliveryAddress,makePreference,qualityInstruction, inspectionInstruction,  documentsWithMaterial}
    }
    export default getPR;
