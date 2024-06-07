import React, { Fragment, useEffect, useState } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  pdf,
  View,
  Image,
  Font,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { pdfjs } from "react-pdf";
import { currentDate, role, userId,userName } from "../../../CommonUtitlites/Others/commonExportVariable";
import {api} from '../../../CommonUtitlites/AxiosSetup/axiosDefault'
 import {errorHandler} from '../../../CommonUtitlites/Others/errorHandle'
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import image from "/carbyne.jpg";
import { formatDateCustom } from "../../../CommonUtitlites/Others/formattingDateAndName";
import Swal from "sweetalert2";
// import arialRegular from '../../../../public/fontSize/arial.TTF'
// import arialRegularBold from '../../../../public/fontSize/arialbd.TTF'

Font.register({
  family: "Cambria W02 Regular",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/758d40d7ca52e3a9bff2655c7ab5703c.ttf",
    },
  ],
});
Font.register({
  family: "Cambria Bold",
  fonts: [
    {
      src: "https://db.onlinewebfonts.com/t/2db80501ab27169c9b8395ce6f749be1.ttf",
      fontWeight: 600,
    },
  ],
});



const MakePdfForPurchaseOrder = (props) => {

  const [response, setResponse] = useState('')
  const [data, setData] = useState([]);
  
  useEffect(() => {
    
    setData(props.data.data);
  }, [props]);

  const createPDF = async () => {
    const MAX_ROWS_PER_PAGE = 12; // Adjust this value as per your requirement

    const tableData = data.tableData;
    const totalPages = Math.ceil(tableData.length / MAX_ROWS_PER_PAGE);

    const styles = StyleSheet.create({
      container: {
        fontFamily:"Cambria W02 Regular",
        marginTop: "3px",
      },
      headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      page: {
        padding: "1cm",
        paddingLeft:"20px"
      },
      heading: {
        fontSize: 25,
        fontFamily:"Cambria Bold",
        textAlign: "center",
        marginBottom: 10,
      },
      subHeading: {
        fontWeight: "bolder",
        fontSize: 16,
        textAlign: "center",
        marginBottom: "20px",
      },
      label: {
        fontFamily:"Cambria Bold",
        
        marginRight: 10,
        fontSize: "10px",
        marginBottom: "3px",
      },
      row: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
      },
      column: {
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%",
        flexDirection: "column",
      },
      input: {
             fontFamily:"Cambria W02 Regular",
        fontSize: "9px",
        marginBottom: "2px",
        padding: "4px 0",
      },

      formGrid: {
        marginBottom: "5px",
      },
      formRow: {
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px",
      },
      col: {
        flex: 1,
        flexDirection: "column",
        marginRight: "1rem",
      },
      table: {
        fontFamily:"Cambria W02 Regular",
        fontSize:"9px",
        width: "100%",
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderColor: "#000",
        marginBottom: "10px",
      },
      tableRow: {
        flexDirection: "row",
      },
      tableCell: {
      
        flex: 1,
        padding: "0.2cm",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
      },
      tableCell_large: {
        flex: 2,
        padding: "0.2cm",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
      },
      tableCell_small: {
        flex: 0.4,
        padding: "0.2cm",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
      },
      tableHeader: {
        backgroundColor: "#f0f0f0",
        fontWeight: "700",
      },
      logo: {
        width: 60,
        height: 60,
        marginRight: "auto",
        marginBottom: "10px",
      },
      leftContent: {
        display: "flex",
        alignItems: "center",
      },
      footer: {
        position: "absolute",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
      },
      pageNumber: {
        fontSize: 10,
        color: "gray",
      },
      subTable: {
        fontFamily:"Cambria W02 Regular",
        fontSize:"9px",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: 10,
      },
      subTableTitle: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 5,
      },
      subTableHeaderRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
      },
      subTableHeaderCell: {
        flex: 1,
        padding: 5,
        fontWeight: "bold",
      },
      subTableRow: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#000",
      },
      subTableCell: {
        flex: 1,
        padding: 5,
      },
    });

    const SubTable = ({ title, data }) => {
      const groupedRows = {};

      data.forEach((row) => {
        const taxType = row.sgst != 0 ? "sgst" : row.igst != 0 ? "igst" : 0;
        let taxPercentage =
          row.sgst != 0 ? row.sgst : row.igst != 0 ? row.igst : 0;
          
          taxPercentage=taxPercentage*100;

        const taxKey = `${taxType}_${taxPercentage}%`;

        if (!groupedRows[taxKey]) {
          groupedRows[taxKey] = {
            items: [],
            sgst: 0,
            cgst: 0,
            igst: 0,
            totalAmount: 0,
          };
        }
        groupedRows[taxKey].items.push(row.sNo);
        groupedRows[taxKey].sgst += parseFloat(
          row.sgstamount ? row.sgstamount : 0
        );
        groupedRows[taxKey].cgst += parseFloat(
          row.cgstamount ? row.cgstamount : 0
        );
        groupedRows[taxKey].igst += parseFloat(
          row.igstamount ? row.igstamount : 0
        );
        groupedRows[taxKey].totalAmount +=
          parseFloat(row.sgstamount ? row.sgstamount : 0) +
          parseFloat(row.cgstamount ? row.cgstamount : 0) +
          parseFloat(row.igstamount ? row.igstamount : 0);
      });

      const renderRowWithCommas = (rows) => {
        return Object.keys(rows).map((itemKey, index) => (
          <View key={index}>
            {index > 0 && <Text>, </Text>}
            <View style={styles.tableRow}>
              <Text style={styles.tableCell_large}>
                {rows[itemKey].items.join(", ")}
              </Text>

              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {itemKey}
              </Text>
              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {rows[itemKey].sgst.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {rows[itemKey].cgst.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {rows[itemKey].igst.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, { textAlign: "right" }]}>
                {rows[itemKey].totalAmount.toFixed(2)}
              </Text>
            </View>
          </View>
        ));
      };

      return (
        <View style={styles.subTable}>
          <Text style={styles.subTableTitle}>{title}</Text>
          <View style={styles.subTableHeaderRow}>
            <Text style={styles.subTableHeaderCell}>Items</Text>
            <Text style={[styles.subTableHeaderCell, { textAlign: "right" }]}>
              Tax
            </Text>
            <Text style={[styles.subTableHeaderCell, { textAlign: "right" }]}>
              SGST Amount
            </Text>
            <Text style={[styles.subTableHeaderCell, { textAlign: "right" }]}>
              CGST Amount
            </Text>
            <Text style={[styles.subTableHeaderCell, { textAlign: "right" }]}>
              IGST Amount
            </Text>
            <Text style={[styles.subTableHeaderCell, { textAlign: "right" }]}>
              Total GST Amount
            </Text>
          </View>
          {renderRowWithCommas(groupedRows)}
        </View>
      );
    };

    const calculateTotalAmount = (data) => {
      let totalAmount = 0;

      // Iterate through the data and accumulate the amounts
      data.forEach((row) => {
        const amount = parseFloat(row.amount);
        if (!isNaN(amount)) {
          totalAmount += amount;
        }
      });

      return totalAmount;
    };

    const calculateTotalSgstAmount = (data) => {
      let totalAmount = 0;
      // Iterate through the data and accumulate the amounts
      data.forEach((row) => {
        const amount = parseFloat(row.sgstamount);
        if (!isNaN(amount)) {
          totalAmount += amount;
        }
      });
      return totalAmount;
    };

    const calculateTotalIgstAmount = (data) => {
      let totalAmount = 0;
      // Iterate through the data and accumulate the amounts
      data.forEach((row) => {
        const amount = parseFloat(row.igstamount);
        if (!isNaN(amount)) {
          totalAmount += amount;
        }
      });
      return totalAmount;
    };

    const calculateTotalQuantity = (data) => {
      let totalAmount = 0;
      // Iterate through the data and accumulate the amounts
      data.forEach((row) => {
        const amount = parseFloat(row.quantity);
        if (!isNaN(amount)) {
          totalAmount += amount;
        }
      });
      return totalAmount;
    };

    const inputfields = [
      {
        label: "Billing Address:",
        inputID: "billingAddress",
      },
      {
        label: "Delivery Address:",
        inputID: "deliveryAddress",
      },
      {
        label: "Delivery Terms:",
        inputID: "deliveryTerms",
      },
      {
        label: "Delivery Time:",
        inputID: "deliveryTime",
      },
      {
        label: "Payment Terms:",
        inputID: "paymentTerms",
      },
      {
        label: "TPI Status / Others :",
        inputID: "tpiStatus",
      },
      {
        label: "Contact At HO:",
        inputID: "contactAtHeadOffice",
      },
      {
        label: "Quantity & Quality:",
        inputID: "qualityAndQuantity",
      },
      {
        label: "Other Term In DPR:",
        inputID: "otherTermsInDPR",
      },
    ];

    const doc = (
      <Document>
        {[...Array(totalPages)].map((_, pageIndex) =>
        {
          const isLastPage = pageIndex === totalPages - 1;
          const billingAddress = data.billingAddress;
          const lines = billingAddress.split("\n");
          if (lines.length > 1) {
            lines.shift(); // Remove the first line
          }

        return (
          <Page
            key={pageIndex}
            size="A4"
            orientation="portrait"
            style={{
              ...styles.page,
              paddingLeft: 60, // Use padding instead of margin for content spacing
              paddingRight: 40, // Use padding instead of margin for content spacing
              boxSizing: "border-box", // Include padding and border in the width
            }}
          >
           <View style={styles.headerContainer}>
                  {/* Logo on the left */}
                  {data.company ==
                    "CARBYNE INFRASTRUCTURE PRIVATE LIMITED" && (
                    <View style={{ position: "relative", top: 0, left: 0 }}>
                      <Image src={image} style={styles.logo} />
                    </View>
                  )}

                  {/* Text in the center */}
                  <View
                    style={{
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={[
                        styles.heading,
                        {
                          marginBottom: 0,
                          paddingBottom: 0,
                          marginTop: 0,
                          paddingTop: 0,
                        },
                      ]}
                    >
                      {data.company}
                    </Text>
                    <Text
                      style={[
                        styles.input,
                        {
                          fontSize: "10.5px",
                          alignItems: "center",
                          textAlign: "center",
                          marginTop: 0,
                          paddingTop: 0,
                        },
                      ]}
                    >
                      {lines.join("\n")}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.subHeading]}>Purchase Order</Text>

            <View style={styles.container}>
              <View style={styles.formGrid}>
                <View style={styles.formRow}>
                  <View style={styles.col}>
                    <Text style={[styles.label]}>Purchase Order Id :</Text>
                    <Text style={styles.input}>{data.poId}</Text>

                    <Text style={styles.label}>Purchase Order Date</Text>
                    <Text style={styles.input}>{ formatDateCustom (new Date(data.poDate))}</Text>

                    <Text style={styles.label}>Project Name</Text>
                    <Text style={styles.input}>{data.projectName}</Text>

      

                 
                  </View>

                  <View style={[styles.col,]}>
                  <Text style={styles.label}>M/S Name & Address:</Text>
                    <Text style={styles.input}>{data.msName}</Text>
                    <Text style={[styles.input,{textAlign:"left", marginRight:"10px"}]}>{data.msAddress}</Text>

                    <Text style={styles.label}>M/S GSTIN:</Text>
                    <Text style={styles.input}>{data.msGst}</Text>
            
                    <Text style={styles.label}>PO Validity:</Text>
                    <Text style={styles.input}>{data.poValidity}</Text>

                
                  </View>
                  <View style={styles.col}>
                   

                    <Text style={styles.label}>Contact Person Name</Text>
                    <Text style={styles.input}>{data.contactPersonName}</Text>

                    <Text style={styles.label}>
                      Contact Person Mobile Number
                    </Text>
                    <Text style={styles.input}>{data.contactPersonMobile}</Text>

                    <Text style={styles.label}>Contact Person Email Id</Text>
                    <Text style={styles.input}>{data.contactPersonEmail}</Text>

                    <Text style={styles.label}>Order Status</Text>
                    <Text style={styles.input}>{data.orderStatus}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.formGrid}>
                <View style={[styles.formRow,{ justifyContent:"space-around"}]}>
                  <View style={[styles.formRow,{alignItems:"center"}]}>
                    <Text style={styles.label}>Subject</Text>
                    <Text style={styles.input}>{data.subjectOfPo}</Text>
                    </View>
                    <View style={[styles.formRow,{alignItems:"center"}]}>
                    <Text style={styles.label}>Reference</Text>
                    <Text style={styles.input}>{data.referrenceSite}</Text>
                    </View>
                </View>
              </View>
            </View>
            <View style={styles.col}>
              <Text style={[styles.input, { textAlign: "justify" }]}>
                Dear Sir, As per telephonic conversation held with you with
                reference of Quotation and final negotiation with you date{" "}
                {formatDateCustom(new Date(data.quotationDate))} we are pleased to issuing a purchase order
                to your firm. The rate of material will be as per mention below
                details.
              </Text>
            </View>
            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell_small]}>S. No.</Text>
                {/* <Text style={[styles.tableCell_large]}>Material Category</Text> */}
                {/* <Text style={[styles.tableCell_large]}>Material Subcategory</Text> */}
                <Text style={[styles.tableCell_large]}>
                  Material Description
                </Text>
                <Text style={[styles.tableCell_small]}>UOM</Text>
                <Text style={[styles.tableCell, { textAlign: "right" }]}>
                  Quantity
                </Text>
                <Text style={[styles.tableCell, { textAlign: "right" }]}>
                  Rate
                </Text>
                <Text style={[styles.tableCell, { textAlign: "right" }]}>
                  Amount
                </Text>
                {/* <Text style={[styles.tableCell]}>Sgst</Text>
                <Text style={[styles.tableCell]}>Sgst Amount</Text>
                <Text style={[styles.tableCell]}>Cgst </Text>
                <Text style={[styles.tableCell]}>Cgst Amount</Text>
                <Text style={[styles.tableCell]}>Igst</Text>
                <Text style={[styles.tableCell]}>Igst Amount</Text> */}
                {/* <Text style={[styles.tableCell]}>Remark</Text> */}
              </View>

              {/* Table Body */}

              {tableData
                .slice(
                  pageIndex * MAX_ROWS_PER_PAGE,
                  (pageIndex + 1) * MAX_ROWS_PER_PAGE
                )
                .map((row, index) => (
                  // Add the amount to the total
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell_small}>{row.sNo}</Text>
                    <Text style={styles.tableCell_large}>
                      {row.materialCategory}/{row.materialSubCategory}/
                      {row.materialDescription}
                    </Text>
                    {/* <Text style={styles.tableCell_large}>
                      {}
                    </Text>
                    <Text style={styles.tableCell}>
                      {row.materialDescription}
                    </Text> */}
                    <Text style={styles.tableCell_small}>{row.uom}</Text>
                    <Text style={[styles.tableCell, { textAlign: "right" }]}>
                      {row.quantity}
                    </Text>
                    <Text style={[styles.tableCell, { textAlign: "right" }]}>
                      {row.rate}
                    </Text>
                    <Text style={[styles.tableCell, { textAlign: "right" }]}>
                      {row.amount}
                    </Text>
                    {/* <Text style={styles.tableCell}>{row.sgst}</Text>
                    <Text style={styles.tableCell}>{row.sgstamount}</Text>
                    <Text style={styles.tableCell}>{row.cgst}</Text>
                    <Text style={styles.tableCell}>{row.cgstamount}</Text>
                    <Text style={styles.tableCell}>{row.igst}</Text>
                    <Text style={styles.tableCell}>{row.igstamount}</Text> */}
                    {/* <Text style={styles.tableCell}>{row.remark}</Text> */}
                  </View>
                ))}

              {/* /// Total Amout */}
              <View style={[styles.formGrid, { marginTop: "10px" }]}>
                <View
                  style={[
                    styles.formRow,
                    {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0",
                      margin: "0",
                      marginLeft: "150px",
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.formRow,
                      { alignItems: "center", display: "flex" },
                    ]}
                  >
                    <Text style={[styles.input, { marginRight: "80px" }]}>
                      Total Quantity
                    </Text>
                    <Text style={[styles.label, { alignItems: "right" }]}>
                      {calculateTotalQuantity(tableData)}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.formRow,
                      { alignItems: "center", display: "flex" },
                    ]}
                  >
                    <Text style={[styles.input, { marginRight: "60px" }]}>
                      Total Amount
                    </Text>
                    <Text style={styles.label}>
                      {calculateTotalAmount(tableData)}
                    </Text>
                  </View>
                </View>

                <View
                  style={[
                    styles.formRow,
                    {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0",
                      margin: "0",
                    },
                  ]}
                >
                  <Text style={[styles.label, { marginLeft: "300px" }]}>
                    SGST
                  </Text>
                  <Text style={styles.label}>
                    {calculateTotalSgstAmount(tableData)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.formRow,
                    {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0",
                      margin: "0",
                    },
                  ]}
                >
                  <Text style={[styles.label, { marginLeft: "300px" }]}>
                    CGST
                  </Text>
                  <Text style={styles.label}>
                    {calculateTotalSgstAmount(tableData)}
                  </Text>
                </View>

                <View
                  style={[
                    styles.formRow,
                    {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0",
                      margin: "0",
                    },
                  ]}
                >
                  <Text style={[styles.label, { marginLeft: "300px" }]}>
                    IGST
                  </Text>
                  <Text style={styles.label}>
                    {calculateTotalIgstAmount(tableData)}
                  </Text>
                </View>
              </View>

              <View style={styles.formGrid}>
                <View
                  style={[
                    styles.formRow,
                    {
                      alignItems: "center",
                      display: "flex",
                      justifyContent: "space-between",
                      padding: "0",
                      margin: "0",
                    },
                  ]}
                >
                  <Text style={[styles.input, { marginLeft: "300px" }]}>
                    Total Landed Amount
                  </Text>
                  <Text style={styles.label}>
                    {calculateTotalAmount(tableData) +
                      calculateTotalSgstAmount(tableData) * 2 +
                      calculateTotalIgstAmount(tableData)}
                  </Text>
                </View>

                <SubTable data={tableData} />
              </View>
            </View>

            <View style={styles.formGrid}>
              {inputfields.map((field) => (
                <View style={styles.formRow}>
                  <View style={styles.col}>
                  <Text style={styles.label}>{field.label}</Text>
              
                  <Text style={styles.input}>{data[field.inputID]}</Text>

                </View>
                </View>
              ))}

