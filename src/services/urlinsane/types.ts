export interface UrlInsaneState {
  options: TypoRequestBody | {};
  result: TypoResponseBody | {};
  form: UrlInsaneForm;
  loading: boolean;
  error: string;
}

export interface UrlInsaneForm {
  domain: string;
  funcs: string[];
  keyboards: string[];
  typos: string[];
}

export interface TypoListItem {
  value: string;
  name: string;
  description: string;
}

export interface TypoOption {
  type: string;
  description: string;
  optional: boolean;
  values?:TypoListItem[];
}

export interface TypoOptionsResponseBody {
  [key: string]: TypoOption;
}

export interface TypoRequestBody {
  domains: string[];
  funcs: string[];
  keyboards: string[];
  typos: string[];
}

export interface TypoResponseBody {
  headers: string[];
  rows: Array<{
    [key: string]: string;
  }>;
}
