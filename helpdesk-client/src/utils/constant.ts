export const Routes = {
  LOGIN: "/login",
  LANDING: "/",
  USER_DASHBOARD: "/User/Dashboard",
  ADMIN_DASHBOARD: "/Admin/Dashboard",
  AGENT_DASHBOARD: "/Agent/Dashboard",
  USER_TICKET_CREATE: "/User/Ticket/Create",
  SIGN_UP: "/signup",
  USER_MY_TICKET_LIST: "/User/Ticket",
  USER_TICKET_DETAIL: "/User/Ticket/Detail/:id",
  USER_TICKET_UPDATE: "/User/Ticket/Update/:id",
  AGENT_MY_TICKET: "/Agent/MyTicket",
  AGENT_TICKET_DETAIL: "/Agent/Ticket/Detail/:id",
  AGENT_ALL_TICKET_LIST: "/Agent/Tickets",
  ADMIN_USER_LIST: "/Manage/Users",
  ADMIN_USER_CREATE: "/Manage/Users/Create",
  ADMIN_USER_EDIT: "/Manage/Users/Edit/:id",
  ADMIN_CATEGORY_LIST: "/Manage/Category",
  ADMIN_CATEGORY_CREATE: "/Manage/Category/Create",
  ADMIN_CATEGORY_EDIT: "/Manage/Category/Edit/:id",
  ADMIN_PRIORITY_CREATE: "/Manage/Priority/Create",
  ADMIN_PRIORITY_EDIT: "/Manage/Priority/Edit/:id",
  ADMIN_PRIORITY_LIST: "/Manage/Priority",
  ADMIN_STATUS_CREATE: "/Manage/Status/Create",
  ADMIN_STATUS_EDIT: "/Manage/Status/Edit/:id",
  ADMIN_STATUS_LIST: "/Manage/Status",
} as const;

export const Roles = {
  ADMIN: "Admin",
  AGENT: "Agent",
  USER: "User",
} as const;

export const DefaultPageSize = 5;
export const DefaultPageNumber = 1;

export const TicketStatus = {
  OPEN: "Open",
  INPROGRESS: "In Progress",
  CLOSED: "Closed",
} as const;
