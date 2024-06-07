import React, { useRef } from "react";
import PropTypes from "prop-types";
import html2pdf from "html2pdf.js";
const CustomModalPDF = ({
  isOpen,
  title,
  onClose,
  onSubmit,
  size,
  children,
  height
}) => {
  if (!isOpen) {
    return null;
  }

  const modalClassName = isOpen ? "modal open" : "modal";
  const modalDialogClasses = `modal-dialog ${
    size == "large" ? "modal-lg" : "xl" ? "modal-xl" : ""
  }`;

  const createPDF = () => {
    let childrenDiv = document.querySelector(".modal-body");
    let contentDiv = childrenDiv.querySelector(".form-grid");

    const clonedContentDiv = contentDiv.cloneNode(true);


    let finalDiv = document.createElement("div");
    finalDiv.append(clonedContentDiv);
    const wrapperDiv = document.createElement("div");
    
    wrapperDiv.style.margin = "1rem";
    wrapperDiv.appendChild(finalDiv);

    // console.log(finalDiv);

    const options = {
      image: { type: "jpeg", quality: 1 }, // Set image type and quality
      html2canvas: { scale: 2 }, // Adjust the scale of the HTML content
      jsPDF: { format: "a4", orientation: "landscape" }, // Set the PDF format and orientation
      margin: [5, 5, 5, 5],
    };
    // Generate the PDF from the form data
    html2pdf()
      .set(options)
      .from(wrapperDiv)
      .set({ dpi: 600 })
      .save("content.pdf");
  };

  return (
    <div>
      <div className={modalClassName} style={{ display: "block" }}>
        <div className={modalDialogClasses}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="close" onClick={onClose}>
                <span>&times;</span>
              </button>
            </div>
            <div className="modal-body" id="children">
              {children}
            </div>
            <div className="modal-footer">
              {/* <button
                type="button"
                className="btn btn-secondary"
                onClick={createPDF}
              >
                {" "}
                Save Pdf{" "}
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

CustomModalPDF.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default CustomModalPDF;
