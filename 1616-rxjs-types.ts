import { Subscription } from './1616-rxjs-subscription';

export interface Observer<T> {}
export type TeardownLogic = Subscription | (() => void) | void;
