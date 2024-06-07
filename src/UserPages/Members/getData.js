const getData = async(e) =>{
e.preventDefault();
console.log(e.target, "here")
let formData = new FormData(e.target);
    // const email = formData.get("email");
    const id = formData.get("empName");
    const projectName = formData.get("projectId");
    const role = formData.get("role");

    // console.log(projectName, role)
    // return;
    const projectAndRole = {projectId:projectName, role:role}
    return {id, projectAndRole}

}
export default getData;
