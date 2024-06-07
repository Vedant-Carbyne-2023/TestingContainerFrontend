import React, { useEffect, useState } from "react";
import { api } from "../../functions/axiosDefault";
import { errorHandler } from "../../functions/errorHandle";
import { Table } from "react-bootstrap";
import moment from "moment";

export default function ShowVendor() {
  const [allVendors, setAllVendors] = useState([]);
  useEffect(() => {
    const getVendors = async () => {
      let result = api.post("/get-vendors");
      result = await errorHandler(result);
      console.log(result);
      setAllVendors(result.data.data);
    };
    getVendors();
  }, []);

  return (
    <div>
      <div>
        <h4>All Vendors</h4>
      </div>

      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <Table striped bordered hover responsive>
          <thead>
          <tr>
            <th> Vendor Code</th>
            <th>Vendor Name</th>
            <th>Trade Name</th>
            <th>Annual Turn Over </th>
            <th>Created On Date</th>
          </tr>
        </thead>
        <tbody>
          {allVendors.length > 0 &&
            allVendors.map((vendor, index) => (
              <tr key={index}>
                <td>{vendor.vendor_code}</td>
                <td>{vendor.vendorName}</td>
                <td>{vendor.tradeName}</td>
                <td>{vendor.annualTurnover}</td>
                <td>{moment(vendor.createdAt).format("DD-MM-YYYY")}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
    </div>
  );
}
