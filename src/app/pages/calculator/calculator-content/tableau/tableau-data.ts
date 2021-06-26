import {LinearSystemData} from "../linear-system/linear-system-data";

export interface TableauData {
  numberOfVars: number,
  numberOfConstraints: number,

  linearSystemData: LinearSystemData
}

