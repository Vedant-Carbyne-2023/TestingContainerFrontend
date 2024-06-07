import React, { useEffect, useState } from 'react'
import { api } from '../../CommonUtitlites/AxiosSetup/axiosDefault';
import Swal from 'sweetalert2';
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import {userId,role, userName} from '../../CommonUtitlites/Others/commonExportVariable'

import styles from './AddRoles.module.css'; // Import the module CSS


export default function AddRoles() {

 
  


    
  const componentsWithPermissions = [
    {
      "nameOfComponent": "Organisation",
      "typeOfPermissions": [{"permission": "show", "value": false}]
    },
    {
      "nameOfComponent": "Member",
      "typeOfPermissions": [
        {"permission": "delete", "value": false},
        {"permission": "add", "value": false},
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "Project",
      "typeOfPermissions": [
        {"permission": "edit", "value": false},
        {"permission": "show", "value": false},
        {"permission": "add", "value": false}
      ]
    },
    {
      "nameOfComponent": "Material Requistion",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false},
        {"permission": "approve", "value": false},
        {"permission": "recommend", "value": false}
      ]
    },
    {
      "nameOfComponent": "Purchase Requistion",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false},
        {"permission": "approve", "value": false},
        // {"permission": "recommend", "value": false}
      ]
    },
    {
      "nameOfComponent": "Return To Store",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false}
      ]
    },

    {
      "nameOfComponent": "Material Issue Note",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "Material Reciept Note",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "BOQ",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false},
        {"permission": "update", "value": false}
      ]
    },  
    {
      "nameOfComponent": "Work Order",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "amend", "value": false},
        {"permission": "show", "value": false}
      ]
    },  
    {
      "nameOfComponent": "Material Transfer Order",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "Inventory Stock Report",
      "typeOfPermissions": [
        {"permission": "show", "value": false}
      ]
    },

    {
      "nameOfComponent": "Purchase Quotation",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "Comparision Statement",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Purchase Order",
      "typeOfPermissions": [
        {"permission": "add", "value": false},
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Vendor Form",
      "typeOfPermissions": [
        {"permission": "edit", "value": false},
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "delete", "value": false}
      ]
    },
    {
      "nameOfComponent": "Contractor Form",
      "typeOfPermissions": [
        {"permission": "edit", "value": false},
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "delete", "value": false}
      ]
    },
    {
      "nameOfComponent": "Stock Report",
      "typeOfPermissions": [
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "Location Database",
      "typeOfPermissions": [
        {"permission": "edit", "value": false},
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "delete", "value": false}
      ]
    },
    {
      "nameOfComponent": "Material Database",
      "typeOfPermissions": [
        {"permission": "edit", "value": false},
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "delete", "value": false}
      ]
    },
    {
      "nameOfComponent": "GRN",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
        {"permission": "add", "value": false}
      ]
    },
    {
      "nameOfComponent": "JMR_Hydrotest",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "edit", "value": false}
      ]
    },
    {
      "nameOfComponent": "JMR_Supply",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "edit", "value": false}
      ]
    },
    {
      "nameOfComponent": "Operational_BOQ",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
        {"permission": "edit", "value": false}
      ]
    },
    {
      "nameOfComponent": "Dpr_Main_Form",
      "typeOfPermissions": [
        {"permission": "show", "value": false}
      ]
    },
    {
      "nameOfComponent": "Dpr_Vendor_Page",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
        {"permission": "add", "value": false},
      ]
    },
    {
      "nameOfComponent": "Dpr_Change_Request",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Dpr_Gp_Approval_Status",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Dpr_Excel_Download",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Dpr_Mis_Report",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Dpr_Daily_Report",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
      ]
    },
    {
      "nameOfComponent": "Dpr_Consolidate_Report",
      "typeOfPermissions": [
        {"permission": "show", "value": false},
      ]
    },

  ];
  
  const [roles, setRoles] = useState([])
  const [status, setStatus] = useState(false)

  useEffect(() => {
    const getRoles = async() =>{
      let result = api.post("/get-all-roles",{userId, role, userName})
      result= await errorHandler(result)
      setRoles(result.data.data)
      console.log(result)
    }
    getRoles()
  }, [status])
  // Define the permission options
  const [nameOfRole, setRole] = useState('');

  const [permissionsData, setPermissionsData] = useState(
    componentsWithPermissions.map((component) => ({
      nameOfComponent: component.nameOfComponent,
      typeOfPermissions: component.typeOfPermissions.map(permission => ({
        permission: permission.permission,
        value: permission.value,
      })),
    }))
  );

  const handlePermissionChange = (componentIndex, permissionIndex) => {
    setPermissionsData((prevData) => {
      const newData = prevData.map((component, index) => {
        if (index === componentIndex) {
          const updatedPermissions = [...component.typeOfPermissions];
          updatedPermissions[permissionIndex] = {
            ...updatedPermissions[permissionIndex],
            value: !updatedPermissions[permissionIndex].value,
          };
          return { ...component, typeOfPermissions: updatedPermissions };
        }
        return component;
      });
      return newData;
    });
  };

  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  };
  
  const handleSetPermission = (roleId) => {
    if (roleId === "") {
      setPermissionsData(
        componentsWithPermissions.map((component) => ({
          nameOfComponent: component.nameOfComponent,
          typeOfPermissions: component.typeOfPermissions.map((permission) => ({
            permission: permission.permission,
            value: permission.value,
          })),
        }))
      );
      return;
    }
  
    let fetchedRolePermissions = roles.find((role) => role._id === roleId);
    console.log("ROLES", fetchedRolePermissions);
    setRole(fetchedRolePermissions.name);
  
    // Initialize permissionsData based on componentsWithPermissions
    const initializedPermissionsData = componentsWithPermissions.map((component) => {
      const rolePermission = fetchedRolePermissions.permissions.find(
        (permission) => permission.nameOfComponent === component.nameOfComponent
      );
      return {
        nameOfComponent: component.nameOfComponent,
        typeOfPermissions: component.typeOfPermissions.map((permission) => ({
          permission: permission.permission,
          value: rolePermission
            ? rolePermission.typeOfPermissions.find(
                (rolePermission) => rolePermission.permission === permission.permission
              ).value
            : false,
        })),
      };
    });
  
    setPermissionsData(initializedPermissionsData);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(permissionsData)
    // return;
    if(!nameOfRole || nameOfRole ==="") {
      Swal.fire({
        // timer: 2000,
        title: 'Invalid Input',
        text: "Please Select Role First Or Enter The Name Of Role",
        icon: 'info'
      });
      return; }

    try {
      const result = await api.post('/create-roles', {
        userId,
        role,
        userName,
        nameOfRole,
        permissionsData,
      });
      console.log(result.data.data);
      Swal.fire({
        // timer: 2000,
        title: 'Successfully',
        text: result.data.message,
        icon: 'success'
      });
      setStatus(!status)


    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred while creating the role.',
        icon: 'error',
        // timer: 3000,
      });
      setStatus(!status)
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
    <div className="row">
      <div className="col-md-6 mb-4">
          <h6>Role Name If Already Exists</h6>
          <select
            name="roleName"
            className='form-control'
            id="roleName"
            placeholder="Select Role Name"
            onChange={(e) => handleSetPermission(e.target.value)}
          >
               <option value={""}>Select Role If Already Exist</option>
            {
              roles.map(role =>
                <option value={role._id}>{role.name}</option>
                )
            }
            <option value={role._id}>{role.name}</option>
          </select>
        </div>

        <div className="col-md-6">
          <h6>Role Name</h6>
          <input
          className='form-control'
            name="roleName"
            id="roleName"
            placeholder="Enter Role Name"
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
        </div>

        
        <div className={styles.permissionsContainer}>
  {permissionsData.map((component, componentIndex) => (
    <div key={componentIndex} className={styles.permissionComponent}>
      <h6  className={styles.componentTitle}>{component.nameOfComponent}</h6>
      <div className={styles.permissionTypes}>
        {component.typeOfPermissions.map((permission, permissionIndex) => (
          <div key={permissionIndex} className={`${styles.permissionType} mt-2`}>
            <span className={styles.permissionTitle}>{toTitleCase(permission.permission)}</span>
            <input
              type="checkbox"
              checked={permission.value}
              onChange={() => handlePermissionChange(componentIndex, permissionIndex)}
            />
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}
