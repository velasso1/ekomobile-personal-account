// has no information about this response, because in response with test phone-number
// we don't receive a nodes data -------------------- <<<< CHECK THIS >>>>

interface INodesItem {
    amount: number;
    timestamp: string;
    methodName: string;
}

interface INodes {
    nodes: INodesItem[];
} 

export interface IBalancePageResponse {
    me: {
        account: {
            billingNumber: {
                balanceTopUpList: INodes;
            }
        }
    }
}

// balance page reponse for balance replenishment;

interface IСorrelation {
    actionId: string;
    correlationId: string;
}

interface IPaymentInfo {
    id: string;
    createdAt: string;
    orderNumber: string;
    amount: number;
    paymentUrl: string;
    correlation: IСorrelation;
}

export interface IBalanceReplenishment {
    paymentSBPCreate: {
        paymentId: string;
        payment: IPaymentInfo;
    }
} 