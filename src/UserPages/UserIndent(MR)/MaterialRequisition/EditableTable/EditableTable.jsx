import React, { useState, useEffect } from "react";
import useCategoryData from "../../../../CommonUtitlites/customHooks/useGetCategory";
import useSubCategoryData from "../../../../CommonUtitlites/customHooks/useGetSubCategory";
import styles from "./EditableTable.module.css"; // Import the CSS module
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetProductByCateOrSubData from "../../../../CommonUtitlites/customHooks/useGetProductsByCatOrSub";
import useGetAllUom from "../../../../CommonUtitlites/customHooks/useGetAllUom"

const EditableTable = (props) => {
  const [clear, setClear] = useState(false)
  const [clearProduct, setClearProduct] = useState(false)


  let categories = useCategoryData(clear);
  const [categoryId, setCategoryId] = useState("");

  const [subCategoryId, setSubCategoryId] = useState("");
  const [status, setStatus] = useState("");

  let productsByHook = useGetProductByCateOrSubData(categoryId, subCategoryId, clearProduct||clear);
  const unitOfMeasurement = useGetAllUom(status);
  const [validUom,setValidUom] = useState([]); 
  // console.log('got UOM', unitOfMeasurement);
  const [products, setProducts] = useState("")





  const [subCategories, setSubCategories] = useState([]);

  let subCategoriesByhook = useSubCategoryData(
    categoryId ? categoryId : "", clear
  );


  useEffect(() => {
    setSubCategories(subCategoriesByhook); 
  }, [ subCategoriesByhook]);
  

  
  useEffect(() => {
    setProducts(productsByHook)
  }, [ productsByHook])





  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      materialCategory: "",
      disabled_materialCategory:false,
      materialSubCategory: "",
      disabled_materialSubCategory:false,
      materialDescription: "",
      disabled_materialDescription:false,
      quantity: "",
      disabled_quantity:false,
      uom: "",
      disabled_uom:false,
      remark: "",
    },
  ]);
  // const [show, setShow] = useState(false);


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
    const lastRow = tableData.length - 1;
   
    const newData = [...tableData];
    newData[lastRow]["disabled_materialCategory"] = true;
    newData[lastRow]["disabled_materialSubCategory"] = true;
    newData[lastRow]["disabled_materialDescription"] = true;
    newData[lastRow]["disabled_quantity"] = true;
    newData[lastRow]["disabled_uom"] = true;

    const newRow = {
      sNo: tableData.length + 1,
      materialCategory: "",
      disabled_materialCategory:false,
      materialSubCategory: "",
      disabled_materialSubCategory:false,
      materialDescription: "",
      disabled_materialDescription:false,
      quantity: "",
      disabled_quantity:false,
      uom: "",
      disabled_uom:false,
      remark: "",
    };

    setTableData([...tableData, newRow]);
    setDisableAddRow(true);
  };

  // const handleDeleteRow = (index) => {
  //   const newData = [...tableData];
  //   console.log('before', newData);
  //   newData.splice(index, 1); // Remove the row at the specified index
  //   setTableData(newData);
  //   console.log('after', newData);
  // }; 
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
  console.log(rowIndex)
  const newData = [...tableData];
  if (columnName === "materialCategory") {
    setClear(!clear);
    newData[rowIndex]["materialCategory"] = data.name;
    newData[rowIndex]["materialSubCategory"] = ""; // Reset subcategory when a new category is selected
    newData[rowIndex]["materialDescription"] = ""; // Reset product description when a new category is selected
    setSubCategories([]);
    setProducts("");
    setClearProduct(!clearProduct);
    setCategoryId(data.id);

  } else if (columnName === "materialSubCategory") {
    setClear(!clear);
    newData[rowIndex]["materialSubCategory"] = data.name;
    newData[rowIndex]["materialDescription"] = ""; // Reset product description when a new subcategory is selected
    setSubCategoryId(data.id);
    setProducts("");
  }
  
  else if (columnName === "materialDescription") {
    setClear(!clear);
    setClearProduct(!clearProduct);
    newData[rowIndex]["materialDescription"] = data.name;

 let product= products.find(product=>product._id===data.id)
//  console.log('uom is', product.uom);
    if (Array.isArray(product.uom)) {
     newData[rowIndex]["uom"] = product.uom[0];
     setValidUom(product.uom);
   } else {
     newData[rowIndex]["uom"] = product.uom;
   }
  } else if (columnName === "quantity") {
    newData[rowIndex]["quantity"] = data.target.value;
  } else if (columnName === "uom") {
    // console.log('data is: ', data.target.value)
    // console.log('it already is: ', newData[rowIndex]["uom"]);
    // newData[rowIndex]["uom"] = data.target.value;
    
    // lets try another approach
    // console.log('we have', products);
    let product= products.find(product=>product.name===newData[rowIndex]["materialDescription"]);
    // console.log('final product', product);
    if(Array.isArray(product.uom)){
      newData[rowIndex]["uom"] = data.target.value;
    }
    
  } else if (columnName === "remark") {
    newData[rowIndex]["remark"] = data.target.value;
  }
  setTableData(newData);
};


  useEffect(() => {
    console.log(tableData);
    if(props.data){
      setTableData(props.data);
    }
      
  }, [props.data]);
  useEffect(() => {
    console.log(tableData);
    props.tableData(tableData);
  }, [tableData]);


  console.log(tableData)

  return (
    <div className={styles.container}>
      <div >
        <div className={styles["table-wrapper"]}>
          <table className={`table ${styles.table_editable}`}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Material Category</th>
                <th>Material Sub Category</th>
                <th>Material Description</th>
                <th>Quantity</th>
                <th style={{width:'fit-content'}}>UOM</th>
                <th>Remark</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  <td>
                    <SearchInput
                      id={"Categ"}
                      items={categories}
                      value={row.materialCategory}
                      disabled={row.disabled_materialCategory}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialCategory")
                      }
                      // className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
                  </td>
                  <td>
                    <SearchInput
                      id={"SubCate"}
                      items={subCategories}
                      value={row.materialSubCategory}
                      disabled={row.disabled_materialSubCategory}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialSubCategory")
                      }
                      allClear={clear}
                      // className={`${styles["column-name"]} ${styles["search-input"]}`}
                      
                    />
                  </td>
                  <td>
                    <SearchInput
                      id={"Product"}
                      items={products}
                      value={row.materialDescription}
                      disabled={row.disabled_materialDescription}
                      allClear={clearProduct}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialDescription")
                      }
                      // className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
                  </td>
                  <td>
                    <input
                       style={{width:'fit-content'}}
                      type="number"
                      min={1}
                      required
                      className="form-control"
                      value={row.quantity}
                      disabled={row.disabled_quantity}
                      onChange={(e) => handleCellChange(e, index, "quantity")}
                    />
                  </td>
                  <td>
                    <select
                    style={{width:'fit-content'}}
                      name="uom"
                      id="uom"
                      required
                      className="form-control"
                      disabled={row.disabled_uom}
                      value={row.uom.toLowerCase()}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                      <option value="">Select Options</option>
                      {/* {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name.toLowerCase()}>{uom.name}</option>
                    ))} */}
                     {validUom.length > 0 ? (
    validUom.map((uom) => (
      <option key={uom} value={uom.toLowerCase()}>
        {uom.charAt(0).toUpperCase() + uom.slice(1)}
      </option>
    ))
  ) : (
    <option value={row.uom.toLowerCase()}>
      {row.uom.charAt(0).toUpperCase() + row.uom.slice(1)}
    </option>
  )}
                      {/* <option value="bags">Bags</option>
                      <option value="nos">Nos</option>
                      <option value="kg">Kilograms</option>
                      <option value="mtr">Meters</option>
                      <option value="tons">Tons</option>
                      <option value="metric tons">Metric Tons</option> */}
                    </select>
                  </td>
                  <td>
                    <input
                       style={{width:'fit-content'}}
                      type="text"
                      className="form-control"
                      value={row.remark}
                      onChange={(e) => handleCellChange(e, index, "remark")}
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
        <h6 className="pt-1"> Add Materials</h6>
      </div>

      {tableData.map((row, index) => 
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
            <SearchInput
                      id={"Categ"}
                      items={categories}
                      value={row.materialCategory}
                      disabled={row.disabled_materialCategory}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialCategory")
                      }
                      // className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-3`}>
            <label htmlFor="materialSubCategory">Material Sub Category:</label>
            <SearchInput
                      id={"SubCate"}
                      items={subCategories}
                      value={row.materialSubCategory}
                      disabled={row.disabled_materialSubCategory}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialSubCategory")
                      }
                      allClear={clear}
                      // className={`${styles["column-name"]} ${styles["search-input"]}`}
                      
                    />
          </div>

          <div className={`${styles["column-name"]} col-12 col-md-4`}>
            <label htmlFor="materialDescription">Material Description:</label>
            <SearchInput
                      id={"Product"}
                      items={products}
                      value={row.materialDescription}
                      disabled={row.disabled_materialDescription}
                      allClear={clearProduct}
                      ResultOnClick={(data) =>
                        handleCellChange(data, index, "materialDescription")
                      }
                      // className={`${styles["column-name"]} ${styles["search-input"]}`}
                    />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="quantity">Quantity:</label>
            <input
                      type="number"
                      min={1}
                      required
                      className="form-control"
                      disabled={row.disabled_quantity}
                      value={row.quantity}
                      onChange={(e) => handleCellChange(e, index, "quantity")}
                    />
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-1`}>
            <label htmlFor="uom">UOM:</label>
            <select
                      name="uom"
                      id="uom"
                      required
                      className="form-control"
                      disabled={row.disabled_uom}
                      value={row.uom.toLowerCase()}
                      onChange={(e) => handleCellChange(e, index, "uom")}
                    >
                      <option value="">Select Options</option>
                      {/* {unitOfMeasurement &&
                    unitOfMeasurement.map((uom) => (
                      <option value={uom.name.toLowerCase()}>{uom.name}</option>
                    ))} */}
                   {validUom.length > 0 ? (
    validUom.map((uom) => (
      <option key={uom} value={uom.toLowerCase()}>
        {uom.charAt(0).toUpperCase() + uom.slice(1)}
      </option>
    ))
  ) : (
    <option value={row.uom.toLowerCase()}>
      {row.uom.charAt(0).toUpperCase() + row.uom.slice(1)}
    </option>
  )}
                    </select>
          </div>



          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remark">Remark:</label>
            <input
                      type="text"
                      className="form-control"
                      value={row.remark}
                      onChange={(e) => handleCellChange(e, index, "remark")}
                    />
          </div>
          <div className={`${styles["column-name"]} col-12 col-md-2`}>
            <label htmlFor="remove">Delete:</label>
            <button
                     type="button"
                     className={`btn btn-danger ${styles["delete-button"]}`}
                      onClick={() => handleDeleteRow(index)}
                    >
                      <i class="fa-solid fa-delete-left"></i>
                    </button>
          </div>
          </div>
      </>
      )}

      <div style={{ display: "flex", justifyContent:'center' }}>
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
