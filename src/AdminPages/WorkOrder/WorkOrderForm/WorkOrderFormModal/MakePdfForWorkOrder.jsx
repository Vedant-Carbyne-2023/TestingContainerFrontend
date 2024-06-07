import React, { Fragment, useEffect } from "react";
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
import {
  currentDate,
  role,
  userId,
} from "../../../../CommonUtitlites/Others/commonExportVariable";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import image from "/carbyne.jpg";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import {
  formatDate,
  formatDateCustom,
} from "../../../../CommonUtitlites/Others/formattingDateAndName";
import Swal from "sweetalert2";

const MakePdfForWorkOrder = ({ data, tableData, toggle, onSubmitted }) => {
  Font.register({
    family: "Cambria W02 Regular",
    fonts: [
      {
        src: "/Cambria.ttf",
      },
    ],
  });
  Font.register({
    family: "Cambria Bold",
    fonts: [
      {
        src: "/Cambria Bold 700.ttf",
        fontWeight: 700,
      },
    ],
  });

  useEffect(() => {
    if (data) {
      createPDF();
    }
  }, [toggle]);

  // console.log(data);

  const createPDF = async () => {
    const MAX_ROWS_PER_PAGE = 12; // Adjust this value as per your requirement

    const totalPages = Math.ceil(tableData.length / MAX_ROWS_PER_PAGE);

    const styles = StyleSheet.create({
      container: {
        fontFamily: "Cambria W02 Regular",
        marginTop: "3px",
      },
      headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },

      heading: {
        fontSize: "20px",
        fontFamily: "Cambria Bold",
        marginRight: 0,
        marginTop: 0,
        paddingTop: 0,
        paddingRight: 0,
        marginBottom: 10,
      },
      subHeading: {
        fontFamily: "Cambria Bold",
        fontSize: 16,
        textAlign: "center",
        marginBottom: "20px",
      },
      label: {
        fontFamily: "Cambria Bold",
        fontWeight: "700",
        marginRight: 10,
        fontSize: "10px",
        marginBottom: "5px",
      },
      row: {
        fontFamily: "Cambria W02 Regular",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        flexDirection: "row",
        alignItems: "center",
      },
      column: {
        fontFamily: "Cambria W02 Regular",
        flexBasis: 0,
        flexGrow: 1,
        maxWidth: "100%",
        flexDirection: "column",
      },
      input: {
        fontSize: "10px",
        textAlign: "justify",
        fontFamily: "Cambria W02 Regular",
        marginBottom: "2px",
        padding: "4px 2px",
      },

      formGrid: {
        marginBottom: "5px",
        fontFamily: "Cambria W02 Regular",
      },
      formRow: {
        fontFamily: "Cambria W02 Regular",
        display: "flex",
        flexDirection: "row",
        marginBottom: "10px",
      },
      col: {
        flex: 1,
        fontFamily: "Cambria W02 Regular",
        flexDirection: "column",
        marginRight: "1rem",
      },
      col_3: {
        flex: 0.3,
        fontFamily: "Cambria W02 Regular",
        flexDirection: "column",
        marginRight: "1rem",
        justifyContent: "space-between",
        textAlign: "left",
      },
      row_3: {
        display: "flex",
        fontFamily: "Cambria W02 Regular",
        flexDirection: "row",
        justifyContent: "space-around",
        alignContent: "center",
        marginBottom: "10px",
      },
      table: {
        fontFamily: "Cambria W02 Regular",
        fontSize: "8px",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: "15px",
      },
      tableRow: {
        fontFamily: "Cambria W02 Regular",
        flexDirection: "row",
      },
      tableCell: {
        padding: "0.2cm",
        borderStyle: "solid",
        fontFamily: "Cambria W02 Regular",
        fontSize: "8px",
        borderWidth: 1,
        borderColor: "#000",
      },
      tableHeader: {
        backgroundColor: "#f0f0f0",
        fontWeight: "700",
      },
      logo: {
        width: 70,
        height: 70,
      },
      leftContent: {
        display: "flex",
        alignItems: "center",
      },
      footer: {
        position: "relative",
        bottom: 10,
        left: 0,
        right: 0,
        textAlign: "center",
      },
      pageNumber: {
        fontSize: 10,
        color: "gray",
      },
      gap: {
        marginBottom: "10px",
      },
      page: {
        padding: "1cm",
      },
      addressContainer: {
        flexDirection: "row",
        alignItems: "center", // Align items vertically within the container if needed
        // Other styles for the container
      },
    });

    try {
      const doc = (
        <Document>
          {[...Array(totalPages)].map((_, pageIndex) => {
            // console.log(totalPages);
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
                  {data.nameOfCompanyInAddress ==
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
                      {data.nameOfCompanyInAddress}
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
                <Text style={[styles.subHeading]}>Work Order</Text>
                <View style={[styles.formGrid,{textAlign:'center', justifyContent:"center", alignItems:"center"}]}>
            <Text style={styles.label}>Amend:  {data.amend}</Text>
            <Text style={styles.label}>Amend Date: {formatDate(new Date(data.amendDate))}</Text>
          </View>

                <View style={styles.container}>
      <View style={styles.formGrid}>
        <View style={styles.formRow}>
          <View style={styles.col}>
            <Text style={styles.label}>Name : M/S {data.name}</Text>
            <Text style={styles.label}>Address : {data.address}</Text>
          </View>
         
          <View style={styles.col}>
            <Text style={styles.label}>Work Order No : {data.workOrderId}</Text>
            <Text style={styles.label}>Work Order Date : {formatDateCustom(new Date(data.workOrderDate))}</Text>
            <Text style={styles.label}>Email Id : {data.emailId}</Text>
            <Text style={styles.label}>Mob. No : +91 {data.mobileNo}</Text>
          </View>
        </View>

        <View style={styles.formGrid}>
          <Text style={styles.label}>GSTIN No. : {data.gstInNo}</Text>
          <Text style={styles.label}>PAN No. : {data.panNo}</Text>
          <Text style={styles.label}>Kind Attn : {data.kindAttn}</Text>
        </View>

        <View style={styles.formRow}>
          <Text style={styles.label}>Subject : <Text style={styles.input}>{data.subject}</Text></Text>
        </View>

        <View style={styles.formRow}>
          <View style={styles.col}>
            <Text style={styles.input}>Dear sir,</Text>
            <Text style={styles.input}>
              As per your quotation dated {formatDateCustom(new Date(data.quotationDate))} and further discussion, We are pleased to issue work order, details as under:-
            </Text>
          </View>
        </View>
      </View>
    </View>

                <View style={styles.table}>
                  {/* Table Header */}
                  <View style={[styles.tableRow, styles.tableHeader]}>
                    <Text
                      style={[
                        styles.tableCell,
                        { fontFamily: "Cambria Bold", width: "40px" },
                      ]}
                    >
                      S.No.
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        { fontFamily: "Cambria Bold", width: "250px" },
                      ]}
                    >
                      Particulars
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        { fontFamily: "Cambria Bold", width: "50px" },
                      ]}
                    >
                      Unit
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        { fontFamily: "Cambria Bold", width: "80px" },
                      ]}
                    >
                      Quantity
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        { fontFamily: "Cambria Bold", width: "80px" },
                      ]}
                    >
                      Rate per UOM
                    </Text>
                    <Text
                      style={[
                        styles.tableCell,
                        { fontFamily: "Cambria Bold", width: "100px" },
                      ]}
                    >
                      Amount
                    </Text>
                  </View>

                  {/* Table Body */}
                  {tableData
                    .slice(
                      pageIndex * MAX_ROWS_PER_PAGE,
                      (pageIndex + 1) * MAX_ROWS_PER_PAGE
                    )
                    .map((row, index) => (
                      <View key={index} style={styles.tableRow}>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              fontFamily: "Cambria W02 Regular",
                              width: "40px",
                            },
                          ]}
                        >
                          {index + 1}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              fontFamily: "Cambria W02 Regular",
                              width: "250px",
                            },
                          ]}
                        >
                          {row.particulars}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              fontFamily: "Cambria W02 Regular",
                              width: "50px",
                            },
                          ]}
                        >
                          {row.showRatePerUOM === true ? "" : row.unit}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              fontFamily: "Cambria W02 Regular",
                              width: "80px",
                            },
                          ]}
                        >
                          {row.quantity}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              fontFamily: "Cambria W02 Regular",
                              width: "80px",
                            },
                          ]}
                        >
                          {row.unit_rate}
                        </Text>
                        <Text
                          style={[
                            styles.tableCell,
                            {
                              fontFamily: "Cambria W02 Regular",
                              width: "100px",
                            },
                          ]}
                        >
                          {row.total}
                        </Text>
                      </View>
                    ))}
                </View>

                <View style={styles.formRow}>
                  <View style={styles.col}>
                    <Text style={styles.label}>Terms And Conditions</Text>
                  </View>
                </View>
                <View style={styles.col}>
                  {[
                    { label: "Scope of Work", value: data.scopeOfWork },
                    { label: "Price Basis", value: data.priceBasis },
                    { label: "Taxes and Duties", value: data.taxesAndDuties },
                    { label: "Payment Terms", value: data.paymentTerms },
                    {
                      label: "Work Completion Schedule",
                      value: data.workCompletionSchedule,
                    },
                    {
                      label: "Key Material Procurement",
                      value: data.keyMaterialsProcurement,
                    },
                    { label: "Inspections", value: data.inspections },
                    {
                      label: "Defect Liability Period",
                      value: data.defectLiabilityPeriod,
                    },
                    {
                      label: "Safety Requirements",
                      value: data.safetyRequirements,
                    },
                    {
                      label: "Statutory Requirements",
                      value: data.statutoryRequirements,
                    },

                    { label: "Dispute - Resolution", value: data.other },
                    {
                      label: "Performance And Termination",
                      value: data.performanceAndTermination,
                    },
                    {
                      label: "Company Provided Materials",
                      value: data.transportation,
                    },
                  ]
                    .filter((item) => item.value !== null && item.value !== "") // Filter out non-empty values
                    .map((item, index) => (
                      <React.Fragment key={index}>
                        <Text style={styles.label}>{`${index + 1}. ${
                          item.label
                        }:`}</Text>
                        <Text style={[styles.input, { lineHeight: "1.5" }]}>
                          {item.value}
                        </Text>
                        <Text style={styles.gap}></Text>
                      </React.Fragment>
                    ))}

                  <View key={"footerView"} style={[styles.footer]}>
                    {/* Footer content */}
                    <View
                      style={[
                        styles.formRow,
                        { justifyContent: "space-between" },
                      ]}
                    >
                      <View style={styles.col}>
                        <Text style={[styles.label, { textAlign: "left" }]}>
                          Billing Address
                        </Text>
                        <Text style={[styles.input]}>
                          {data.billingAddress}
                        </Text>
                      </View>
                      <View style={[styles.col, { justifyContent: "center" }]}>
                        <Text style={[styles.label]}>
                          {data.nameOfCompanyInAddress}
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.label, { textAlign: "left" }]}>
                      Delivery Address
                    </Text>
                    <View
                      style={[
                        styles.formRow,
                        { justifyContent: "space-between" },
                      ]}
                    >
                      <View style={[styles.col]}>
                        <Text style={[styles.input]}>
                          {data.deliveryAddress}
                        </Text>
                      </View>
                      <View style={[styles.col, { justifyContent: "center" }]}>
                        <Text style={[styles.label]}>Authorized Signatory</Text>
                      </View>
                    </View>

                    <Text
                      style={[
                        styles.label,
                        { textAlign: "left", paddingTop: "100px" },
                      ]}
                    >
                      Vendor Acceptance
                    </Text>
                  </View>
                </View>

                {/* <View style={styles.footer}>
                  <Text
                    style={styles.pageNumber}
                    render={({ pageNumber, totalPages }) =>
                      `${pageNumber} / ${totalPages}`
                    }
                    fixed
                  />
                </View> */}

                {/* 
          
              <Text
                style={styles.pageNumber}
                render={({ pageNumber, totalPages }) =>
                  `${pageNumber} / ${totalPages}`
                }
                fixed
              />
             */}
              </Page>
            );
          })}
        </Document>
      );

      const pdfData = await pdf(<Fragment>{doc}</Fragment>).toBlob();
      saveAs(pdfData, "WorkOrder.pdf");

      const formData = new FormData();
      formData.append(
        "pdfOfWorkOrder",
        pdfData,
        data.amend?
        `WorkOrderFor${data.workOrderId}${data.amend}.pdf`
        :
        `WorkOrderFor${data.workOrderId}.pdf`
      );
      formData.append("workOrderId", data.workOrderId);
      if(data.amend)
      {

        formData.append("amend", data.amend);
      }
      

      let result = api.post("/update-workOrder", formData);
      result = await errorHandler(result);
      // console.log(result);
      onSubmitted(result.data.data._id)
      // pdfStatus(result.data.data)

      Swal.fire({
        title:"Successfully Generated WorkOrder",
        timer:1000
      })
      // workOrderId(result.data.data.workOrderId)
    } catch (error) {
      // console.log(error);
      alert("Error Occured", error);
    }
  };

  return (
    <div
      style={{ justifyContent: "center", display: "flex", marginTop: "3rem" }}
    ></div>
  );
};

export default MakePdfForWorkOrder;
