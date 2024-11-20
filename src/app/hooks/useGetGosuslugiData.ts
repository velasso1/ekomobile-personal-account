import { useQuery } from "@apollo/client";
import { GET_GOSUSLUGI_DATA } from "../api/apollo/queries/get-gosuslugi-data";
import { ICLient, IGroup, IGroupNumber, IGUConfrirmation, IGUHints } from "../types/gosuslugi-types";

const useGetGosuslugiData = () => {
  // write types for this response pls
  const { data, loading, error } = useQuery(GET_GOSUSLUGI_DATA);

  const aboutContent: IGUConfrirmation = data?.info?.guConfirmation;
  const groups: IGroup[] = data?.me?.account?.number?.groups;
  const hints: IGUHints = data?.info?.guConfirmation?.hints;

  const allClients = groups?.flatMap((group: IGroup): ICLient[] => {
    return group.numbers
      .map((number: IGroupNumber) => {
        const client = number.guConfirmationInfo.client;
        if (client) {
          return {
            id: client.id,
            nameFamily: client.nameFamily,
            nameGiven: client.nameGiven,
            namePatronymic: client.namePatronymic,
            guConfirmationCount: client.guConfirmationCount,
            guConfirmationLimit: client.guConfirmationLimit,
          };
        }
        return null;
      })
      .filter((client: ICLient) => client !== null);
  });

  const allNumbers = groups?.flatMap((group: IGroup): IGroupNumber[] => {
    return group.numbers.map((number: IGroupNumber) => {
      return {
        msisdn: number.msisdn,
        guConfirmationInfo: number.guConfirmationInfo,
        mark: number.mark,
      };
    });
  });

  const conformationRequiredNumbers = groups?.flatMap((group: IGroup): IGroupNumber[] => {
    return group.numbers
      .map((number: IGroupNumber) => {
        return {
          msisdn: number.msisdn,
          guConfirmationInfo: number.guConfirmationInfo,
          mark: number.mark,
        };
      })
      .filter((number) => number.guConfirmationInfo.status.id === "REQUIRED");
  });

  return {
    data,
    loading,
    error,
    aboutContent,
    allNumbers,
    allClients,
    hints,
    conformationRequiredNumbers,
  };
};

export default useGetGosuslugiData;
