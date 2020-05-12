export interface PDevice {
  uid: number;
  vendor: string;
  createdDate: Date;
  status: Status;
}

export enum Status {
  Offline = 0,
  Online = 1,
}
