export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  flags?: {
    png: string;
    svg: string;
  };
  borders?: string[];
  languages?: {
    [key: string]: string;
  };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}
