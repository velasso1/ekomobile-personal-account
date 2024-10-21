interface INode {
  id: string;
  createdAt: Date;
  typeId: string;
  status: string;
  name: string;
  description: string;
  resultMessage: string;
}

interface IRequestList {
  total: number;
  nodes: INode[];
}

interface IAccount {
  requestList: IRequestList;
}

export interface IApplicationsResponse {
  me: {
    account: IAccount;
  };
}
