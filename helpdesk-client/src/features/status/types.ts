export interface StatusAttr {
  id: number;
  statusName: string;
  statusId?: number;
  isSystemGenerated?: boolean;
}

export interface StatusRequest {
  statusName: string;
  statusId?: number;
}
