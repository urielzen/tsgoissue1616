import { Subscription } from './1616-rxjs-subscription';

export interface Unsubscribable {}
export interface SubscriptionLike extends Unsubscribable {}
export interface Subscribable<T> {}
export interface Observer<T> {}
export type TeardownLogic = Subscription | Unsubscribable | (() => void) | void;
export type ObservableNotification<T> =
  | NextNotification<T>
  | ErrorNotification
  | CompleteNotification;
export interface NextNotification<T> {}
export interface ErrorNotification {}
export interface CompleteNotification {}