<View>
  <Text style={[styles.input,{textAlign:"justify"}]}> 
<Text style={styles.label}>Jurisdictions:</Text>
 All disputes and claims will be mutually discussed and agreed upon at site level. In case of any difference of opinion, the decision of "Contracts Head" of LC Infra Project Pvt Ltd shall be final and binding. Arbitrators, if needed, shall be appointed by Carbyne Infrastructure Pvt. Ltd. in Delhi only. Any further dispute shall be settled in the courts of jurisdictions of Delhi. Vendor should dispatch the material within a week of TPI, in case of delay 2% deduction should be applicable.
</Text>
<Text style={[styles.input,{textAlign:"justify"}]}>
* Please send the original  copy of the Bill to our site office and one copy of the Bill to our Corporate Office along with a copy of PO.
</Text>
<Text style={[styles.input,{textAlign:"justify"}]}>
* We reserve the right to amend Items and quantity of items, Purchase order as per the requirement of Project/Department.
</Text>
</View>
            </View>

            <View style={[styles.footer_2,{marginTop:"30px"}]}>
              <View style={styles.formRow}>
                <View style={styles.col}>
                  <Text style={styles.label}>
                    Authorised Signature With Seal
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Prepared By</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Approved By</Text>
                </View>

                <View style={styles.col}>
                  <Text style={styles.label}>Accepted By Vendor</Text>
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
                fixed
              />
            </View>
          </Page>
        )})}
      </Document>
    );
    const pdfData = await pdf(<Fragment>{doc}</Fragment>).toBlob();
    saveAs(pdfData, `Purchase Order For ${data.msName}.pdf`);

    const formData = new FormData();
    formData.append(
      "pdfOfPurchaseOrder",
      pdfData,
      `Purchase Order For ${data.msName}.pdf`
    );
    formData.append("userId", userId  )
    formData.append("role", role )
    formData.append("userName", userName )
    formData.append("poId", data.poId  )
    console.log("Herereroke")
 
    let result = api.post("/update-purchaseOrder", formData);
    result = await errorHandler(result);
    console.log(result);
    setResponse(result.data.data)
    // workOrderId(result.data.data.workOrderId)
    // pdfStatus(result.data.data)
  };

  
  const handleSendEmail = async()=>{

    let result = api.post('/purchaseOrder-sendEmail', {userId, role, userName, poId:response.poId})
    result = await errorHandler(result)
    console.log(result.data)
    
    Swal.fire({
      icon:"success",
      title:"Successfully Email Sent",
      message:result.data.message
    })


  }

  return (
    <div
      style={{ justifyContent: "center", display: "flex", marginTop: "3rem" }}
    >
      <button className="btn" onClick={createPDF}>
        Download PDF
      </button>
      {
        response 
        &&
      <button className="btn" onClick={handleSendEmail}>
        Send Email 
      </button>
      }
    </div>
  );
};

export default MakePdfForPurchaseOrder;
