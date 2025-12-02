import { Observer, SubscriptionLike } from "./1616-rxjs-types";
import { Observable } from "./1616-rxjs-observable";

export class Subject<T> extends Observable<T> implements SubscriptionLike {
  closed = false;

  observers: Observer<T>[] = [];
  isStopped = false;
  hasError = false;
  thrownError: any = null;

  constructor() {
    // NOTE: This must be here to obscure Observable's constructor.
    super();
  }

  next(value: T) {
  }

  error(err: any) {
  }

  complete() {
  }

  unsubscribe() {
  }

  get observed() {
    return this.observers?.length > 0;
  }

  asObservable(): Observable<T> {
    const observable: any = new Observable<T>();
    observable.source = this;
    return observable;
  }
}
