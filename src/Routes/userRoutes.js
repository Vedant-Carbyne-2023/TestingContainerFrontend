import React, { lazy, Suspense } from 'react';

// const Indents = lazy(() => import('../UserComponents/Indents.jsx'));
const UserIndents = lazy(() => import('../UserPages/UserIndent(MR)/UserIndents'));
const UserGrn = lazy(() => import('../UserPages/UserGatePass/UserGrn'));
const UserTasks = lazy(() => import('../UserPages/UserTasks/UserTasks'));
const UserInventory = lazy(() => import('../UserPages/UserInventory/UserInventory'));
const Profile = lazy(() => import('../CommonUtitlites/UserNavbar/Profile'));
const UserMaterialRequisition = lazy(() => import('../UserPages/UserIndent(MR)/UserMaterialRequisition'));
const UserPurchaseRequisition = lazy(() => import('../UserPages/UserIndent(MR)/UserPurchaseRequisition'));
const UserReturnToStore = lazy(() => import('../UserPages/UserIndent(MR)/UserReturnToStore'));
const UserContractorProfile = lazy(() => import('../UserPages/VendorProfiles/ContractorPart/ContractorProfile'));
const UserVendorProfile = lazy(() => import('../UserPages/VendorProfiles/VendorProfile'));
const UserMaterialTransferOrder = lazy(() => import('../UserPages/UserInventory/UserMaterialTransferOrder'));
const UserMaterialIssueNote = lazy(() => import('../UserPages/UserInventory/UserMaterialIssueNote'));
const UserMaterialRecieptNote = lazy(() => import('../UserPages/UserInventory/UserMaterialRecieptNote'));
const UserMaterialDatabase = lazy(() => import('../UserPages/MaterialDatabase/MaterialDatabase'));
const UserProjectForm = lazy(() => import('../UserPages/ProjectDatabase/ProjectForm'));
const UserMember = lazy(() => import('../UserPages/Members/UserMember'));
const UserInventoryStockReport = lazy(() => import('../UserPages/UserInventory/UserInventoryStockReport'));
const UserPurchaseQuotation = lazy(() => import('../UserPages/PurchaseOrder/UserPurchaseQuotation'));
const UserComparisionStatement = lazy(() => import('../UserPages/PurchaseOrder/UserComparisionStatement'));
const UserPurchaseOrder = lazy(() => import('../UserPages/PurchaseOrder/UserPurchaseOrder'));
const CompleteStockReportTillDate = lazy(() => import('../UserPages/StockReportTillDate/CompleteStockReportTillDate'));
const UserWorkOrder = lazy(() => import('../UserPages/WorkOrder/UserWorkOrder'));
const UserOrganisation = lazy(() => import('../UserPages/Organisations/UserOrganisation'));
const UserProject = lazy(() => import('../UserPages/Projects/Projects/Project'));
const UserProjectDashboard = lazy(() => import('../UserPages/Projects/ProjectDashboard/ProjectDashboard'));
const UserVendorForm = lazy(() => import('../UserPages/VendorProfiles/VendorForm'));
const UserContractorForm = lazy(() => import('../UserPages/VendorProfiles/ContractorPart/ContractorForm'));
const UserBOM = lazy(() => import('../UserPages/BOM_BOQ/Bom'));
const ChangePassword = lazy(() => import('../CommonUtitlites/UserNavbar/ChangePassword'));
const ChangeEmail = lazy(() => import('../CommonUtitlites/UserNavbar/ChangeEmail'));
const CombineFile = lazy(() => import('../UserPages/JMR and Hydrotest/CombineFile'));
const OpsBoq = lazy(() => import('../UserPages/Operational_Boq/Ops_Boq'));
const JmrSupply = lazy(() => import('../UserPages/JMR and Hydrotest/New Jmr Supply/JmrSupply'));
const Dpr_Main_Form = lazy(() => import('../DprPages/pages/Dpr_Main_Form'));
const Dpr_Vendor_Page = lazy(() => import('../DprPages/pages/Dpr_Vendor_Page'));
const Dpr_Change_Request = lazy(() => import('../DprPages/pages/Changes/Dpr_Change_Request'));
const Dpr_Gp_Approval_Status = lazy(() => import('../DprPages/pages/GpStatus/Dpr_Gp_Approval_Status'));
const Dpr_Excel_Download = lazy(() => import('../DprPages/pages/Dpr_Excel_Download'));
const Dpr_Mis_Report = lazy(() => import('../DprPages/pages/DailyData/Dpr_Mis_Report'));
const Dpr_Daily_Report = lazy(() => import('../DprPages/pages/DPRDaily/Dpr_Daily_Report'));
const Dpr_Consolidate_Report = lazy(() => import('../DprPages/pages/Consolidate/Dpr_Consolidate_Report'));



