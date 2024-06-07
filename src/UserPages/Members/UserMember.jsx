import React, { useEffect, useState } from "react";
import styles from "./member.module.css";
import getData from "./getData";
import {
  role,
  userId,
} from "../../CommonUtitlites/Others/commonExportVariable";
import CustomModal from "../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../CommonUtitlites/Loader/Loader";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import EmailInputForm from "./AddEmails";
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";
export default function UserMember({compPermission}) {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [members, setMembers] = useState([]); // Declare members state
  const [projects, setProjects] = useState([]); // Declare projects state

  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const permissionObject = permission.map(item => ({
      [item.permission]: item.value
    }));
   setPermissions(permissionObject)

  }, [permission])
  
  console.log(permissions)

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        let membersData = await api.post("/all-users", { userId, role });
        membersData = await errorHandler(membersData);
        setMembers(membersData.data.data);
        
        let projectsData = await api.post('/all-project',{userId, role});
        projectsData = await errorHandler(projectsData);
        setProjects(projectsData.data.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert(error.message);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [update]);
  
  // setLoading(true);
  // let members = useGetAllMembersInDatabase(update);
  // console.log(members);


  // let projects = useGetAllProjectsForAdmin();
  // setLoading(false);

 

  const findProjects = (proj) => {
    const projectNames = proj.map((projectId) => {
      const project = projects.find((pro) => pro.id === projectId);
      return project ? project.name : "";
    });

    return projectNames.join(", ");
  };


  const handleDeleteMember = async(id) =>{
    
    let confirm = window.confirm('Are You Sure , You are deleting a Member')
    if(confirm){

      
      let result = api.post('/delete-members', {userId,role,memberId:id})
      result = await errorHandler(result)
      console.log(result)
      alert(result.data.message)
      setUpdate(!update)
    }
    else {
      return;
    }
  }

  const [modalOpen, setModalOpen] = useState(false)
  const [setRole, setRoleOfUser] = useState('')

  const [link, setLink] = useState('')

  const handleClick = () =>{
    console.log("here")
    setLink(`http://54.91.212.206:8080/role=${setRole}`)
  }

  const tableStyle = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '100%',
  };
  const cellStyle = {
    border: '1px solid black',
  
    padding: '8px',
    textAlign: 'center',
  };

  return (
    <>
      <div>
        <div className="title">
          <span>Member(s)</span>
          <div>
            {
              permissions.some(item => item.add===true)

              &&
            <button
              type="button"
              className="btn btn-sm btn-outline-primary"
              onClick={()=>setModalOpen(true)}
              style={{ borderColor: "navy", zIndex: "100" }}
              >
              <i class="fas fa-user-edit"></i>
              <b> &nbsp; Generate Registration Link</b>
            </button>
            }
          </div>
          {/* <div class="search-bar">
            <input type="text" class="form-control" placeholder="Search" />
            <div class="search-icon-container">
              <div class="search-icon">
                <div class="icon">
                  <i class="fas fa-search"></i>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        { loading?<Loader/>:(

permissions.some(item => item.show===true)

?
         <div
          className="container-fluid p-0 d-flex"
          style={{
            position: "sticky",
            top: "50rem",
            justifyContent: "center",
            alignItems: "center",
          }}
         >
          <div className="col ">
            <div className={styles.tableWrapper}>
              <table className="table" style={tableStyle}>
                <thead className="sticky-thead">
                  <tr>
                    <th style={cellStyle}>Member</th>
                    <th style={cellStyle}>Invitation Status</th>
                    {/* <th>Member Created At</th> */}
                    <th style={cellStyle}>Employee Role</th>
                    <th style={cellStyle}>Projects Alloted</th>
                    {
                        permissions.some(item => item.delete===true) &&
                    <th style={cellStyle}>Delete</th>
}
                  </tr>
                </thead>
                <tbody>
                  {members.length > 0 &&
                    members.map((mem, index) => (
                      <tr key={mem.id} style={{cursor:"initial"}}>
                        <td style={cellStyle}>
                          <>
                            <h6>{mem.name}</h6>
                            <span>{mem.email ? mem.email : ""}</span>
                            <p className="mb-0">
                              {mem.mobile ? mem.mobile : ""}
                            </p>
                          </>
                        </td>
                        <td style={cellStyle}>{mem.isVerified ? "Verified" : "Not Verified"}</td>
                        <td style={cellStyle}>{mem.role}</td>
                        <td style={cellStyle}>{findProjects(mem.projectsAssigned)}</td>
                       {
                        permissions.some(item => item.delete===true)
                        &&
                        <td id={mem.id} style={cellStyle} onClick={()=>handleDeleteMember(mem.id)}>
                          <i className="fas fa-trash-alt delete-icon"></i>
                        </td>
                        }
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        :
        <h4>
          <center>
        "You Are Not Authorized Please Contact Company"
        </center>
        </h4>
        )
        }


        <CustomModal
          isOpen={modalOpen}
          onClose={()=>setModalOpen(false)}
          title={"Generate Member Link Role Wise"}
          size={"large"}
        >

          <form >


            <div className="m-3 p-2">
              <label>Member Role</label>
              <select
                  type="text"
                  className="form-control"
                  id="role"
                  name="role"
                  placeholder="Enter Role"
                  onChange={(e)=>setRoleOfUser(e.target.value)}
                  required
                >
                  <option value="">Please Select Role</option>
                  <option value="SuperUser">Super Admin</option>
                  <option value="Admin">Admin</option>
                  <option value="Project On-Site Team">
                    Project On-Site Team
                  </option>
                  <option value="Project Manager">Project Manager</option>
                  <option value="Deputy Project Manager">
                    Deputy Project Manager
                  </option>
                  <option value="Store Manager">Store Manager</option>
                  <option value="Store Team Member">Store Team Member</option>
                </select>
            </div>


       
            <button
              type="button"
              className="btn"
              onClick={()=>handleClick()}
              style={{ display: "flex", marginLeft: "auto" }}
            >
              Generate The Link
            </button>

            {
              link &&
              <div>
             
              <h5 >{link}</h5>
              <EmailInputForm />
              </div>
            }
          </form>
        </CustomModal>
      </div>
    </>
  );
}
