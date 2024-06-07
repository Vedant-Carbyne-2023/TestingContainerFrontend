const getMR = async(e) =>{
    e.preventDefault();
    console.log(e.target, "here")
    let formData = new FormData(e.target);
        // const email = formData.get("email");
        const project = formData.get("project");
        const projectId = formData.get("projectId");
        const store = formData.get("store");
        const block = formData.get("block");
        const gp = formData.get("gp");
        const vendor = formData.get("vendor");
        const date = formData.get("date");
        const projectCode = formData.get("projectCode");
        const indentId = formData.get("indentId");
        
        // const inventoryCategory = formData.get("inventory_category");
        const inventoryCategory = "Null";
        const itemName = "Null";
        // const itemName = formData.get("itemName");
        const issue_till_date_from = formData.get("issue_till_date_from");
        const issue_till_date_to = formData.get("issue_till_date_to");
        const material_reposed = formData.get("material_reposed");
        const material_pending = formData.get("material_pending");
        const material_inventory = formData.get("material_inventory");
        return {project,indentId,projectCode,vendor, store, block, gp, date, inventoryCategory, itemName, projectId}
    }
    export default getMR;
