import { Condition } from "./Condition"

export interface Current {
  temp_c: number,
  is_day: number,
  condition: Condition
  wind_mph: number,
  wind_kph: number,
  wind_dir: string,
  cloud: number,
  feelslike_c: number
}
