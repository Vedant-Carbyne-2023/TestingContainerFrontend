import React from 'react'

export default function BoqTable() {
  return (
    <div>
        
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
                        <>
                          <tr key={subtableIndex}>
                            <td colSpan="9">
                              <Subtable
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
                                onAddSubSubtable={() =>
                                  handleAddSubSubtable(
                                    subtable.index,
                                    subtableIndex,
                                    index
                                  )
                                }
                              />
                            </td>
                          </tr>

                          {subsubtables.map(
                            (subsubtable, subsubtableIndex) =>
                              subsubtable.subtableIndex === subtable.index &&
                              subsubtable.mainTableIndex === index && (
                                <tr key={`subsub-${subsubtableIndex}`}>
                                  <td colSpan="9">
                                    <SubSubtable
                                      subsubtableData={subsubtable.data}
                                      onAddRowInSubSubtable={() =>
                                        handleAddRowInSubSubtable(
                                          subtable.index,
                                          index,
                                          subsubtableIndex
                                        )
                                      }
                                      onDeleteRowInSubSubtable={() =>
                                        handleDeleteRowInSubSubtable(
                                          subtable.index,
                                          index,
                                          subsubtableIndex
                                        )
                                      }
                                      onChangeSubSubtableInput={(
                                        value,
                                        field
                                      ) =>
                                        handleChangeSubSubtableInput(
                                          value,
                                          field,
                                          index,
                                          subtable.index,
                                          subsubtableIndex
                                        )
                                      }
                                    />
                                  </td>
                                </tr>
                              )
                          )}
                        </>
                      )
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  )
}
