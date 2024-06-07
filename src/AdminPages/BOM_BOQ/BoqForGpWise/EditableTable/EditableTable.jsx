import React, { useState, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import Table from "@editorjs/table";
import useCategoryData from "../../../../CommonUtitlites/customHooks/useGetCategory";
import useSubCategoryData from "../../../../CommonUtitlites/customHooks/useGetSubCategory";
import styles from "./EditableTable.module.css"; // Import the CSS module
import SearchInput from "../../../../CommonUtitlites/SearchingInput(For Automatic DropDown)/SearchInput";
import useGetProductByCateOrSubData from "../../../../CommonUtitlites/customHooks/useGetProductsByCatOrSub";
import useGetProductData from "../../../../CommonUtitlites/customHooks/useGetProducts";

const EditableTable = (props) => {
  

const allProducts = useGetProductData()


console.log(allProducts)



  const [tableData, setTableData] = useState([
    {
      sNo: 1,
      supply: "supply",
      materialCategory: "",
      materialSubCategory: "",
      materialDescription: "",
      uom: "",
      quantity: "",
    },
  ]);
  // const [show, setShow] = useState(false);

  useEffect(() => {
    if(allProducts)
    {
   // Initialize an empty array to store the transformed data
const transformedTableData = [];

// Iterate through allProducts and transform the data
allProducts.forEach((product, index) => {
  const newTableDataRow = {
    sNo: index + 1,
    supply: "supply",
    materialCategory: product.category.name,
    materialSubCategory: product.subcategory.name,
    materialDescription: product.name,
    quantity:0, // You can set an initial quantity value here
    uom: product.uom, // Assuming uom (unit of measure) is available in the product data
  };

  transformedTableData.push(newTableDataRow);
});

// Set the transformed data to the tableData state
setTableData(transformedTableData);
}
  }, [allProducts])
  
  console.log(tableData)



 

const handleCellChange = (data, rowIndex, columnName) => {
  console.log(rowIndex)
  const newData = [...tableData];
 
    newData[rowIndex]["quantity"] = data.target.value;
  
  setTableData(newData);
};

  

  useEffect(() => {
    props.tableData(tableData);
  }, [tableData]);

  return (
    <div className={styles.container}>
      <div >
        <div className={styles["table-wrapper"]}>
          <table className={`table ${styles.table_editable}`}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Supply</th>
                <th>Material Category</th>
                <th>Material Sub Category</th>
                <th>Material Description</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {tableData && tableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.sNo}</td>
                  
                  <td>
                    {"Supply"}
                  </td>
                  <td>
                   {row.materialCategory}
                  </td>
                  <td>
                  {row.materialSubCategory}
                  </td>
                  <td>
                   {row.materialDescription}
                  </td>
                  <td>
                    <input
                      type="number"
                      min={0}
                      required
                      className="form-control"
                      value={row.quantity}
                      onChange={(e) => handleCellChange(e, index, "quantity")}
                    />
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>


    </div>
    </div>
  );
};

export default EditableTable;
