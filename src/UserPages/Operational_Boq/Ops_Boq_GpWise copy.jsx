import React, { useState } from "react";
import { Table, Button, Container, Row, Col, Form } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import { api } from "../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../CommonUtitlites/Others/errorHandle";
import { userId, role } from '../../CommonUtitlites/Others/commonExportVariable';

const Subtable = ({
  mainTableIndex,
  subTableIndex,
  subtableData,
  onAddRowInSubtable,
  onAddSubSubtable,
  onDeleteRowInSubtable,
  onChangeSubtableInput,
  subtables,
  subsubtables,
  handleAddRowInSubSubtable,
  handleDeleteRowInSubSubtable,
  handleChangeSubSubtableInput,
}) => {

  return (
    <div style={{ marginLeft: "35px" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Uom</th>
            <th>WTD</th>
            <th>Quantity</th>
            <th>Rate</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subtableData.map((row, index) => (
            <React.Fragment key={index}>
              <tr>
                <td>
                  <Form.Control
                    type="text"
                    value={row.code}
                    onChange={(e) =>
                      onChangeSubtableInput(e.target.value, "code", index)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    as="textarea"
                    rows={5}
                    value={row.description}
                    onChange={(e) =>
                      onChangeSubtableInput(
                        e.target.value,
                        "description",
                        index
                      )
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="text"
                    value={row.uom}
                    onChange={(e) =>
                      onChangeSubtableInput(e.target.value, "uom", index)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={row.wtd}
                    onChange={(e) =>
                      onChangeSubtableInput(e.target.value, "wtd", index)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={row.quantity}
                    onChange={(e) =>
                      onChangeSubtableInput(e.target.value, "quantity", index)
                    }
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    value={row.rate}
                    onChange={(e) =>
                      onChangeSubtableInput(e.target.value, "rate", index)
                    }
                  />
                </td>
                <td>{row.quantity * row.rate}</td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => onAddSubSubtable(index)}
                  >
                    Add SubSubtable
                  </Button>
                </td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => onDeleteRowInSubtable(index)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>

  
              {
  subsubtables &&
  (() => {
    let subsubtable = subsubtables.find((subtable, i) =>
      subtable.mainTableIndex === mainTableIndex &&
      subtable.subtableIndex === subTableIndex &&
      subtable.subtableRowIndex === index
    );
    if (subsubtable) {
      return (
        <tr key={`subsub-${subsubtable.subtableRowIndex}`}>
          <td colSpan="8">
            
            <SubSubtable
              subsubtableData={subsubtable.data} // Use the current table data
              onAddRowInSubSubtable={() =>
                handleAddRowInSubSubtable(mainTableIndex, subTableIndex, index, subsubtable.subtableRowIndex)
              }
              onDeleteRowInSubSubtable={(rowIndex) =>
                handleDeleteRowInSubSubtable(rowIndex, index, mainTableIndex, subsubtable.subtableRowIndex, )
              }
              onChangeSubSubtableInput={(value, field, rowIndex) =>
                handleChangeSubSubtableInput(value, field, mainTableIndex, subTableIndex, index, subsubtable.subtableRowIndex, rowIndex )
              }
            />
          </td>
        </tr>
      );
    } else {
      return null; // Add this line to handle the case where the condition is not met
    }
  })()
}


      
    
 


            </React.Fragment>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={onAddRowInSubtable}>
        Add Row in Subtable
      </Button>
    </div>
  );
};

const SubSubtable = ({
  subsubtableData,
  onAddRowInSubSubtable,
  onDeleteRowInSubSubtable,
  onChangeSubSubtableInput,
}) => {
  return (
    <div style={{ marginLeft: "70px" }}>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Code</th>
            <th>Description</th>
            <th>Uom</th>
            <th>WTD</th>
            <th>Quantity</th>
            <th>Rate</th>
            {/* <th>Total Amount</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {subsubtableData.map((row, index) => (
            <tr key={index}>
              <td>
                <Form.Control
                  type="text"
                  value={row.code}
                  onChange={(e) =>
                    onChangeSubSubtableInput(e.target.value, "code", index)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="text"
                  value={row.description}
                  onChange={(e) =>
                    onChangeSubSubtableInput(
                      e.target.value,
                      "description",
                      index
                    )
                  }
                />
              </td>

              <td>
                <Form.Control
                  type="text"
                  value={row.uom}
                  onChange={(e) =>
                    onChangeSubSubtableInput(e.target.value, "uom", index)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  value={row.wtd}
                  onChange={(e) =>
                    onChangeSubSubtableInput(e.target.value, "wtd", index)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  disabled
                  value={row.quantity}
                  onChange={(e) =>
                    onChangeSubSubtableInput(e.target.value, "quantity", index)
                  }
                />
              </td>
              <td>
                <Form.Control
                  type="number"
                  disabled
                  value={row.rate}
                  onChange={(e) =>
                    onChangeSubSubtableInput(e.target.value, "rate", index)
                  }
                />
              </td>
              {/* Add more subsubtable columns as needed */}
              <td>
                <Button
                  variant="danger"
                  onClick={() => onDeleteRowInSubSubtable(index)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={(index) => onAddRowInSubSubtable(index)}>
        Add Row in SubSubtable
      </Button>
    </div>
  );
};

const Ops_Boq_GpWise = () => {
  const [tableData, setTableData] = useState([
    {
      index: 0,
      uom: "",
      description: "",
      code: "",
      wtd: "",
      quantity: 0,
      rate: 0,
      subtableIndex: 0,
    },
    // Add more initial data as needed
  ]);

  const [subtables, setSubtables] = useState([]);

  const handleAddRow = () => {
    const newIndex = tableData.length;

    const newRow = {
      index: newIndex,
      code: "",
      uom: "",
      description: "",
      wtd: "",
      quantity: 0,
      rate: 0,
      subtableIndex: newIndex,
    };

    setTableData([...tableData, newRow]);
  };

  const handleAddSubTable = (index) => {
    console.log(index);
    const newSubtable = [
      {
        code: "",
        uom: "",
        description: "",
        wtd: 100,
        quantity: tableData[index]?.quantity || 0,
        rate: tableData[index]?.rate || 0,
      },
      // Add more initial data as needed
    ];

    setSubtables([...subtables, { index: index, data: newSubtable }]);
  };

  const handleAddRowInSubtable = (subtableIndex, rowIndex) => {
    const updatedSubtables = subtables.map((subtable) =>
      subtable.index === subtableIndex
        ? {
            ...subtable,
            data: [
              ...subtable.data,
              {
                code: "",
                wtd: 100,
                quantity: tableData[rowIndex]?.quantity || 0,
                rate: tableData[rowIndex]?.rate || 0,
              },
            ],
          }
        : subtable
    );

    setSubtables(updatedSubtables);
  };

  const handleDeleteRow = (index) => {
    const updatedTableData = tableData.filter((row) => row.index !== index);
    setTableData(updatedTableData);

    // Also remove corresponding subtable if exists
    const updatedSubtables = subtables.filter(
      (subtable) => subtable.index !== index
    );
    setSubtables(updatedSubtables);
  };

  const handleDeleteRowInSubtable = (subtableIndex, rowIndex) => {
    const updatedSubtables = subtables.map((subtable) =>
      subtable.index === subtableIndex
        ? {
            ...subtable,
            data: subtable.data.filter((row, index) => index !== rowIndex),
          }
        : subtable
    );

    setSubtables(updatedSubtables);
  };

  const handleChangeTableInput = (value, field, index) => {
    const updatedTableData = tableData.map((row) =>
      row.index === index ? { ...row, [field]: value } : row
    );
    setTableData(updatedTableData);
  };

  const handleChangeSubtableInput = (value, field, rowIndex, tableRowIndex) => {
    let updatedSubtables;

    if (field === "wtd") {
      let subtable = subtables.find(
        (subtable) => subtable.index === tableRowIndex
      );
      let updateRate = tableData[tableRowIndex]?.rate || 0;
      const derivedData = {
        wtd: value,
        quantity: "",
        rate: (value / 100) * updateRate,
      };

      updatedSubtables = subtables.map((subtable) =>
        subtable.index === tableRowIndex
          ? {
              ...subtable,
              data: subtable.data.map((row, index) =>
                index === rowIndex
                  ? { ...row, [field]: value, ...derivedData }
                  : row
              ),
            }
          : subtable
      );
    } else {
      updatedSubtables = subtables.map((subtable) =>
        subtable.index === tableRowIndex
          ? {
              ...subtable,
              data: subtable.data.map((row, index) =>
                index === rowIndex ? { ...row, [field]: value } : row
              ),
            }
          : subtable
      );
    }

    setSubtables(updatedSubtables);
  };
  
  const [subsubtables, setSubSubtables] = useState([]);

  const handleAddSubSubtable = (
    subtableIndex,
    subtableRowIndex,
    mainTableRowIndex,
    tableIndex
  ) => {
    console.log( tableIndex,
      subtableRowIndex,
      subtableIndex,
      mainTableRowIndex);

      let subtable = subtables.find(
        (subtable) => subtable.index == subtableIndex
        );
        const newSubSubtable = [
          {
        code: "",
        uom: "",
        description: "",
        wtd: 100,
        quantity: subtable.data[tableIndex]?.quantity || 0,
        rate: subtable.data[tableIndex]?.rate || 0,
      },
      
      // Add more initial data as needed
    ];

    setSubSubtables([
      ...subsubtables,
      {
        subtableIndex: subtableIndex,
        subtableRowIndex: tableIndex,
        mainTableIndex: mainTableRowIndex,
        data: newSubSubtable,
      },
    ]);
  };

  console.log(subsubtables)

  const handleAddRowInSubSubtable = (
    subtableIndex,
    mainTableIndex,
    rowIndex,
    subtableRowIndex
  ) => {

    console.log(  subtableIndex,
      mainTableIndex,
      rowIndex,
      subtableRowIndex)
      
      const updatedSubSubtables = subsubtables.map((subsubtable) =>
      (subsubtable.subtableIndex === mainTableIndex &&
      subsubtable.subtableRowIndex === rowIndex) 
   
        ? {
            ...subsubtable,
            data: [
              ...subsubtable.data,
              {
                code: "",
                uom: "",
                description: "",
                wtd: "",
                quantity: 0,
                rate: 0,
                subtableIndex: subtableIndex,
                mainTableIndex: mainTableIndex,
                subtableRowIndex: rowIndex,
                
              },
            ],
          }
        : subsubtable
        );
        
        console.log(updatedSubSubtables);
        // return
    setSubSubtables(updatedSubSubtables);
  };

  const handleDeleteRowInSubSubtable = (
    rowIndex,
    subtableIndex,
    mainTableIndex,
    subsubtableIndex
  ) => {

    console.log(  rowIndex,
      subtableIndex,
      mainTableIndex,
      subsubtableIndex)
      // return

    const updatedSubSubtables = subsubtables.map((subsubtable) =>
    {console.log(subsubtable)
      return(
      subsubtable.subtableIndex === mainTableIndex &&
      subsubtable.subtableRowIndex === subsubtableIndex &&
      subsubtable.mainTableIndex === mainTableIndex
        ? {
          ...subsubtable,
          data: subsubtable.data.filter(
              (row, index) => index !== rowIndex
            ),
          }
          : subsubtable)}
          );
          
          setSubSubtables(updatedSubSubtables);
        };
      
        const   handleChangeSubSubtableInput = (
          value,
          field,
          mainRowIndex,
    subtableIndex,
    subsubtableIndex,
    subtableRowIndex,
     rowIndex
  ) => {
      
    let updatedSubSubtables=''
   
    if (field == "wtd") {
      let subtable = subtables.find(
        (subtable) =>( subtable.index === mainRowIndex)
      );
      console.log(subtable, 'here')
      let updateRate = subtable.data[subtableRowIndex]?.rate || 0;
      console.log(updateRate)
      let updateQuantity = subtable.data[subtableRowIndex]?.quantity || 0;
      const derivedData = {
        wtd: value,
        quantity: "",
        rate: (value / 100) * updateRate,
      };
      
      updatedSubSubtables = subsubtables.map((subsubtable) => {
        console.log(subsubtable.subtableIndex , subtableIndex ,
          subsubtable.subtableRowIndex , subsubtableIndex);
        return (subsubtable.subtableIndex === subtableIndex &&
          subsubtable.subtableRowIndex === subsubtableIndex
          )
          ? {
              ...subsubtable,
              data: subsubtable.data.map((row, index) =>
              index === rowIndex ? { ...row, [field]: value, ...derivedData } : row
              ),
            }
            : subsubtable;
      });

    } else {
      updatedSubSubtables = subsubtables.map((subsubtable) =>
      (subsubtable.subtableIndex === subtableIndex &&
        subsubtable.subtableRowIndex === subsubtableIndex &&
        subsubtable.mainTableIndex === mainRowIndex)
        ? {
            ...subsubtable,
            data: subsubtable.data.map((row, index) =>
              index === rowIndex ? { ...row, [field]: value } : row
            ),
          }
          : subsubtable
    );
    }
    console.log(updatedSubSubtables)
 
    
    setSubSubtables(updatedSubSubtables);
  };
  
  
    const handleSubmit = async() => {
      const updatedTableData = tableData.map((row) => ({
        ...row,
        totalAmount: row.quantity * row.rate,
      }));
  
      subtables.forEach((subtable) => {
        console.log(subtable);
        const indexToInsert = subtable.index;
        if (indexToInsert >= 0 && indexToInsert < updatedTableData.length) {
          updatedTableData[indexToInsert].subtable = subtable.data;
  
          // Include subsubtables within subtables
          let subsubtableForSubtable = subsubtables.filter(
            (subsubtable) => subsubtable.subtableIndex === subtable.index
          );
          console.log(subsubtableForSubtable);
  
          if (subsubtableForSubtable.length > 0) {
            updatedTableData[indexToInsert].subtable.forEach(
              (subtableRow, index) => {
                const subtableRowIndex = indexToInsert;
                const subsubtableData = subsubtableForSubtable
                  .filter(
                    (subsubtable) =>
                      subsubtable.mainTableIndex === subtableRowIndex
                  )
                  .map((subsubtable) => subsubtable.data);
                console.log(subtableRowIndex, subsubtableData);
                if (subsubtableData.length > 0) {
                  subtableRow.subsubtable = subsubtableData[0];
                }
              }
            );
          }
        }
      });
  
      console.log("Updated Table Data:", updatedTableData);
  
      try {
        let result = api.post('/create-update-operational-boq-gpwise-tablewise', {userId, role, updatedTableData})
        result = await errorHandler(result)
        console.log(result)
      } catch (error) {
        console.log(error)
      }
    };
  return (
    <Container fluid className="p-0 m-0">
      <Row>
        <Col>
        <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>S. No.</th>
                <th>Code</th>
                <th>Description</th>
                <th>Uom</th>
                <th>WTD</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Total Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={row.code}
                        onChange={(e) =>
                          handleChangeTableInput(e.target.value, "code", index)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        as="textarea"
                        rows={5}
                        value={row.description}
                        onChange={(e) =>
                          handleChangeTableInput(
                            e.target.value,
                            "description",
                            index
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        value={row.uom}
                        onChange={(e) =>
                          handleChangeTableInput(e.target.value, "uom", index)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={row.wtd}
                        onChange={(e) =>
                          handleChangeTableInput(e.target.value, "wtd", index)
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={row.quantity}
                        onChange={(e) =>
                          handleChangeTableInput(
                            e.target.value,
                            "quantity",
                            index
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        value={row.rate}
                        onChange={(e) =>
                          handleChangeTableInput(e.target.value, "rate", index)
                        }
                      />
                    </td>
                    <td>{row.quantity * row.rate}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteRow(index)}
                      >
                        <FaTrash />
                      </Button>
                      <Button
                        variant="secondary"
                        className="ml-2"
                        onClick={() => handleAddSubTable(index)}
                      >
                        Add Subtable
                      </Button>
                    </td>
                  </tr>

                  {subtables.map(
                    (subtable, subtableIndex) =>
                      subtable.index === index && (
                        <React.Fragment key={subtableIndex}>
                          <tr>
                            <td colSpan="9">
                              <Subtable
                              subsubtables={subsubtables}
                              subTableIndex={subtableIndex}
                              mainTableIndex={index}
                                subtableData={subtable.data}
                                onAddRowInSubtable={() =>
                                  handleAddRowInSubtable(subtable.index, index)
                                }
                                onDeleteRowInSubtable={(rowIndex) =>
                                  handleDeleteRowInSubtable(
                                    subtable.index,
                                    rowIndex
                                  )
                                }
                                onChangeSubtableInput={(
                                  value,
                                  field,
                                  rowIndex
                                ) =>
                                  handleChangeSubtableInput(
                                    value,
                                    field,
                                    rowIndex,
                                    index
                                  )
                                }
                                onAddSubSubtable={(abc) =>
                                  handleAddSubSubtable(
                                    subtable.index,
                                    subtableIndex,
                                    index,
                                    abc
                                  )
                                }

                                handleAddRowInSubSubtable={handleAddRowInSubSubtable}
                                handleChangeSubSubtableInput={handleChangeSubSubtableInput}
                                handleDeleteRowInSubSubtable={handleDeleteRowInSubSubtable}
                              />
                       

                    
                               </td>
                          </tr>
                        </React.Fragment>
                      )
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <Button variant="primary" onClick={handleAddRow}>
            Add Row
          </Button>
        </Col>
        <Col>
          <Button variant="success" onClick={handleSubmit}>
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Ops_Boq_GpWise;
