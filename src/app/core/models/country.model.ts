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
  continents?: string[];
  latlng?: [number, number];
  area?: number;
  flags?: {
    png: string;
    svg: string;
    alt: string;
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
  coatOfArms?: {
    png: string;
    svg: string;
  };
  maps?: {
    googleMaps: string;
    openStreetMaps: string;
  };
  timezones?: string[];
}
