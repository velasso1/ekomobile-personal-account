import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store";
import  updateConfirmationPassportRF  from "../store/slices/gosuslugi-slice";
import { FormikProps } from "formik";
import { TFormikClientFio, TFormikClientPassport } from "../types/gosuslugi-types";

const useCreateClientFormSync = (formik: FormikProps<TFormikClientFio | TFormikClientPassport>) => {
  const [isNextDisabled, setIsNextDisabled] = useState(false);
  const dispatch = useAppDispatch();
  const { passportRF } = useAppSelector((state) => state.gosuslugiSlice);

  useEffect(() => {
    const hasErrors = Object.keys(formik.errors).some((key) => formik.errors[key] && formik.touched[key]);
    setIsNextDisabled(hasErrors);
  }, [formik.errors, formik.touched]);

  useEffect(() => {
    // async - вынужденная мера из-за особенностей работы Reac и Formik
    // если оставить синхронный код, тогда setFieldTouched() пройдёт по//
    // всем полям до применения изменений и они, даже имея данные
    // будут отмечены ошибкой как тронутые и пустые
    const syncFields = async () => {
      for (const key of Object.keys(passportRF)) {
        if (passportRF[key] && formik.values.hasOwnProperty(key)) {
          await formik.setFieldValue(key, passportRF[key]);
          await formik.setFieldTouched(key, true);
        }
      }
    };
    syncFields();
  }, []);

  useEffect(() => {
    Object.keys(formik.values).forEach((key) => {
      if (formik.values[key] !== undefined && formik.values[key] !== null) {
        dispatch(updateConfirmationPassportRF({ [key]: formik.values[key] }));
      }
    });
  }, [formik.values]);

  return { isNextDisabled };
};

export default useCreateClientFormSync;
