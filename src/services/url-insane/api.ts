import axios, { AxiosPromise } from 'axios';
import { URL_INSANE_API_URL } from '@/services/config';
import { TypoOptionsResponseBody, TypoRequestBody } from '@/services/url-insane/types';

export default {
  fetchOptions: async () => {
    const { data } = await axios.get<AxiosPromise<TypoOptionsResponseBody>>(`${URL_INSANE_API_URL}/options`);

    return data;
  },
  fetchResult: async (payload: TypoRequestBody) => {
    const { data } = await axios.post(URL_INSANE_API_URL, payload);

    return data;
  },
};
