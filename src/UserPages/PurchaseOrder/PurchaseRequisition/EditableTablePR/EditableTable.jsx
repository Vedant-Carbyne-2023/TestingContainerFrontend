import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import styles from "./EditableTable.module.css"; // Import the CSS module

import useSubCategoryData from "../../../../CommonUtitlites/customHooks/useGetSubCategory";
import useGetProductByCateOrSubData from "../../../../CommonUtitlites/customHooks/useGetProductsByCatOrSub";
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useCategoryData from "../../../../CommonUtitlites/customHooks/useGetCategory";
import useGetAllUom from "../../../../CommonUtitlites/customHooks/useGetAllUom";

const EditableTablePR = (props) => {
 


  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      quantity: "",
      quantity_balance: "",
      uom: "",
      remark: "",
    },
  ]);
  // const [show, setShow] = useState(false);


  useEffect(() => {
    new EditorJS({
      holder: "editorjs",
      tools: {
        table: {
          class: Table,
          inlineToolbar: true,
          config: {
            rows: 1,
            cols: 3,
            enableAddColumn: false,
            addRowButton: false,
          },
        },
      },
      data: {},
      minHeight: 0,
    });
  }, []);
  const unitOfMeasurement = useGetAllUom();


  return (
    <div className={styles.container}>
      <div id="editorjs">
        <div className={styles["table-wrapper"]}>
          <table className={`table ${styles.table_editable}`}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Material Category</th>
                <th>Material Sub Category</th>
                <th>Material Description</th>
                <th>Quantity</th>
                <th>Balance Quantity</th>
                <th>UOM</th>
                <th>Remark</th>
              </tr>
            </thead>
            <tbody>
              { 

              props.tableData &&
              props.tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>
                  <input
                      type="text"
                      required
                      disabled
                      className="form-control"
                      value={row.materialCategory}
                    />
                 
                  </td>
                  <td>
                  <input
                      type="text"
                      required
                      disabled
                      className="form-control"
                      value={row.materialSubCategory}
                    />
                 
                  </td>
                  <td>
                  <input
                      type="text"
                      required
                      disabled
                      className="form-control"
                      value={row.materialDescription}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      required
                      disabled
                      className="form-control"
                      value={row.quantity}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      required
                      disabled
                      className="form-control"
                      value={row.quantity_balance?row.quantity_balance:row.quantity}
                    />
                  </td>
                  <td>
                    <select
                      name="unit"
                      id="unit"
                      required
                      disabled
                      className="form-control"
                      style={{width:'fit-content'}}
                      value={row.uom}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                   {unitOfMeasurement &&
      unitOfMeasurement.map((uom, i) => (
        <option key={i} value={uom.name.toLowerCase()}>
          {uom.name.charAt(0).toUpperCase() + uom.name.slice(1)}
        </option>
      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.remark}
                      disabled
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles["row-wise-layout"]}>
        <h6 className="pt-1"> Add Materials</h6>
      </div>
      {props.tableData.map((row,index)=>
      <>
        <div className={styles["row-wise-layout"]}>
          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            S.No.
            <input
              type="number"
              className="form-control"
              value={row.sNo}
            />
         </div>
         <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialCategory">Material Category:</label>
            <input
                      type="text"
                      required
                      disabled
                      className="form-control"
                      value={row.materialCategory}
                    />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialSubCategory}
                 />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.materialDescription}
                 />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <input
                      type="number"
                      min={1}
                      required
                      disabled
                      className="form-control"
                      value={row.quantity}
                    />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity_balance">Balance Quantity:</label>
            <input
                      type="number"
                      min={1}
                      required
                      disabled
                      className="form-control"
                      value={row.quantity_balance?row.quantity_balance:row.quantity}
                    />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.uom}
                  />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">Remark:</label>
            <input
                  disabled
                    type="text"
                    className="form-control"
                    value={row.remark}
                  />
          </div>
         </div>
      </>
      )}

     
    </div>
    </div>
  );
};

export default EditableTablePR;
