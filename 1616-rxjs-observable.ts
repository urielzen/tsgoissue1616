import { SafeSubscriber, Subscriber } from "./1616-rxjs-subscriber";
import { TeardownLogic } from "./1616-rxjs-types";
import { Operator } from "./1616-rxjs-operators";
import { Observer } from "./1616-rxjs-types";
import { Subscribable } from "./1616-rxjs-types";
import { Subscription } from "./1616-rxjs-subscription";

//  interface Observable<T> {
//     subscribe(next?: (value: T) => void): void;
// }


export class Observable<T> implements Subscribable<T> {
  source: Observable<any> | undefined;
  operator: Operator<any, T> | undefined;
  constructor(subscribe?: (this: Observable<T>, subscriber: Subscriber<T>) => TeardownLogic) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  // HACK: Since TypeScript inherits static properties too, we have to
  // fight against TypeScript here so Subject can have a different static create signature
  static create: (...args: any[]) => any = <T>(subscribe?: (subscriber: Subscriber<T>) => TeardownLogic) => {
    return new Observable<T>(subscribe);
  };
  lift<R>(operator?: Operator<T, R>): Observable<R> {
    const observable = new Observable<R>();
    observable.source = this;
    observable.operator = operator;
    return observable;
  }

  subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
  subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, complete?: (() => void) | null): Subscription;
  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((error: any) => void) | null,
    complete?: (() => void) | null
  ): Subscription {
    const subscriber = new SafeSubscriber(observerOrNext, error, complete);
    return subscriber;
  }

  protected _trySubscribe(sink: Subscriber<T>): TeardownLogic {
    try {
      return this._subscribe(sink);
    } catch (err) {
      sink.error(err);
    }
  }
  forEach(next: (value: T) => void): Promise<void>;
  forEach(next: (value: T) => void, promiseCtor: PromiseConstructorLike): Promise<void>;
  forEach(next: (value: T) => void, promiseCtor?: PromiseConstructorLike): Promise<void> {
    return {} as Promise<void>;
  }
  protected _subscribe(subscriber: Subscriber<any>): TeardownLogic {
    return this.source?.subscribe(subscriber);
  }

}
