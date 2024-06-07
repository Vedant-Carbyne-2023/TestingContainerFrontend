import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import useCategoryData from "../../../../CommonUtitlites/customHooks/useGetCategory";
import useSubCategoryData from "../../../../CommonUtitlites/customHooks/useGetSubCategory";
import useProductByCateOrSubData from "../../../../CommonUtitlites/customHooks/useGetProductsByCatOrSub";
import SearchInputCategory from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInputCategory";
import styles from "./EditableTable.module.css"; // Import the CSS module
import useGetAllUom from "../../../../CommonUtitlites/customHooks/useGetAllUom";

const EditableTable = (props) => {
  let categories = useCategoryData();
  const [categoryId, setCategoryId] = useState("");

  let subCategories = useSubCategoryData(categoryId);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [status, setStatus] = useState("");

  let products = useProductByCateOrSubData(categoryId, subCategoryId);
  const unitOfMeasurement = useGetAllUom(status);

  console.log(products);

  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      quantity: "",
      uom: "",
      remark: "",
    },
  ]);
  const [show, setShow] = useState(false);
  const [disableAddRow, setDisableAddRow] = useState(true);

  useEffect(() => {
    // Check if any of the columns in the last row is empty
    const lastRow = tableData[tableData.length - 1];
    // const isLastRowEmpty = Object.values(lastRow).some((value) => value === "");
    const isLastRowEmpty = Object.keys(lastRow).some((key) => {
      // Exclude the "remark" field from the check
      if (key === "remark") {
        return false;
      }
      
      const value = lastRow[key];
      return value === "";
    });

    // Update the disable state of the "Add Material" button
    setDisableAddRow(isLastRowEmpty);
  }, [tableData]);

  const handleAddRow = () => {
    const newRow = {
      sNo: tableData.length + 1,
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      quantity: "",
      uom: "",
      remark: "",
    };

    setTableData([...tableData, newRow]);
    setDisableAddRow(true);
  };

  const handleDeleteRow = (index) => {
    if (
      !tableData ||
      !Array.isArray(tableData) ||
      index < 0 ||
      index >= tableData.length
    ) {
      console.log('Invalid tableData or index');
      return;
    }
  
    // Check if there's only one row left
    if (tableData.length === 1) {
      console.log('Cannot delete the only row');
      return;
    }
    console.log('before', tableData);
    const newData = tableData.filter((_, i) => i !== index); // Remove the row at the specified index
    console.log('after', newData);
    setTableData(newData.map((row, i) => ({ ...row, sNo: i + 1 }))); // Update sNo values
  }; 

  const handleCellChange = (data, rowIndex, columnName) => {
    if (columnName === "materialCategory") {
      setCategoryId(data.id);
    }
    if (columnName === "materialSubCategory") {
      setSubCategoryId(data.id);
    }
    const newData = [...tableData];
    newData[rowIndex][columnName] = data.name;
    setTableData(newData);
  };

  const handleCollectData = () => {
    props.tableData(tableData);
  };

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
                <th>UOM</th>
                <th>Remark</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>
                    <SearchInputCategory
                      items={categories}
                      id={"categoryDetails"}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialCategory")
                      }
                      className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
                  </td>
                  <td>
                    <SearchInputCategory
                      items={subCategories}
                      id={"subCategoryDetails"}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialSubCategory")
                      }
                      className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
                  </td>
                  <td>
                    <SearchInputCategory
                      items={products}
                      id={"productDetails"}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialDescription")
                      }
                      className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min={1}
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) =>
                        handleCellChange(e.target.value, index, "quantity")
                      }
                    />
                  </td>
                  <td>
                  <select
                      name="unit"
                      id="unit"
                      required
                      className="form-control"
                      disabled={row.disabled_uom}
                      value={row.uom}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                      <option value="">Select Options</option>
                      {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name.toLowerCase()}>{uom.name}</option>
                    ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={row.remark}
                      onChange={(e) =>
                        handleCellChange(e.target.value, index, "remark")
                      }
                    />
                  </td>
                  <td>
                    <button
                     type="button"
                     className={`btn btn-danger ${styles["delete-button"]}`}
                      onClick={() => handleDeleteRow(index)}
                    >
                      <i class="fa-solid fa-delete-left"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      <div className={styles["row-wise-layout"]}>
                  <h6 className="pt-1">  Add Materials</h6>

      </div>


        {tableData.map((row,index)=>
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

            <SearchInputCategory
              items={categories}
              id={"categoryDetails"}
              ResultOnClick={(data) => handleCellChange(data, index, "materialCategory") }
              className={`${styles["search-input"]} form-control`}
            />
          </div>


          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>

            <SearchInputCategory
              items={subCategories}
              id={"subCategoryDetails"}
              ResultOnClick={(data) =>
                handleCellChange(data, index, "materialSubCategory")
              }
              className={`${styles["search-input"]} form-control`}
            />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <SearchInputCategory
              items={products}
              id={"productDetails"}
              ResultOnClick={(data) =>
                handleCellChange(data, index, "materialDescription")
              }
              className={`${styles["search-input"]} form-control`}
            />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              min={1}
              className="form-control"
              value={row.quantity}
              onChange={(e) => handleCellChange(e.target.value, index, "quantity")}
            />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <select
                      name="unit"
                      id="unit"
                      required
                      className="form-control"
                      disabled={row.disabled_uom}
                      value={row.uom}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                      <option value="">Select Options</option>
                      {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name.toLowerCase()}>{uom.name}</option>
                    ))}
                    </select>
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">Remark:</label>
            <input
              type="text"
              className="form-control"
              value={row.remark}
              onChange={(e) => handleCellChange(e.target.value, index, "remark")}
            />
          </div>
        </div>


        </>
       )}
        
          



        <div className="col-12 col-md-2" style={{display:"flex", margin:"0 auto"}}>
          <button
            type="button"
            className={`btn btn-primary ${styles["add-row-button"]}`}
            onClick={handleAddRow}
            disabled={disableAddRow}
          >
            Add Material
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditableTable;
