export type PopulationComposition = {
  message: null;
  result: Result;
};

type Result = {
  boundaryYear: number;
  data: Data[];
};

type Data = {
  label: string;
  data: chilData[];
};

export type chilData = {
  year: number;
  value: number;
  rate?: number;
};
