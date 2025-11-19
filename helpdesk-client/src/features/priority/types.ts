export interface PriorityAttr {
  id: number;
  priorityName: string;
  priorityId?: number;
}

export interface PriorityRequest {
  priorityName: string;
  priorityId?: number;
}
