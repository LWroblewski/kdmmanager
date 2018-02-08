import {Settlement} from "./settlement.model";

export interface User {
  name: string;
  settlements: Settlement[];
}
