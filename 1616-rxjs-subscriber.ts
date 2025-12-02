import { Observer } from './1616-rxjs-types';
import { Subscription } from './1616-rxjs-subscription';

export class Subscriber<T> extends Subscription implements Observer<T> {}
export class SafeSubscriber<T> extends Subscriber<T> {}
