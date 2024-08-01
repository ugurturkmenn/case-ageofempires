export enum Age {
  ALL,
  DARK,
  FEUDAL,
  CASTLE,
  IMPERIAL
}

export type Cost = {
  Wood?: number,
  Gold?: number,
  Food?: number
}

export interface Unit {
  id?: string;
  name?: string;
  description?: string;
  expansion?: string;
  age?: string | "ALL" | "DARK" | "FEUDAL" | "CASTLE" | "IMPERIAL",
  cost?: Cost,
  build_time?: number;
  reload_time?: number;
  attack_delay?: number;
  movement_rate?: number;
  line_of_sight?: number;
  hit_points?: number;
  range?: number;
  attack?: number;
  armor?: string;
  attack_bonus?: string[];
  armor_bonus?: string[];
  accuracy?: string;
  search_radius?: string;
}

export interface ICostFilter {
  type: string;
  range: { min: number, max: number };
  checked: boolean;
}

export interface IState {
  units: {
    units: Unit[];
    filteredUnits: Unit[];
    loading: boolean;
    error: string | null;
    costFilters: {
      [key: string]: ICostFilter;
    };
    age: string | "ALL" | "DARK" | "FEUDAL" | "CASTLE" | "IMPERIAL";
  }
}