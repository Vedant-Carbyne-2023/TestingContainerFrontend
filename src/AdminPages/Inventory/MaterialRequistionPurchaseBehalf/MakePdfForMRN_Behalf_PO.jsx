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

const MakePdfForMRN_Behalf_PO = ({ data }) => {
  const createPDF = async () => {
    const MAX_ROWS_PER_PAGE = 10; // Adjust this value as per your requirement

    const tableData = data.tableData;
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
                <Text style={styles.subHeading}>Material Issue Note</Text>
              </View>
            </View>

            <View style={styles.container}>
              <View style={styles.formGrid}>
                <View style={styles.formRow}>
                  <View style={styles.col}>
                    <Text style={styles.label}>MRN Date:</Text>
                    <Text style={styles.input}>{data.mrnDate}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>PO Number:</Text>
                    <Text style={styles.input}>{data.poNumber}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Vendor Name:</Text>
                    <Text style={styles.input}>{data.vendorName}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Invoice Number:</Text>
                    <Text style={styles.input}>{data.invoiceNumber}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Invoice Date:</Text>
                    <Text style={styles.input}>{data.invoiceDate}</Text>
                  </View>
                  </View>
                  <View style={styles.formRow}>
                  <View style={styles.col}>
                    <Text style={styles.label}>Transporter Name:</Text>
                    <Text style={styles.input}>{data.transporterName}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>GR Date:</Text>
                    <Text style={styles.input}>{data.grDate}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>GR Document File Key:</Text>
                    <Text style={styles.input}>{data.grDocumentFileKey}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Vehicle Number:</Text>
                    <Text style={styles.input}>{data.vehicleNumber}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Eway Bill Number:</Text>
                    <Text style={styles.input}>{data.ewayBillNumber}</Text>
                  </View>
                  </View>
                  <View style={styles.formRow}>
                  <View style={styles.col}>
                    <Text style={styles.label}>Storage Location:</Text>
                    <Text style={styles.input}>{data.storageLocation}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>MRN Contractor Name:</Text>
                    <Text style={styles.input}>{data.mrnContractorName}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>MRN GP Name:</Text>
                    <Text style={styles.input}>{data.mrnGpName}</Text>
                  </View>
                  <View style={styles.col}>
                    <Text style={styles.label}>Remark:</Text>
                    <Text style={styles.input}>{data.remark}</Text>
                  </View>
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
                <Text style={[styles.tableCell]}>Quantity In PO</Text>
                <Text style={[styles.tableCell]}>Quantity Recieved</Text>
                <Text style={[styles.tableCell]}>Quantity Balance</Text>
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
                    <Text style={styles.tableCell}>{row.sNo}</Text>
                    <Text style={styles.tableCell}>{row.materialCategory}</Text>
                    <Text style={styles.tableCell}>
                      {row.materialSubCategory}
                    </Text>
                    <Text style={styles.tableCell}>
                      {row.materialDescription}
                    </Text>
                    <Text style={styles.tableCell}>{row.uom}</Text>
                    <Text style={styles.tableCell}>{row.quantity}</Text>
                    <Text style={styles.tableCell}>{row.quantity_received}</Text>
                    <Text style={styles.tableCell}>{row.quantity_balance}</Text>
                    <Text style={styles.tableCell}>{row.remark}</Text>
                  </View>
                ))}
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
    saveAs(pdfData, "generated.pdf");
  };

  return (
    <div
      style={{ justifyContent: "center", display: "flex", marginTop: "3rem" }}
    >
      <button className="btn" onClick={createPDF}>
        Download PDF
      </button>
    </div>
  );
};

export default MakePdfForMRN_Behalf_PO;
