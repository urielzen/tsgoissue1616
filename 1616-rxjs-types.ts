import { Subscription } from './1616-rxjs-subscription';

export interface Unsubscribable {
  unsubscribe(): void;
}

export interface SubscriptionLike extends Unsubscribable {
  unsubscribe(): void;
  readonly closed: boolean;
}

export interface Subscribable<T> {
  subscribe(observer: Partial<Observer<T>>): Unsubscribable;
}

export interface Observer<T> {
  next: (value: T) => void;
  error: (err: any) => void;
  complete: () => void;
}

export type TeardownLogic = Subscription | Unsubscribable | (() => void) | void;


export type ObservableNotification<T> = NextNotification<T> | ErrorNotification | CompleteNotification;
export interface NextNotification<T> {
  kind: 'N';
  value: T;
}
export interface ErrorNotification {
  kind: 'E';
  error: any;
}
export interface CompleteNotification {
  kind: 'C';
}
