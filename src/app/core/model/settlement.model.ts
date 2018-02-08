import {NemesisEncounter} from "./nemesis.model";
import {StoryEventEnum} from "./store-event.model";
import {InnovationEnum} from "./innovation.model";
import {LocationEnum} from "./location.model";

export interface Settlement {
  name?: string;
  survivalLimit: number;
  deathCount: number;
  timeline: number;
  storyEvents: StoryEventEnum[];
  nemesis: NemesisEncounter[]
  innovations: InnovationEnum[];
  locations: LocationEnum[];
  dateCreation: Date;
}

export function newSettlement(): Settlement {
  return {
    survivalLimit: 1,
    deathCount: 0,
    timeline: 0,
    storyEvents: [],
    nemesis: [],
    innovations: [ InnovationEnum.LANGUAGE ],
    locations: [],
    dateCreation: new Date()
  };
}
