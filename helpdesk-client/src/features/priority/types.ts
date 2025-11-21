export interface PriorityAttr {
  id: number;
  priorityName: string;
  priorityId?: number;
  IsSystemGenerated?: boolean;
}

export interface PriorityRequest {
  priorityName: string;
  priorityId?: number;
}
