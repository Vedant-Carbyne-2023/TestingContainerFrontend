import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function JmrCount() {
  const [mainTable, setMainTable] = useState([
    { id: 1, name: '', percentage: 0, subTable: [] },
    { id: 2, name: '', percentage: 0, subTable: [] },
  ]);

  const addMainRow = () => {
    setMainTable((prevMainTable) => [
      ...prevMainTable,
      { id: prevMainTable.length + 1, name: '', percentage: 0, subTable: [] },
    ]);
  };

  const addSubRow = (mainRowId) => {
    setMainTable((prevMainTable) => {
      return prevMainTable.map((row) => {
        if (row.id === mainRowId) {
          const newSubTable = [
            ...row.subTable,
            { id: `${row.id}.${row.subTable.length + 1}`, name: '', percentage: 0 },
          ];
          return { ...row, subTable: newSubTable };
        }
        return row;
      });
    });
  };

  const validateMainTable = (table) => {
    const mainTableSum = table.reduce((sum, row) => sum + row.percentage, 0);
    return mainTableSum <= 100;
  };

  const validateSubTable = (subTable) => {
    const subTableSum = subTable.reduce((sum, subRow) => sum + subRow.percentage, 0);
    return subTableSum <= 100;
  };

  const validatePercentage = () => {
    const isMainTableValid = validateMainTable(mainTable);

    if (!isMainTableValid) {
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'The total percentage in the main table cannot exceed 100%.',
      });
      return;
    }

    let isSubTableValid = true;
    for (const row of mainTable) {
      isSubTableValid = validateSubTable(row.subTable);
      if (!isSubTableValid) {
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: `The total percentage in sub-table ${row.id} cannot exceed 100%.`,
        });
        return;
      }
    }

    Swal.fire({
      icon: 'success',
      title: 'Validation Success',
      text: 'All percentages are within valid limits.',
    });
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Serial No</th>
            <th>Main Row</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {mainTable.map((row) => (
            <React.Fragment key={row.id}>
              <tr>
                <td>{row.id}</td>
                <td>
                  <textarea
                    type="text"
                    value={row.name}
                    onChange={(e) => {
                      const newName = e.target.value;
                      setMainTable((prevMainTable) =>
                        prevMainTable.map((r) =>
                          r.id === row.id ? { ...r, name: newName } : r
                        )
                      );
                    }}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={row.percentage}
                    onChange={(e) => {
                      const newPercentage = parseInt(e.target.value);
                      setMainTable((prevMainTable) =>
                        prevMainTable.map((r) =>
                          r.id === row.id
                            ? { ...r, percentage: newPercentage }
                            : r
                        )
                      );
                    }}
                    className="form-control"
                  />
                </td>
              </tr>
              {row.subTable.map((subRow) => (
                <React.Fragment key={subRow.id}>
                  <tr>
                    <td>{subRow.id}</td>
                    <td>
                      <textarea
                        type="text"
                        value={subRow.name}
                        onChange={(e) => {
                          const newName = e.target.value;
                          setMainTable((prevMainTable) =>
                            prevMainTable.map((r) =>
                              r.id === row.id
                                ? {
                                    ...r,
                                    subTable: r.subTable.map((sr) =>
                                      sr.id === subRow.id
                                        ? { ...sr, name: newName }
                                        : sr
                                    ),
                                  }
                                : r
                            )
                          );
                        }}
                        className="form-control"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={subRow.percentage}
                        onChange={(e) => {
                          const newPercentage = parseInt(e.target.value);
                          setMainTable((prevMainTable) =>
                            prevMainTable.map((r) =>
                              r.id === row.id
                                ? {
                                    ...r,
                                    subTable: r.subTable.map((sr) =>
                                      sr.id === subRow.id
                                        ? { ...sr, percentage: newPercentage }
                                        : sr
                                    ),
                                  }
                                : r
                            )
                          );
                        }}
                        className="form-control"
                      />
                    </td>
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <td colSpan="2"></td>
                <td>
                  <button onClick={() => addSubRow(row.id)} className="btn btn-primary">
                    Add Sub-Row
                  </button>
                </td>
              </tr>
              <tr>
                <td colSpan="2">Total:</td>
                <td>{row.subTable.reduce((sum, subRow) => sum + subRow.percentage, 0)}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <button onClick={addMainRow} className="btn btn-success">
        Add Main Row
      </button>
      <button onClick={validatePercentage} className="btn btn-primary">
        Validate
      </button>
    </div>
  );
}
