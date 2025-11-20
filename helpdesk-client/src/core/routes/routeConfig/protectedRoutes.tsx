import { lazy } from "react";
import { Roles, Routes } from "../../../utils/constant";
import Category from "../../../pages/Admin/Category";
import CreateCategory from "../../../pages/Admin/CreateCategory";
import Priority from "../../../pages/Admin/Priority";
import CreatePriority from "../../../pages/Admin/CreatePriority";
import Status from "../../../pages/Admin/Status";
import CreateStatus from "../../../pages/Admin/CreateStatus";
// --- Lazy Imports (Code Splitting) ---
const AdminDashboard = lazy(() => import("../../../pages/Admin/Dashboard"));
const AgentDashboard = lazy(() => import("../../../pages/Agent/Dashboard"));
const UserDashboard = lazy(() => import("../../../pages/User/Dashboard"));

const CreateTicket = lazy(() => import("../../../pages/User/CreateTicket"));
const UserMyTicket = lazy(() => import("../../../pages/User/MyTicket"));
const TicketDetailsPage = lazy(
  () => import("../../../pages/User/TicketDetail")
);

const MyAgentTickets = lazy(() => import("../../../pages/Agent/MyTicketsPage"));
const AllTickets = lazy(() => import("../../../pages/Agent/AllTicketsPage"));
const Users = lazy(() => import("../../../pages/Admin/Users"));
const CreateUser = lazy(() => import("../../../pages/Admin/CreateUser"));
// --- Protected Routes ---
export const protectedRoutes = [
  // 🧑‍💻 User Routes
  {
    path: Routes.USER_DASHBOARD,
    element: <UserDashboard />,
    roles: [Roles.USER],
  },
  {
    path: Routes.USER_TICKET_CREATE,
    element: <CreateTicket />,
    roles: [Roles.USER],
  },
  {
    path: Routes.USER_TICKET_UPDATE,
    element: <CreateTicket />,
    roles: [Roles.USER],
  },
  {
    path: Routes.USER_MY_TICKET_LIST,
    element: <UserMyTicket />,
    roles: [Roles.USER],
  },
  {
    path: Routes.USER_TICKET_DETAIL,
    element: <TicketDetailsPage />,
    roles: [Roles.USER],
  },

  // 🧑‍🔧 Agent Routes
  {
    path: Routes.AGENT_DASHBOARD,
    element: <AgentDashboard />,
    roles: [Roles.AGENT],
  },
  {
    path: Routes.AGENT_MY_TICKET,
    element: <MyAgentTickets />,
    roles: [Roles.AGENT],
  },
  {
    path: Routes.AGENT_ALL_TICKET_LIST,
    element: <AllTickets />,
    roles: [Roles.AGENT],
  },
  {
    path: Routes.AGENT_TICKET_DETAIL,
    element: <TicketDetailsPage />,
    roles: [Roles.AGENT],
  },

  // 🧑‍🏫 Admin Routes
  {
    path: Routes.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_USER_LIST,
    element: <Users />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_USER_CREATE,
    element: <CreateUser />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_USER_EDIT,
    element: <CreateUser />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_CATEGORY_LIST,
    element: <Category />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_CATEGORY_CREATE,
    element: <CreateCategory />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_CATEGORY_EDIT,
    element: <CreateCategory />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_PRIORITY_LIST,
    element: <Priority />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_PRIORITY_CREATE,
    element: <CreatePriority />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_PRIORITY_EDIT,
    element: <CreatePriority />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_STATUS_LIST,
    element: <Status />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_STATUS_CREATE,
    element: <CreateStatus />,
    roles: [Roles.ADMIN],
  },
  {
    path: Routes.ADMIN_STATUS_EDIT,
    element: <CreateStatus />,
    roles: [Roles.ADMIN],
  },
];
