export interface SelectListItem {
  id: number;
  label: string;
}

export interface TicketUserSummary {
  totalTicket: number;
  open: number;
  inProgress: number;
  closed: number;
}
