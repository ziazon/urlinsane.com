import http from '@/services/http';
import {
  TypoOptionsResponseBody,
  TypoRequestBody,
  TypoResponseBody,
} from '@/services/typo/types';

export default {
  fetchOptions: async (): Promise<TypoOptionsResponseBody> => {
    const { data } = await http.get<TypoOptionsResponseBody>('/typo/options');

    return data;
  },
  fetchResult: async (payload: TypoRequestBody): Promise<TypoResponseBody> => {
    const { data } = await http.post<TypoResponseBody>('/typo', payload);

    return data;
  },
};
