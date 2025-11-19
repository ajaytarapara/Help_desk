export interface StatusAttr {
  id: number;
  statusName: string;
  statusId?: number;
}

export interface StatusRequest {
  statusName: string;
  statusId?: number;
}
