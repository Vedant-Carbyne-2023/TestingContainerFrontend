import React, { Fragment } from "react";
import {
  Document,
  Page,
  Text,
  StyleSheet,
  pdf,
  View,
  Image,
} from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { pdfjs } from "react-pdf";
import { currentDate } from "../../../CommonUtitlites/Others/commonExportVariable";

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

import image from "/carbyne.jpg";
import { api } from "../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../CommonUtitlites/Others/errorHandle";
import Swal from "sweetalert2";
import { formatDate } from "../../../CommonUtitlites/Others/formattingDateAndName";

// const MakePdfForMaterialIssueNote = async({ data }) => {
  // console.log(data);
  const createPDFForPR = async({ data })=> {
    const MAX_ROWS_PER_PAGE = 8; // Adjust this value as per your requirement
let tableData=data.tableData
    const totalPages = Math.ceil(tableData.length / MAX_ROWS_PER_PAGE);

    const styles = StyleSheet.create({
      container: {
        marginTop: "3px",
      },
      headerContainer: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      },
      page: {
        padding: "1cm",
      },
      heading: {
        fontSize: 25,
        fontWeight: "bolder",
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
        fontWeight: "bold",
        marginRight: 10,
        fontSize: "11px",
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
        fontSize: "13px",
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
        fontSize: "10px",
        width: "100%",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#000",
        marginBottom: "1rem",
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
      footer_2: {
        position: "absolute",
        bottom: 40,
        left: 0,
        right: 0,
        textAlign: "center",
        marginLeft: "30px",
      },
      pageNumber: {
        fontSize: 10,
        color: "gray",
      },
    });

    const doc = (
      <Document>
        {[...Array(totalPages)].map((_, pageIndex) => (
          <Page
            key={pageIndex}
            size="A4"
            orientation="landscape"
            style={styles.page}
          >
            <View style={styles.headerContainer}>
              <View style={styles.leftContent}>
                <Image src={image} style={styles.logo} />
              </View>
              <View style={styles.col}>
                <Text style={styles.heading}>
                  Carbyne Infrastructure Pvt. Ltd.
                </Text>
                <Text style={styles.subHeading}>Purchase Requisition</Text>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.formGrid}>
                <View style={styles.formRow}> 
                  <View style={styles.col}>
                    <Text style={styles.label}>Purchase Requisition Id :</Text>
                    <Text style={styles.input}>{data.prId}</Text>
                  </View>
                
                  <View style={styles.col}>
                    <Text style={styles.label}>Purchase Requester Name:</Text>
                    <Text style={styles.input}>{data.preparedBy}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Purchase Requisition Date:</Text>
                    <Text style={styles.input}>{formatDate(new Date(data.prDate))}</Text>
                  </View>
                  </View>
                  <View style={styles.formRow}>
                  <View style={styles.col}>
                    <Text style={styles.label}>Project:</Text>
                    <Text style={styles.input}>{data.projectName}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Project Code:</Text>
                    <Text style={styles.input}>{data.projectCode}</Text>
                  </View>
                  {/* <View style={styles.col}>
                    <Text style={styles.label}>Block:</Text>
                    <Text style={styles.input}>{data.block}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>GP:</Text>
                    <Text style={styles.input}>{data.gp}</Text>
                  </View> */}
                </View>
              </View>
            </View>

            <View style={styles.table}>
              {/* Table Header */}
              <View style={[styles.tableRow, styles.tableHeader]}>
                <Text style={[styles.tableCell]}>S.No.</Text>
                <Text style={[styles.tableCell]}>Material Category</Text>
                <Text style={[styles.tableCell]}>Material Subcategory</Text>
                <Text style={[styles.tableCell]}>Material Description</Text>
                <Text style={[styles.tableCell]}>UOM</Text>
                <Text style={[styles.tableCell]}>Quantity Requsted</Text>
                <Text style={[styles.tableCell]}>Remark</Text>
              </View>

              {/* Table Body */}
              {tableData
                .slice(
                  pageIndex * MAX_ROWS_PER_PAGE,
                  (pageIndex + 1) * MAX_ROWS_PER_PAGE
                )
                .map((row, index) => (
                  <View key={index} style={styles.tableRow}>
                    <Text style={styles.tableCell}>{index+1}</Text>
                    <Text style={styles.tableCell}>{row.materialCategory}</Text>
                    <Text style={styles.tableCell}>
                      {row.materialSubCategory}
                    </Text>
                    <Text style={styles.tableCell}>
                      {row.materialDescription}
                    </Text>
                    <Text style={styles.tableCell}>{row.uom}</Text>
                    <Text style={styles.tableCell}>{row.quantity}</Text>
                    <Text style={styles.tableCell}>{row.remark}</Text>
                  </View>
                ))}
            </View>
            <View style={styles.footer_2}>
            <View style={styles.formRow}>
                <View style={styles.col}>
                  <Text style={styles.label}>
                    Authorised Signature With Seal
                  </Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Prepared By</Text>
                  <Text style={styles.label}>{data.preparedBy}</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Approved By</Text>
                  <Text style={styles.label}>{data.approvedBy}</Text>
                </View>
                {/* <View style={styles.col}>
                  <Text style={styles.label}>Store Keeper</Text>
                </View>
                <View style={styles.col}>
                  <Text style={styles.label}>Recieved By</Text>
                </View> */}
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
        ))}
      </Document>
    );

 
   

    const pdfData = await pdf(<Fragment>{doc}</Fragment>).toBlob();
    saveAs(pdfData, `generatedPurchaseRequisition/${data.prId}/${Date.now()}.pdf`);
    return "Done";
  };

//   return (
//     <div
//       style={{ justifyContent: "center", display: "flex", marginTop: "3rem" }}
//     >
//       <button className="btn" onClick={createPDF}>
//         Download PDF
//       </button>
//     </div>
//   );
// };

export default createPDFForPR;
