import { Observer } from './1616-rxjs-types';
import { Subscription } from './1616-rxjs-subscription';

export class Subscriber<T> extends Subscription implements Observer<T> {
  static create<T>(next?: (x?: T) => void, error?: (e?: any) => void, complete?: () => void): Subscriber<T> {
    return new SafeSubscriber(next, error, complete);
  }
  protected isStopped: boolean = false;
  constructor(destination?: Subscriber<any> | Observer<any>) {
    super();
  }
  next(value: T): void {
  }
  error(err?: any): void {
  }
  complete(): void {
  }
  override unsubscribe(): void {
  }
  protected _next(value: T): void {
  }
  protected _error(err: any): void {
  }
  protected _complete(): void {
  }
}

export class SafeSubscriber<T> extends Subscriber<T> {
  constructor(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void) | null,
    error?: ((e?: any) => void) | null,
    complete?: (() => void) | null
  ) {
    super();
  }
}
