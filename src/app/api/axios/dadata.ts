import axios from "axios";
import { ISelectSearchOption } from "../../types/gosuslugi-types";

const baseUrlSuggest = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest";
const suggest = axios.create({
  baseURL: baseUrlSuggest,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: `Token ${import.meta.env.VITE_DADATA_API_KEY}`,
  },
});

export const getSuggestAddress = (query: string): Promise<ISelectSearchOption[]> =>
  suggest.post("/address", { query: query }).then((resp) => {
    return resp.data.suggestions.map((suggestion) => {
      return {
        value: suggestion.unrestricted_value,
        label: suggestion.unrestricted_value,
      };
    });
  });
export const getSuggestIssuePlace = (query: string) =>
  suggest.post("/fms_unit", { query: query }).then((resp) => {
    return resp.data.suggestions.map((suggestion) => {
      return {
        value: suggestion.unrestricted_value,
        label: suggestion.unrestricted_value,
      };
    });
  });
