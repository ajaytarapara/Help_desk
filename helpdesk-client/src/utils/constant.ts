export const Routes = {
  LOGIN: "/login",
  LANDING: "/",
  USER_DASHBOARD: "/User/Dashboard",
  ADMIN_DASHBOARD: "/Admin/Dashboard",
  AGENT_DASHBOARD: "/Agent/Dashboard",
  USER_TICKET_CREATE: "/User/Ticket/Create",
  SIGN_UP: "/signup",
  USER_MY_TICKET_LIST: "/User/Ticket/MyTicket",
  USER_TICKET_DETAIL: "/User/Ticket/Detail/:id",
  USER_TICKET_UPDATE: "/User/Ticket/Update/:id",
  AGENT_MY_TICKET: "/Agent/MyTicket",
  AGENT_TICKET_DETAIL: "/Agent/Ticket/Detail/:id",
  AGENT_ALL_TICKET_LIST: "/Agent/Tickets",
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
