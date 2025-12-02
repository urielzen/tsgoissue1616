import { Observer } from './1616-rxjs-types';

export class Subscriber<T> implements Observer<T> {}
export class SafeSubscriber<T> extends Subscriber<T> {}
