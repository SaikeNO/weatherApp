import { Current } from "./Current";
import { Location } from "./Location";

export interface Weather {
  location: Location,
  current: Current
}
