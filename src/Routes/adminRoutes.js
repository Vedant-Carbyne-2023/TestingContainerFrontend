import React, { lazy, Suspense } from 'react';
import VendorApprovalPage from '../AdminPages/VendorProfiles/VendorApprovalPage';
import ContractorApprovalPage from '../AdminPages/VendorProfiles/ContractorPart/ContractorApprovalPage';

// const Indents = lazy(() => import('../UserComponents/Indents.jsx'));
const Organisation = lazy(() => import('../AdminPages/Organisations/Organisation'));
const Member = lazy(() => import('../AdminPages/Members/Member'));
const PermissionsAndRoles = lazy(() => import('../AdminPages/Permissions&Rules/PermissionsAndRules'));
const BOM = lazy(() => import('../AdminPages/BOM_BOQ/Bom'));
const MaterialDatabase = lazy(() => import('../AdminPages/MaterialDatabase/MaterialDatabase'));
const MachineDatabase = lazy(() => import('../AdminPages/MachineDatabase/MachineDatabase'));
const ProjectForm = lazy(() => import('../AdminPages/ProjectDatabase/ProjectForm'));
const VendorForm = lazy(() => import('../AdminPages/VendorProfiles/VendorForm'));
const VendorProfile = lazy(() => import('../AdminPages/VendorProfiles/VendorProfile'));
const Indents = lazy(() => import('../AdminPages/MaterialRequisition/Indents'));
const Inventory = lazy(() => import('../AdminPages/Inventory/Inventory'));
const GRN = lazy(() => import('../AdminPages/GRN/GRN'));
const PurchaseOrder = lazy(() => import('../AdminPages/PurchaseOrder/PurchaseOrder'));
const Project = lazy(() => import('../AdminPages/Projects/Projects/Project'));
const AdminTasks = lazy(() => import('../AdminPages/AdminTasks/AdminTasks'));
const PasswordRequests = lazy(() => import('../AdminPages/PasswordRequests/PasswordRequests'));
const ProjectDashboard = lazy(() => import('../AdminPages/Projects/ProjectDashboard/ProjectDashboard'));
const Profile = lazy(() => import('../CommonUtitlites/UserNavbar/Profile'));
const Comparision = lazy(() => import('../AdminPages/PurchaseOrder/ComparisionStatement/Comparision'));
const WorkOrder = lazy(() => import('../AdminPages/WorkOrder/WorkOrder'));
const ContractorForm = lazy(() => import('../AdminPages/VendorProfiles/ContractorPart/ContractorForm'));
const ContractorProfile = lazy(() => import('../AdminPages/VendorProfiles/ContractorPart/ContractorProfile'));
const StockReport = lazy(() => import('../AdminPages/StockReport/StockReport'));
const StockReportTillDate = lazy(() => import('../AdminPages/StockReportTillDate/StockReportTillDate'));
const Logs = lazy(() => import('../AdminPages/Loggs/Logs'));
const OrderApprovals = lazy(() => import('../AdminPages/OrderApprovals/OrderApprovals'));
const DropBox = lazy(() => import('../AdminPages/DropBox/DropBox'));
const OpsBoq = lazy(() => import('../UserPages/Operational_Boq/Ops_Boq'));
const Dpr_Main_Form = lazy(() => import('../DprPages/pages/Dpr_Main_Form'));
const Dpr_Vendor_Page = lazy(() => import('../DprPages/pages/Dpr_Vendor_Page'));
const Dpr_Change_Request = lazy(() => import('../DprPages/pages/Changes/Dpr_Change_Request'));
const Dpr_Gp_Approval_Status = lazy(() => import('../DprPages/pages/GpStatus/Dpr_Gp_Approval_Status'));
const Dpr_Excel_Download = lazy(() => import('../DprPages/pages/Dpr_Excel_Download'));
const Dpr_Mis_Report = lazy(() => import('../DprPages/pages/DailyData/Dpr_Mis_Report'));
const Dpr_Daily_Report = lazy(() => import('../DprPages/pages/DPRDaily/Dpr_Daily_Report'));
const Dpr_Consolidate_Report = lazy(() => import('../DprPages/pages/Consolidate/Dpr_Consolidate_Report'));
const Testing = lazy(() => import('../AdminPages/Testing'));



export const routes1 = [
    { path: "organisation", element: Organisation  },
    { path: "projects", element: Project },
    { path: "members", element: Member },
    { path: "permissions&roles", element: PermissionsAndRoles  },
    { path: "bom", element:BOM  },
    { path: "inventory", element: Inventory },
    { path: "grn", element:GRN  },
    { path: "purchaseOrder", element: PurchaseOrder  },
    { path: "indent", element: Indents  },
    { path: "projectDashboard", element: ProjectDashboard  },
    { path: "vendorForm", element:VendorForm  },
    { path: "contractorForm", element: ContractorForm  },
    // { path: "/taskView", element: <TaskView /> },
    { path: "projectList", element: ProjectForm  },
    { path: "materialDatabase", element: MaterialDatabase  },
    { path: "machineDatabase", element: MachineDatabase  },
    { path: "vendorProfile", element: VendorProfile },
    { path: "contractorProfile", element:ContractorProfile  },
    { path: "user_profile", element:Profile  },
    { path: "comparisionStatement", element: Comparision  },
    { path: "workOrder", element: WorkOrder  },
    { path: "admin_tasks", element: AdminTasks},
    { path: "stockReport", element: StockReport},
    { path: "stockReportTillDate", element: StockReportTillDate},
    { path: "password_requests", element: PasswordRequests},
    { path: "logs", element: Logs},
    { path: "approvals", element: OrderApprovals},
    { path: "dropbox", element: DropBox},
    { path: "operational_boq", element: OpsBoq  },
    { path: "dpr_main_form", element: Dpr_Main_Form  },
    { path: "dpr_vendor_page", element: Dpr_Vendor_Page  },
    { path: "dpr_gp_approval_status", element: Dpr_Gp_Approval_Status  },
    { path: "dpr_daily_report", element: Dpr_Daily_Report  },
    { path: "dpr_mis_report", element: Dpr_Mis_Report  },
    { path: "dpr_consolidate_report", element: Dpr_Consolidate_Report  },
    { path: "dpr_excel_download", element: Dpr_Excel_Download  },
    { path: "dpr_change_request", element: Dpr_Change_Request  },
    { path: "vendorapproval", element: VendorApprovalPage  },
    { path: "contractorapproval", element: ContractorApprovalPage  },
    { path: "testing", element: Testing  },
];
