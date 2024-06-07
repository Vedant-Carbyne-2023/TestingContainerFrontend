import React, { useEffect, useState, useRef } from "react";
import { api } from "../../../../CommonUtitlites/AxiosSetup/axiosDefault";
import { errorHandler } from "../../../../CommonUtitlites/Others/errorHandle";
import { formatDate } from "../../../../CommonUtitlites/Others/formattingDateAndName";
import CustomModal from "../../../../CommonUtitlites/ModalPopUp/CustomModal";
import Loader from "../../../../CommonUtitlites/Loader/Loader";
import {
  role,
  userId,
  userName,
} from "../../../../CommonUtitlites/Others/commonExportVariable";
import MiddleWareForPrintForWorkOrderModal from "../WorkOrderFormModal/MiddleWareForPrintModal";
import useGetAllProjectsForAdmin from "../../../../CommonUtitlites/customHooks/useGetAllProjectsForAdmin";
import TableWithPaginationAndFilter from "../../../../CommonUtitlites/TableHavingFilter/TableWithPaginationAndFilter";

export default function WorkOrderTable({ amend_permission }) {
  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState("");
  const projects = useGetAllProjectsForAdmin();

  const [totalPages, setTotalPages] = useState(0);
  const [pageOccupied, setPageOccupied] = useState(1);
  const [handleSearch, setHandleSearch] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);

  const [workOrder, setWorkOrder] = useState("");

  const handleOpenModal = async (id, amend) => {
    // setLoading(true);
    console.log(id, amend);
    let result = api.post("/get-workOrder-by-id", {
      userId,
      role,
      userName,
      workOrderId: id,
      amend: amend,
    });
    result = await errorHandler(result);
    setWorkOrder(result.data.data);
    // alert(result.data.message)
    setIsModalOpen(true);
    // setLoading(false);
  };

  

  return (
    <>
       

        {loading ? (
          <Loader />
        ) : (
          <>
            <TableWithPaginationAndFilter
              apiRoute={"/get-all-workOrder"}
              toggle={toggle}
              projects={projects}
              setHandleSearch={(data)=>setHandleSearch(data)}
              handleSearch={handleSearch}
              headers={[
                {
                  label: "Work Order Id",
                  field: "workOrderId",
                  renderItem: (item) =>
                    item && (
                      <button
                        className="btn btn-link text-left"
                        onClick={() =>
                          handleOpenModal(item.workOrderId, item.amend)
                        }
                      >
                        {item.workOrderId}
                      </button>
                    ),
                },
                {
                  label: "Amend",
                  field: "amend",
                  renderItem: (item) => item && `Amend: ${item.amend}`,
                },
                {
                  label: "Work Order Date",
                  field: "workOrderDate",
                  renderItem: (item) =>
                    item && formatDate(new Date(item.workOrderDate)),
                },
                {
                  label: "Vendor Name",
                  field: "vendorName",
                  renderItem: (item) => item && item.vendorName,
                },
                {
                  label: "Download PDF",
                  field: "pdfOfWorkOrder",
                  renderItem: (item) =>
                    item && (
                      <a
                        href={item.pdfOfWorkOrder}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Download PDF
                      </a>
                    ),
                },
                {
                  label: "Send Email",
                  field: "sendEmail",
                  renderItem: (item) =>
                    item && item.isApproved ? (
                      item && (
                        <button
                          className="btn btn-primary"
                          // onClick={() => handleComparision(item.prId)}
                          disabled={item.emailId === ""}
                        >
                          <i className="fa fa-envelope mr-3"></i>
                          Send Email
                        </button>
                      )
                    ) : (
                      <span>Not approved</span>
                    ),
                },
              ]}
              loading={loading}
              handleOpenModal={handleOpenModal}
              // handleComparision={handleComparision}
              amend_permission={amend_permission}
              totalPages={totalPages}
              pageOccupied={pageOccupied}
              setPageOccupied={setPageOccupied}
            />
          </>
        )}
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={"Work Order Info"}
          size={"xl"}
        >
          {workOrder && (
            <MiddleWareForPrintForWorkOrderModal
              amend_permission={amend_permission}
              workOrder={workOrder}
              isToggle={(toggle) => setToggle(toggle)}
            />
          )}
        </CustomModal>
    </>
  );
}
