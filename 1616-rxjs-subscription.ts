import { SubscriptionLike, TeardownLogic } from './1616-rxjs-types';

export class Subscription implements SubscriptionLike {
  public static EMPTY = (() => {
    const empty = new Subscription();
    empty.closed = true;
    return empty;
  })();

  public closed = false;

  private _parentage: Subscription[] | Subscription | null = null;

  constructor(private initialTeardown?: () => void) {}

  unsubscribe(): void {}

  add(teardown: TeardownLogic): void {}

  private _hasParent(parent: Subscription) {
    const { _parentage } = this;
    return (
      _parentage === parent ||
      (Array.isArray(_parentage) && _parentage.includes(parent))
    );
  }

  private _addParent(parent: Subscription) {
    const { _parentage } = this;
    this._parentage = Array.isArray(_parentage)
      ? (_parentage.push(parent), _parentage)
      : _parentage
      ? [_parentage, parent]
      : parent;
  }

  private _removeParent(parent: Subscription) {}

  remove(teardown: Exclude<TeardownLogic, void>): void {}
}
