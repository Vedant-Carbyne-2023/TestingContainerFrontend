// UserWorkOrder.js
import React, { useEffect, useState } from "react";
import AdminNavbar from "../../CommonUtitlites/AdminNavbar/AdminNavbarC";
import MiddleWareForPrintForWorkOrder from "./WorkOrderForm/WorkOrderFormFill/MiddleWareForPrint";
import WorkOrderTable from "./WorkOrderForm/WorkOrderTable/WorkOrderTable";
import SavedWorkOrderTable from "./WorkOrderForm/WorkOrderTable/SavedWorkOrderTable";
import styles from "./UserWorkOrder.module.css"; // Import the CSS module
import useGetRolePermissionComponentWise from "../../CommonUtitlites/customHooks/useGetPermissionComponentWise";

export default function UserWorkOrder({ compPermission }) {
  let permission = useGetRolePermissionComponentWise(compPermission)
  const [permissions, setPermissions] = useState([]);
  const [activeComponent, setActiveComponent] = useState("Show Work Orders");

  const determineActiveComponent = () => {
    const addPermission = permissions.some((item) => item.add === true);
    const showPermission = permissions.some((item) => item.show === true);

    if (addPermission) {
      return "Create Work Orders";
    } else if (showPermission) {
      return "Show Work Orders";
    } else {
      return ""; // Set the default value
    }
  };

  useEffect(() => {
    const permissionObject = permission.map((item) => ({
      [item.permission]: item.value,
    }));
    setPermissions(permissionObject);
  }, [permission]);

  useEffect(() => {
    if (permissions) {
      const initialActiveComponent = determineActiveComponent();
      setActiveComponent(initialActiveComponent);
    }
  }, [permissions]);

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <>
      <div className={styles.title}>
       
        {permissions.some((item) => item.show === true) && (
          <button
            className={`${styles.btn} ${
              activeComponent === "Saved Work Orders" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Saved Work Orders")}
          >
            Saved Work Order(s)
          </button>
        )}
        {permissions.some((item) => item.show === true) && (
          <button
            className={`${styles.btn} ${
              activeComponent === "Show Work Orders" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Show Work Orders")}
          >
            Show Work Order(s)
          </button>
        )}
        {permissions.some((item) => item.add === true) && (
          <button
            className={`${styles.btn} ${
              activeComponent === "Create Work Orders" ? styles.active : ""
            }`}
            onClick={() => handleButtonClick("Create Work Orders")}
          >
            Create Work Order(s)
          </button>
        )}
      </div>
      <hr className={styles.hr}/>

      {activeComponent === "Create Work Orders" ? (
        <MiddleWareForPrintForWorkOrder />
      ) : activeComponent === "Show Work Orders" ? (
        <div
          style={{
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <WorkOrderTable
            amend_permission={permissions.some((item) => item.amend === true)}
          />
        </div>
      ) : (
        <div
          style={{
            overflow: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SavedWorkOrderTable
            amend_permission={permissions.some((item) => item.amend === true)}
          />
        </div>
      )}
    </>
  );
}
