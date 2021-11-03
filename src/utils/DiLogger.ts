import { DependencyInjection } from "./constants";

export class DiLogger {
  static throwException(msg: string) {
    throw new Error(`${DependencyInjection}: Error msg:  ${msg}`);
  }
}
