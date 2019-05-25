export interface TypoState {
  config: TypoConfig | {};
  form: TypoForm;
  rows: Array<TypoResponseBody['data']>
}

export interface TypoForm {
  domain: string;
  selections: Array<TypoListItem>;
}

export interface TypoListItem {
  value: string;
  name: string;
  description: string;
}

export interface TypoConfigItem {
  label: string;
  description: string;
  required?: boolean;
  values?: Array<TypoListItem>;
}

export interface TypoConfig {
  domain: TypoConfigItem;
  options: {
    funcs: TypoConfigItem;
    keyboards: TypoConfigItem;
    typos: TypoConfigItem;
  }
}

export interface TypoRequestBody {
  domains: string[];
  funcs: string[];
  keyboards: string[];
  typos: string[];
}

export interface TypoResponseBody {
  original: DomainBreakdown;
  variant: DomainBreakdown;
  typo: TypoType;
  data: {
    [key: string]: string;
  };
}

export interface DomainBreakdown {
  domain: string;
  suffix: string;
}

export interface TypoType {
  code: string;
  name: string;
  description: string;
}
