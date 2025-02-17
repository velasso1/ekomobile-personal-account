import { useMutation } from "@apollo/client";
import { GOSUSLUGI_CONFIRM_PASSPORT } from "../api/apollo/mutations/confirm-gosuslugi-passport";
import { useAppSelector } from "../store";
import { GOSUSLUGI_CONFIRM_CLIENT } from "../api/apollo/mutations/confirm-gosuslugi-client";
import { CREATE_NEW_CLIENT_ID } from "../store/slices/gosuslugi-slice";

const useConfirmGosuslugiData = () => {
  const [guRequestConfirmationPassportRF, { data: dataPassport, loading: loadingPassport, error: errorPassport }] =
    useMutation(GOSUSLUGI_CONFIRM_PASSPORT);
  const [guRequestConfirmationClient, { data: dataClient, loading: loadingClient, error: errorClient }] =
    useMutation(GOSUSLUGI_CONFIRM_CLIENT);

  const { clientId, numbers, passportRF } = useAppSelector((state) => state.gosuslugiSlice);

  const confirmationClientParams = () => {
    return numbers.map((number) => ({
      correlation: {
        actionId: crypto.randomUUID(),
        correlationId: crypto.randomUUID(),
      },
      params: {
        clientId: clientId,
        id: crypto.randomUUID(),
        targetMsisdn: number,
      },
    }));
  };

  const confirmationPassportParams = () => {
    return numbers.map((number) => ({
      correlation: {
        actionId: crypto.randomUUID(),
        correlationId: crypto.randomUUID(),
      },
      params: {
        id: crypto.randomUUID(),
        targetMsisdn: number,
        passportRF: {
          series: passportRF.series,
          registrationAddress: passportRF.registrationAddress,
          number: passportRF.number,
          namePatronymic: passportRF.namePatronymic,
          nameGiven: passportRF.nameGiven,
          nameFamily: passportRF.nameFamily,
          issuePlaceCode: passportRF.issuePlaceCode,
          issuePlace: passportRF.issuePlaceManual ? passportRF.issuePlaceManual : passportRF.issuePlace,
          issueDate: passportRF.issueDate,
          gender: passportRF.gender,
          birthplace: passportRF.birthplace,
          birthdate: passportRF.birthdate,
        },
      },
    }));
  };

  const confirmNumbers = async () => {
    try {
      if (clientId === CREATE_NEW_CLIENT_ID) {
        const passportPromises = confirmationPassportParams().map(async (passportParams) => {
          try {
            await guRequestConfirmationPassportRF({ variables: passportParams });
          } catch (err) {
            console.error(`Passport Confirmation Error:`, err);
          }
        });
        await Promise.all(passportPromises);
      } else {
        const clientPromises = confirmationClientParams().map(async (clientParams) => {
          try {
            await guRequestConfirmationClient({ variables: clientParams });
          } catch (err) {
            console.error(`Client Confirmation Error:`, err);
          }
        });
        await Promise.all(clientPromises);
      }
    } catch (err) {
      console.error(`Confirmation Error:`, err);
    }
  };

  return {
    confirmNumbers,
    dataClient,
    dataPassport,
    loadingClient,
    loadingPassport,
    errorClient,
    errorPassport,
  };
};

export default useConfirmGosuslugiData;