export const routes2 = [
  { path: "indents", element: UserIndents, permission:"Indents" },
  { path: "indents/:id",element: UserIndents, permission:"Indents"},
    { path:"member/:id", element: UserMember, permission:"Member"},
  { path: "material requistion/:id", element: UserMaterialRequisition, permission:"Material Requistion" },
  { path: "purchase requistion/:id", element: UserPurchaseRequisition, permission:"Purchase Requistion" },
  // { path: "/user_material issue note/:id", element: <UserInventory /> },
  { path: "return to store/:id", element: UserReturnToStore, permission:"Return To Store" },
  // { path: "/user_purchaseOrder", element: <UserPo /> },
  { path: "inventory", element: UserInventory},
  { path: "material transfer order/:id", element: UserMaterialTransferOrder, permission:"Material Transfer Order" },
  { path: "material issue note/:id", element: UserMaterialIssueNote, permission:"Material Issue Note"},
  { path: "material reciept note/:id", element: UserMaterialRecieptNote, permission:"Material Reciept Note" },
  { path: "grn/:id", element: UserGrn, permission:"Grn" },
  
  { path: "vendorProfile/:id", element: UserVendorProfile, permission:"Vendor Form"},
  { path: "vendor form/:id", element: UserVendorForm, permission:"Vendor Form"},

  { path: "contractor form/:id", element: UserContractorForm, permission:"Contractor Form" },
  { path: "contractorProfile/:id", element: UserContractorProfile, permission:"Contractor Form" },

  { path: "material database/:id", element: UserMaterialDatabase, permission:"Material Database" },
  { path: "location database/:id", element: UserProjectForm, permission:"Location Database" },
  { path: "inventory stock report/:id", element: UserInventoryStockReport, permission:"Inventory Stock Report" },
  { path: "purchase quotation/:id", element: UserPurchaseQuotation, permission:"Purchase Quotation" },
  { path: "comparision statement/:id", element: UserComparisionStatement, permission:"Comparision Statement" },
  { path: "purchase order/:id", element: UserPurchaseOrder, permission:"Purchase Order" },
  { path: "profile/hello", element: Profile },
  { path: "tasks", element: UserTasks},
  { path: "stock report/:id", element: CompleteStockReportTillDate},
  { path: "work order/:id", element: UserWorkOrder, permission:"Work Order"},
  { path: "material transfer order/:id", element: UserMaterialTransferOrder, permission:"Material Transfer Order"},
  { path: "organisation/:id", element: UserOrganisation, permission:"Organisation"},
  { path: "project/:id", element: UserProject, permission:"Project"},
  { path: "projectDashboard", element: UserProjectDashboard, permission:"Project" },
  { path: "boq/:id", element: UserBOM, permission:"Boq" },
  { path: "profile/changePassword", element: ChangePassword },
  { path: "profile/changeEmail", element: ChangeEmail },
  { path: "jmr_hydrotest/:id", element: CombineFile  },
  { path: "operational_boq/:id", element: OpsBoq  },
  { path: "jmr_supply", element: JmrSupply  },
  { path: "dpr_main_form/:id", element: Dpr_Main_Form  },
  { path: "dpr_vendor_page/:id", element: Dpr_Vendor_Page  },
  { path: "dpr_gp_approval_status/:id", element: Dpr_Gp_Approval_Status  },
  { path: "dpr_daily_report/:id", element: Dpr_Daily_Report  },
  { path: "dpr_mis_report/:id", element: Dpr_Mis_Report  },
  { path: "dpr_consolidate_report/:id", element: Dpr_Consolidate_Report  },
  { path: "dpr_excel_download/:id", element: Dpr_Excel_Download  },
  { path: "dpr_change_request/:id", element: Dpr_Change_Request  },
  
];
