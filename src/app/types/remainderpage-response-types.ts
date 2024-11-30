import { IFullItem } from "./response-full-userinfo-types";

export interface IRemaindersResponse {
  onlyRemainder: {
    account: {
      number: {
        remains: {
          simple: IFullItem[];
        };
      };
    };
  };
}
