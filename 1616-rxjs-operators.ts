import { TeardownLogic } from "./1616-rxjs-types";
import { Subscriber } from "./1616-rxjs-subscriber";

export interface Operator<T, R> {
  call(subscriber: Subscriber<R>, source: any): TeardownLogic;
}
