export const enum NemesisEnum {
  BUTCHER
}

export interface Nemesis {
  type: NemesisEnum;
}

export interface NemesisEncounter {
  type: NemesisEnum;
  level: number;
}
